import { useRef, useEffect, useImperativeHandle, forwardRef, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import worldTopo from 'world-atlas/countries-110m.json'

// ─── Country colors ───
const COUNTRY_COLORS = {
  '804': [0.91, 0.44, 0.35],  // Ukraine
  '643': [0.91, 0.44, 0.35],  // Russia
  '792': [0.90, 0.65, 0.29],  // Turkey
  '268': [0.36, 0.68, 0.49],  // Georgia
  '100': [0.36, 0.68, 0.49],  // Bulgaria
  '642': [0.36, 0.61, 0.84],  // Romania
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

// ─── Component ───
const Globe = forwardRef(function Globe({ config = {}, isDark = true }, ref) {
  const mountRef = useRef(null)
  const linesRef = useRef(null)
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

  const countries = useMemo(() => feature(worldTopo, worldTopo.objects.countries), [])

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
    // Animate labels in with delay, out instantly
    clearTimeout(labelsTimerRef.current)
    if (config.labels && config.labels.length > 0) {
      setLabelsVisible(false)
      labelsTimerRef.current = setTimeout(() => setLabelsVisible(true), 600)
    } else {
      setLabelsVisible(false)
    }
  }, [config.lat, config.lng, config.zoom, config.autoRotate, config.labels])

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
    const arr = linesRef.current.geometry.getAttribute('color').array
    const cids = linesRef.current.userData.segCountryIds
    const def = isDark ? [0.45, 0.47, 0.55] : [0.3, 0.3, 0.35]
    for (let i = 0; i < cids.length; i++) {
      const c = COUNTRY_COLORS[cids[i]] || def
      const j = i * 6
      arr[j] = c[0]; arr[j+1] = c[1]; arr[j+2] = c[2]
      arr[j+3] = c[0]; arr[j+4] = c[1]; arr[j+5] = c[2]
    }
    linesRef.current.geometry.getAttribute('color').needsUpdate = true
    const u = linesRef.current.material.uniforms
    u.uFrontOpacity.value = isDark ? 0.7 : 0.5
    u.uBackOpacity.value = isDark ? 0.06 : 0.03
    // Update glow color
    if (glowRef.current) {
      glowRef.current.material.uniforms.glowColor.value.set(
        isDark ? 0xffffff : 0x000000
      )
    }
  }, [isDark])

  // ─── Three.js ───
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

    // ── Country border lines ──
    const defaultColor = isDark ? [0.45, 0.47, 0.55] : [0.3, 0.3, 0.35]
    const verts = []
    const vertColors = []
    const segCountryIds = []

    for (const feat of countries.features) {
      const color = COUNTRY_COLORS[feat.id] || defaultColor
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
          vertColors.push(color[0], color[1], color[2], color[0], color[1], color[2])
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
        uFrontOpacity: { value: isDark ? 0.7 : 0.5 },
        uBackOpacity: { value: isDark ? 0.06 : 0.03 },
      },
      vertexShader: `
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
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vFacing;
        uniform float uFrontOpacity;
        uniform float uBackOpacity;
        void main() {
          float facing = smoothstep(-0.2, 0.4, vFacing);
          gl_FragColor = vec4(vColor, mix(uBackOpacity, uFrontOpacity, facing));
        }
      `,
    })

    const lines = new THREE.LineSegments(geo, mat)
    lines.userData.segCountryIds = segCountryIds
    group.add(lines)
    linesRef.current = lines

    // ── Focus countries: second pass at slight offset for thicker look ──
    const focusVerts = []
    const focusColors = []
    for (const feat of countries.features) {
      if (!COUNTRY_COLORS[feat.id]) continue
      const color = COUNTRY_COLORS[feat.id]
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
          // Slightly larger radius so it sits just above
          const a = latLngToVec3(lat1, lng1, 1.002)
          const b = latLngToVec3(lat2, lng2, 1.002)
          focusVerts.push(a.x, a.y, a.z, b.x, b.y, b.z)
          focusColors.push(color[0], color[1], color[2], color[0], color[1], color[2])
        }
      }
    }
    const focusGeo = new THREE.BufferGeometry()
    focusGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(focusVerts), 3))
    focusGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(focusColors), 3))
    const focusMat = mat.clone()
    focusMat.uniforms = {
      uFrontOpacity: { value: isDark ? 0.85 : 0.65 },
      uBackOpacity: { value: isDark ? 0.04 : 0.02 },
    }
    group.add(new THREE.LineSegments(focusGeo, focusMat))

    // ── Globe edge glow — subtle ring that marks the curvature ──
    // Glow — larger sphere, wider rim, more visible
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
          // Tight, clean edge — just the outline of the sphere
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

      // Correct rotation order: Rx then Ry in local frame
      // = world Ry (longitude) then world Rx (latitude)
      group.rotation.set(0, 0, 0)
      group.rotateX(rotXRef.current)
      group.rotateY(rotYRef.current)

      camera.position.z = 3.15 / zoomRef.current

      const aspect = window.innerWidth / window.innerHeight
      // Hero/ThankYou (autoRotate): push further right so curve fills corners
      // Content slides: smaller offset to keep Black Sea centered
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
          // v is now in NDC (-1 to 1). Convert to screen pixels
          const sx = (v.x * 0.5 + 0.5) * window.innerWidth
          const sy = (-v.y * 0.5 + 0.5) * window.innerHeight
          // Check if on front side of globe (z < 1 in NDC)
          const worldPos = latLngToVec3(lb.lat, lb.lng)
          worldPos.applyMatrix4(group.matrixWorld)
          const camDir = new THREE.Vector3().subVectors(worldPos, camera.position).normalize()
          const normal = worldPos.clone().normalize()
          const facing = normal.dot(camDir)
          projected.push({
            name: lb.name, x: sx, y: sy,
            color: lb.color,
            visible: facing < 0, // facing toward camera
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
          {/* Label box — above */}
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
          {/* Pin line — below label, pointing down to the country */}
          <div style={{
            width: 1,
            height: Math.abs(lb.offsetY),
            background: lb.color || (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
          }} />
          {/* Small dot at the tip */}
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
