import { useRef, useEffect, useImperativeHandle, forwardRef, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import worldTopo from 'world-atlas/countries-50m.json'
import earcut from 'earcut'
import { ALL_IDS } from '../countryRegistry'

// ─── Hex color to RGB array ───
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]
}

const DEG2RAD = Math.PI / 180

function latLngToVec3(lat, lng, r = 1) {
  const phi = (90 - lat) * DEG2RAD
  const theta = (lng + 180) * DEG2RAD
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

// ─── Rotation: bring (lat,lng) to face camera at +Z ───
function lngToRotY(lng) { return -(90 + lng) * DEG2RAD }
function latToRotX(lat) { return lat * DEG2RAD }

// ─── Subdivide a triangle so edges stay ≤ maxDeg on the sphere ───
function subdivideTri(lng0, lat0, lng1, lat1, lng2, lat2, r, maxDeg, out) {
  const d01 = Math.max(Math.abs(lng1 - lng0), Math.abs(lat1 - lat0))
  const d02 = Math.max(Math.abs(lng2 - lng0), Math.abs(lat2 - lat0))
  const d12 = Math.max(Math.abs(lng2 - lng1), Math.abs(lat2 - lat1))
  const mx = Math.max(d01, d02, d12)
  if (mx <= maxDeg) {
    const v0 = latLngToVec3(lat0, lng0, r)
    const v1 = latLngToVec3(lat1, lng1, r)
    const v2 = latLngToVec3(lat2, lng2, r)
    out.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
    return
  }
  // Split the longest edge at its midpoint
  if (d01 >= d02 && d01 >= d12) {
    const mLng = (lng0 + lng1) / 2, mLat = (lat0 + lat1) / 2
    subdivideTri(lng0, lat0, mLng, mLat, lng2, lat2, r, maxDeg, out)
    subdivideTri(mLng, mLat, lng1, lat1, lng2, lat2, r, maxDeg, out)
  } else if (d02 >= d12) {
    const mLng = (lng0 + lng2) / 2, mLat = (lat0 + lat2) / 2
    subdivideTri(lng0, lat0, lng1, lat1, mLng, mLat, r, maxDeg, out)
    subdivideTri(mLng, mLat, lng1, lat1, lng2, lat2, r, maxDeg, out)
  } else {
    const mLng = (lng1 + lng2) / 2, mLat = (lat1 + lat2) / 2
    subdivideTri(lng0, lat0, lng1, lat1, mLng, mLat, r, maxDeg, out)
    subdivideTri(lng0, lat0, mLng, mLat, lng2, lat2, r, maxDeg, out)
  }
}

// ─── Triangulate a GeoJSON polygon ring onto a sphere ───
function triangulateRing(outerRing, holes, r) {
  const coords = []
  const holeIndices = []
  const outer = outerRing[outerRing.length - 1][0] === outerRing[0][0] &&
                outerRing[outerRing.length - 1][1] === outerRing[0][1]
    ? outerRing.slice(0, -1) : outerRing
  for (const [lng, lat] of outer) {
    coords.push(lng, lat)
  }
  for (const hole of holes) {
    holeIndices.push(coords.length / 2)
    const h = hole[hole.length - 1][0] === hole[0][0] &&
              hole[hole.length - 1][1] === hole[0][1]
      ? hole.slice(0, -1) : hole
    for (const [lng, lat] of h) {
      coords.push(lng, lat)
    }
  }
  const indices = earcut(coords, holeIndices.length > 0 ? holeIndices : undefined, 2)
  const verts = []
  for (let i = 0; i < indices.length; i += 3) {
    const i0 = indices[i], i1 = indices[i + 1], i2 = indices[i + 2]
    subdivideTri(
      coords[i0 * 2], coords[i0 * 2 + 1],
      coords[i1 * 2], coords[i1 * 2 + 1],
      coords[i2 * 2], coords[i2 * 2 + 1],
      r, 10, verts // max 10° per edge — hugs the sphere
    )
  }
  return verts
}

// ─── Component ───
const Globe = forwardRef(function Globe({ config = {}, isDark = true }, ref) {
  const mountRef = useRef(null)
  const linesRef = useRef(null)
  const fillRef = useRef(null)
  const glowRef = useRef(null)
  const frameRef = useRef(null)
  const cameraRef = useRef(null)
  const groupRef = useRef(null)
  const [labelPositions, setLabelPositions] = useState([])
  const [labelsVisible, setLabelsVisible] = useState(false)
  const labelsTimerRef = useRef(null)

  const rotYRef = useRef(0)
  const rotXRef = useRef(0)
  const targetRotYRef = useRef(0)
  const targetRotXRef = useRef(0)
  const zoomRef = useRef(config.zoom ?? 1)
  const targetZoomRef = useRef(config.zoom ?? 1)
  const autoRotateRef = useRef(config.autoRotate ?? false)
  const labelsRef = useRef(config.labels || null)
  const highlightRef = useRef(config.highlight || null)

  const countries = useMemo(() => feature(worldTopo, worldTopo.objects.countries), [])

  // ─── Update refs + colors when config changes (no scene rebuild) ───
  useEffect(() => {
    const newRotY = lngToRotY(config.lng ?? 34)
    const newRotX = latToRotX(config.lat ?? 43)
    const wasAuto = autoRotateRef.current
    const willAuto = config.autoRotate ?? false
    if (wasAuto && !willAuto) {
      rotYRef.current = newRotY
      rotXRef.current = newRotX
    }
    targetRotYRef.current = newRotY
    targetRotXRef.current = newRotX
    targetZoomRef.current = config.zoom ?? 1
    autoRotateRef.current = willAuto
    labelsRef.current = config.labels || null
    highlightRef.current = config.highlight || null

    // highlight is now { isoId: '#hexColor', ... } or null/undefined
    const hlMap = config.highlight || {}
    const def = isDark ? [0.45, 0.47, 0.55] : [0.15, 0.15, 0.2]

    // Update base border colors
    if (linesRef.current) {
      const arr = linesRef.current.geometry.getAttribute('color').array
      const cids = linesRef.current.userData.segCountryIds
      for (let i = 0; i < cids.length; i++) {
        const hex = hlMap[cids[i]]
        const c = hex ? hexToRgb(hex) : def
        const j = i * 6
        arr[j] = c[0]; arr[j+1] = c[1]; arr[j+2] = c[2]
        arr[j+3] = c[0]; arr[j+4] = c[1]; arr[j+5] = c[2]
      }
      linesRef.current.geometry.getAttribute('color').needsUpdate = true
    }

    // Update fill mesh colors
    if (fillRef.current) {
      const arr = fillRef.current.geometry.getAttribute('color').array
      const cids = fillRef.current.userData.triCountryIds
      for (let i = 0; i < cids.length; i++) {
        const hex = hlMap[cids[i]]
        const c = hex ? hexToRgb(hex) : [0, 0, 0]
        const a = hex ? 0.22 : 0.0
        const j = i * 12
        for (let v = 0; v < 3; v++) {
          const k = j + v * 4
          arr[k] = c[0]; arr[k+1] = c[1]; arr[k+2] = c[2]; arr[k+3] = a
        }
      }
      fillRef.current.geometry.getAttribute('color').needsUpdate = true
    }

    // Animate labels in with delay, out instantly
    clearTimeout(labelsTimerRef.current)
    if (config.labels && config.labels.length > 0) {
      setLabelsVisible(false)
      labelsTimerRef.current = setTimeout(() => setLabelsVisible(true), 600)
    } else {
      setLabelsVisible(false)
    }
  }, [config.lat, config.lng, config.zoom, config.autoRotate, config.labels, config.highlight])

  useImperativeHandle(ref, () => ({
    pointOfView: ({ lat, lng, zoom }) => {
      targetRotYRef.current = lngToRotY(lng)
      targetRotXRef.current = latToRotX(lat)
      if (zoom != null) targetZoomRef.current = zoom
    },
    setAutoRotate: (val) => { autoRotateRef.current = val }
  }), [])

  // Theme color update
  useEffect(() => {
    if (!linesRef.current) return
    const hlMap = highlightRef.current || {}
    const def = isDark ? [0.45, 0.47, 0.55] : [0.15, 0.15, 0.2]

    // Base lines
    const arr = linesRef.current.geometry.getAttribute('color').array
    const cids = linesRef.current.userData.segCountryIds
    for (let i = 0; i < cids.length; i++) {
      const hex = hlMap[cids[i]]
      const c = hex ? hexToRgb(hex) : def
      const j = i * 6
      arr[j] = c[0]; arr[j+1] = c[1]; arr[j+2] = c[2]
      arr[j+3] = c[0]; arr[j+4] = c[1]; arr[j+5] = c[2]
    }
    linesRef.current.geometry.getAttribute('color').needsUpdate = true
    const u = linesRef.current.material.uniforms
    u.uFrontOpacity.value = isDark ? 0.8 : 0.7
    u.uBackOpacity.value = isDark ? 0.06 : 0.04

    // Fill theme
    if (fillRef.current) {
      const fu = fillRef.current.material.uniforms
      fu.uFrontOpacity.value = isDark ? 0.85 : 0.65
      fu.uBackOpacity.value = isDark ? 0.0 : 0.0
    }
    // Glow color
    if (glowRef.current) {
      glowRef.current.material.uniforms.glowColor.value.set(
        isDark ? 0xffffff : 0x000000
      )
    }
  }, [isDark])

  // ─── Three.js scene (only rebuilds on theme change) ───
  useEffect(() => {
    const container = mountRef.current
    const w = window.innerWidth, h = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    cameraRef.current = camera
    const group = new THREE.Group()
    groupRef.current = group
    scene.add(group)

    const hlMap = highlightRef.current || {}

    // ── Facing shader (used by borders — RGB) ──
    const facingVertRGB = `
      attribute vec3 color;
      varying vec3 vColor;
      varying float vFacing;
      void main() {
        vColor = color;
        vec3 wN = normalize(mat3(modelMatrix) * position);
        vec3 wP = (modelMatrix * vec4(position, 1.0)).xyz;
        vFacing = dot(wN, normalize(cameraPosition - wP));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const facingFragRGB = `
      varying vec3 vColor;
      varying float vFacing;
      uniform float uFrontOpacity;
      uniform float uBackOpacity;
      void main() {
        float facing = smoothstep(-0.2, 0.4, vFacing);
        gl_FragColor = vec4(vColor, mix(uBackOpacity, uFrontOpacity, facing));
      }
    `

    // ── Facing shader with per-vertex RGBA (used by fill) ──
    // Facing is computed per-pixel from interpolated world position
    // to avoid visible seams between subdivided triangles
    const facingVertRGBA = `
      attribute vec4 color;
      varying vec4 vColor;
      varying vec3 vWorldPos;
      void main() {
        vColor = color;
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const facingFragRGBA = `
      varying vec4 vColor;
      varying vec3 vWorldPos;
      uniform float uFrontOpacity;
      uniform float uBackOpacity;
      void main() {
        vec3 normal = normalize(vWorldPos);
        float vFacing = dot(normal, normalize(cameraPosition - vWorldPos));
        float facing = smoothstep(-0.2, 0.4, vFacing);
        float alpha = vColor.a * mix(uBackOpacity, uFrontOpacity, facing);
        gl_FragColor = vec4(vColor.rgb, alpha);
      }
    `

    // ── Country border lines (base layer — ALL countries) ──
    const defaultColor = isDark ? [0.45, 0.47, 0.55] : [0.15, 0.15, 0.2]
    const verts = []
    const vertColors = []
    const segCountryIds = []

    for (const feat of countries.features) {
      const hex = hlMap[feat.id]
      const c = hex ? hexToRgb(hex) : defaultColor
      const { type, coordinates } = feat.geometry
      const rings = type === 'Polygon'
        ? coordinates
        : type === 'MultiPolygon'
          ? coordinates.flat()
          : []

      for (const ring of rings) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i]
          const [lng2, lat2] = ring[i + 1]
          if (Math.abs(lng2 - lng1) > 90) continue
          const a = latLngToVec3(lat1, lng1)
          const b = latLngToVec3(lat2, lng2)
          verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
          vertColors.push(c[0], c[1], c[2], c[0], c[1], c[2])
          segCountryIds.push(feat.id)
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(verts), 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(vertColors), 3))

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uFrontOpacity: { value: isDark ? 0.8 : 0.7 },
        uBackOpacity: { value: isDark ? 0.06 : 0.04 },
      },
      vertexShader: facingVertRGB,
      fragmentShader: facingFragRGB,
    })

    const lines = new THREE.LineSegments(geo, mat)
    lines.userData.segCountryIds = segCountryIds
    group.add(lines)
    linesRef.current = lines

    // ── Filled country surfaces (ALL registry countries) ──
    const fillVerts = []
    const fillColors = [] // RGBA
    const triCountryIds = []
    for (const feat of countries.features) {
      if (!ALL_IDS.has(feat.id)) continue
      const hex = hlMap[feat.id]
      const c = hex ? hexToRgb(hex) : [0, 0, 0]
      const alpha = hex ? 0.22 : 0.0
      const { type, coordinates } = feat.geometry
      const polySets = type === 'Polygon'
        ? [coordinates]
        : type === 'MultiPolygon'
          ? coordinates
          : []

      for (const polyCoords of polySets) {
        const outerRing = polyCoords[0]
        const holes = polyCoords.slice(1)
        if (outerRing.length < 4) continue

        // For antimeridian-crossing polygons, shift negative longitudes +360°
        // so earcut sees correct 2D topology. Subdivision + sin/cos periodicity
        // ensure correct sphere projection even for shifted coordinates.
        let outerForTri = outerRing
        let holesForTri = holes
        let crosses = false
        for (let i = 0; i < outerRing.length - 1; i++) {
          if (Math.abs(outerRing[i + 1][0] - outerRing[i][0]) > 90) { crosses = true; break }
        }
        if (crosses) {
          const shift = ([lng, lat]) => [lng < 0 ? lng + 360 : lng, lat]
          outerForTri = outerRing.map(shift)
          holesForTri = holes.map(h => h.map(shift))
        }

        const triVerts = triangulateRing(outerForTri, holesForTri, 1.001)
        for (let i = 0; i < triVerts.length; i += 3) {
          fillVerts.push(triVerts[i], triVerts[i+1], triVerts[i+2])
        }
        const numTris = triVerts.length / 9
        for (let t = 0; t < numTris; t++) {
          fillColors.push(
            c[0], c[1], c[2], alpha,
            c[0], c[1], c[2], alpha,
            c[0], c[1], c[2], alpha,
          )
          triCountryIds.push(feat.id)
        }
      }
    }
    const fillGeo = new THREE.BufferGeometry()
    fillGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(fillVerts), 3))
    fillGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(fillColors), 4))
    const fillMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uFrontOpacity: { value: isDark ? 0.85 : 0.65 },
        uBackOpacity: { value: 0.0 },
      },
      vertexShader: facingVertRGBA,
      fragmentShader: facingFragRGBA,
    })
    const fillMesh = new THREE.Mesh(fillGeo, fillMat)
    fillMesh.userData.triCountryIds = triCountryIds
    group.add(fillMesh)
    fillRef.current = fillMesh

    // ── Globe edge glow ──
    const glowGeo = new THREE.SphereGeometry(1.04, 64, 64)
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      uniforms: {
        glowColor: { value: new THREE.Color(isDark ? 0xffffff : 0x000000) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vViewPos = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          float rim = 1.0 - abs(dot(vNormal, vViewPos));
          float intensity = pow(rim, 6.0) * 0.5;
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    group.add(glow)
    glowRef.current = glow

    // ── Init ──
    rotYRef.current = lngToRotY(config.lng ?? 34)
    rotXRef.current = latToRotX(config.lat ?? 43)
    zoomRef.current = config.zoom ?? 1

    // ── Loop ──
    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const ease = 0.12
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * ease
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * ease
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * ease

      if (autoRotateRef.current) {
        rotYRef.current -= 0.002
        targetRotYRef.current -= 0.002
      }

      group.rotation.set(0, 0, 0)
      group.rotateX(rotXRef.current)
      group.rotateY(rotYRef.current)

      camera.position.z = 3.15 / zoomRef.current

      const aspect = window.innerWidth / window.innerHeight
      const offsetFactor = autoRotateRef.current ? 0.38 : 0.18
      group.position.x = (aspect * offsetFactor) / Math.max(zoomRef.current, 1)

      renderer.render(scene, camera)

      // Project labels to screen coords
      const labels = labelsRef.current
      if (labels && labels.length > 0) {
        const projected = []
        for (const lb of labels) {
          const v = latLngToVec3(lb.lat, lb.lng)
          v.applyMatrix4(group.matrixWorld)
          v.project(camera)
          const sx = (v.x * 0.5 + 0.5) * window.innerWidth
          const sy = (-v.y * 0.5 + 0.5) * window.innerHeight
          const worldPos = latLngToVec3(lb.lat, lb.lng)
          worldPos.applyMatrix4(group.matrixWorld)
          const camDir = new THREE.Vector3().subVectors(worldPos, camera.position).normalize()
          const normal = worldPos.clone().normalize()
          const facing = normal.dot(camDir)
          projected.push({
            name: lb.name, x: sx, y: sy,
            color: lb.color,
            visible: facing < 0,
            offsetY: lb.offsetY ?? -40,
          })
        }
        setLabelPositions(projected)
      } else if (labelPositions.length > 0) {
        setLabelPositions([])
      }
    }
    animate()

    function onResize() {
      const nw = window.innerWidth, nh = window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [isDark, countries])

  return (
    <div ref={mountRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: 0, pointerEvents: 'none',
    }}>
      {labelPositions.map((lb, i) => lb.visible && (
        <div key={i} style={{
          position: 'absolute',
          left: lb.x,
          top: lb.y,
          transform: `translate(-50%, -100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: labelsVisible ? 1 : 0,
          transition: labelsVisible
            ? `opacity 0.5s ease ${i * 0.08}s`
            : 'opacity 0.05s ease 0s',
        }}>
          {/* Label box */}
          <div style={{
            padding: '3px 10px',
            background: isDark ? 'rgba(13,17,23,0.8)' : 'rgba(255,255,255,0.85)',
            border: `1px solid ${lb.color || (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)')}`,
            borderRadius: 2,
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6em',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: lb.color || (isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)'),
            whiteSpace: 'nowrap',
            marginBottom: 0,
          }}>
            {lb.name}
          </div>
          {/* Pin line */}
          <div style={{
            width: 1,
            height: Math.abs(lb.offsetY),
            background: lb.color || (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
          }} />
          {/* Dot at tip */}
          <div style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: lb.color || (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'),
          }} />
        </div>
      ))}
    </div>
  )
})

export default Globe
