import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import createGlobe from 'cobe'

// Black Sea region markers with custom colors
const MARKERS = [
  // Conflict zones — red
  { location: [44.62, 33.53], size: 0.07, color: [0.90, 0.27, 0.27] },  // Sevastopol
  { location: [46.48, 30.73], size: 0.06, color: [0.90, 0.27, 0.27] },  // Odesa
  { location: [45.33, 36.47], size: 0.05, color: [0.90, 0.27, 0.27] },  // Kerch

  // Energy & trade — gold
  { location: [41.01, 28.97], size: 0.07, color: [1.0, 0.70, 0.25] },   // Istanbul
  { location: [44.72, 37.77], size: 0.06, color: [1.0, 0.70, 0.25] },   // Novorossiysk
  { location: [44.18, 28.63], size: 0.06, color: [1.0, 0.70, 0.25] },   // Constanta

  // Regional — green
  { location: [41.72, 44.79], size: 0.04, color: [0.20, 0.78, 0.35] },  // Tbilisi
  { location: [41.64, 41.63], size: 0.04, color: [0.20, 0.78, 0.35] },  // Batumi
  { location: [42.69, 23.32], size: 0.04, color: [0.20, 0.78, 0.35] },  // Sofia

  // Capitals — blue
  { location: [44.43, 26.10], size: 0.05, color: [0.29, 0.62, 1.0] },   // Bucharest
  { location: [50.45, 30.52], size: 0.06, color: [0.29, 0.62, 1.0] },   // Kyiv
  { location: [39.93, 32.85], size: 0.05, color: [0.29, 0.62, 1.0] },   // Ankara
  { location: [55.76, 37.62], size: 0.06, color: [0.90, 0.27, 0.27] },   // Moscow
]

function latLngToPhi(lat) {
  return (Math.PI / 2) - (lat * Math.PI / 180)
}
function lngToTheta(lng) {
  return -lng * Math.PI / 180
}

const Globe = forwardRef(function Globe({ config = {}, isDark = true }, ref) {
  const canvasRef = useRef(null)
  const globeRef = useRef(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(0)
  const targetPhiRef = useRef(0)
  const targetThetaRef = useRef(0)
  const scaleRef = useRef(config.zoom ?? 1)
  const targetScaleRef = useRef(config.zoom ?? 1)
  const autoRotateRef = useRef(config.autoRotate ?? false)
  const wRef = useRef(0)
  const hRef = useRef(0)

  // Update targets when config changes (slide transition)
  useEffect(() => {
    targetPhiRef.current = latLngToPhi(config.lat ?? 43)
    targetThetaRef.current = lngToTheta(config.lng ?? 34)
    targetScaleRef.current = config.zoom ?? 1
    autoRotateRef.current = config.autoRotate ?? false
  }, [config.lat, config.lng, config.zoom, config.autoRotate])

  useImperativeHandle(ref, () => ({
    pointOfView: ({ lat, lng, zoom }) => {
      targetPhiRef.current = latLngToPhi(lat)
      targetThetaRef.current = lngToTheta(lng)
      if (zoom != null) targetScaleRef.current = zoom
    },
    setAutoRotate: (val) => { autoRotateRef.current = val }
  }), [])

  useEffect(() => {
    const onResize = () => {
      wRef.current = window.innerWidth
      hRef.current = window.innerHeight
    }
    onResize()
    window.addEventListener('resize', onResize)

    // Init refs to current config
    phiRef.current = latLngToPhi(config.lat ?? 43)
    thetaRef.current = lngToTheta(config.lng ?? 34)
    scaleRef.current = config.zoom ?? 1

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: wRef.current * 2,
      height: hRef.current * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: isDark ? 0.8 : 0.05,
      diffuse: isDark ? 2.5 : 3,
      mapSamples: 30000,
      mapBrightness: isDark ? 12 : 10,
      baseColor: isDark ? [0.22, 0.24, 0.30] : [0.95, 0.95, 0.95],
      markerColor: [0.90, 0.27, 0.27],
      glowColor: isDark ? [0.12, 0.14, 0.20] : [0.9, 0.9, 0.9],
      markers: MARKERS,
      scale: scaleRef.current,
      offset: [wRef.current * 0.28, 0],
      onRender: (state) => {
        // Smooth interpolation — position
        const ease = 0.08
        phiRef.current += (targetPhiRef.current - phiRef.current) * ease
        thetaRef.current += (targetThetaRef.current - thetaRef.current) * ease

        // Smooth interpolation — zoom
        scaleRef.current += (targetScaleRef.current - scaleRef.current) * ease

        // Auto-rotate
        if (autoRotateRef.current) {
          thetaRef.current += 0.002
          targetThetaRef.current += 0.002
        }

        state.phi = phiRef.current
        state.theta = thetaRef.current
        state.scale = scaleRef.current
        state.width = wRef.current * 2
        state.height = hRef.current * 2
        state.offset = [wRef.current * 0.28, 0]
      }
    })

    globeRef.current = globe
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
})

export default Globe
