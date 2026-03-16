import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const CONFIG = {
  particles: {
    count: 95,
    minSize: 0.8,
    maxSize: 2.8,
    minOpacity: 0.08,
    maxOpacity: 0.35,
    maxSpeed: 0.25,
    colors: [
      { r: 245, g: 237, b: 224 },
      { r: 232, g: 196, b: 117 },
      { r: 212, g: 160, b: 74 },
      { r: 157, g: 195, b: 230 },
      { r: 245, g: 230, b: 210 }
    ]
  },
  glows: [
    { color: 'rgba(91,155,213,', baseOpacity: 0.055, size: 420, x: 0.15, y: 0.25 },
    { color: 'rgba(93,174,124,', baseOpacity: 0.04, size: 380, x: 0.80, y: 0.65 },
    { color: 'rgba(229,168,75,', baseOpacity: 0.045, size: 350, x: 0.50, y: 0.85 }
  ]
}

// ===========================================================================
// Atmosphere component -- particles, ambient glows, vignette
// ===========================================================================
export default function Atmosphere({ isDark }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const glowContainerRef = useRef(null)
  const glowElsRef = useRef([])
  const animRef = useRef(null)
  const isDarkRef = useRef(isDark)

  // Keep a mutable ref so the animation loop always reads the latest value
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  // ---- Particle canvas ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const pc = CONFIG.particles

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles once
    const particles = []
    for (let i = 0; i < pc.count; i++) {
      const c = pc.colors[Math.floor(Math.random() * pc.colors.length)]
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * pc.maxSpeed,
        vy: (Math.random() - 0.5) * pc.maxSpeed,
        size: pc.minSize + Math.random() * (pc.maxSize - pc.minSize),
        baseOpacity: pc.minOpacity + Math.random() * (pc.maxOpacity - pc.minOpacity),
        r: c.r, g: c.g, b: c.b,
        phase: Math.random() * Math.PI * 2
      })
    }
    particlesRef.current = particles

    function tick(time) {
      animRef.current = requestAnimationFrame(tick)
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)

      const mult = isDarkRef.current ? 1.0 : 0.35
      const t = time * 0.001

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -5) p.x = W + 5
        if (p.x > W + 5) p.x = -5
        if (p.y < -5) p.y = H + 5
        if (p.y > H + 5) p.y = -5

        const a = p.baseOpacity * mult * (0.7 + 0.3 * Math.sin(t * 0.8 + p.phase))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${a.toFixed(3)})`
        ctx.fill()
      }
    }
    animRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, []) // run once -- isDark changes are read via isDarkRef

  // ---- Ambient glows ------------------------------------------------------
  useEffect(() => {
    const container = glowContainerRef.current
    if (!container) return

    // Clear previous glow elements and kill their tweens
    glowElsRef.current.forEach(({ el }) => {
      gsap.killTweensOf(el)
      if (el.parentNode) el.parentNode.removeChild(el)
    })
    glowElsRef.current = []

    CONFIG.glows.forEach((g, i) => {
      const opacity = isDark ? g.baseOpacity : g.baseOpacity * 0.4
      const el = document.createElement('div')
      el.className = 'atmosphere-glow-blob'
      el.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'will-change:transform,opacity',
        'filter:blur(80px)',
        `width:${g.size}px`,
        `height:${g.size}px`,
        `left:${g.x * 100}%`,
        `top:${g.y * 100}%`,
        'transform:translate(-50%,-50%)',
        `background:radial-gradient(circle,${g.color}${opacity}) 0%,transparent 70%)`
      ].join(';')
      container.appendChild(el)
      glowElsRef.current.push({ el, config: g })

      // Slow drifting motion
      gsap.to(el, {
        x: () => (Math.random() - 0.5) * 60,
        y: () => (Math.random() - 0.5) * 40,
        duration: 8 + i * 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
      // Gentle pulsing scale
      gsap.to(el, {
        scale: 1.15,
        duration: 6 + i * 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 1.5
      })
    })

    return () => {
      glowElsRef.current.forEach(({ el }) => {
        gsap.killTweensOf(el)
        if (el.parentNode) el.parentNode.removeChild(el)
      })
      glowElsRef.current = []
    }
  }, [isDark])

  // ---- Render -------------------------------------------------------------
  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Ambient glow blobs */}
      <div
        ref={glowContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      />

      {/* Vignette overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 45%,rgba(8,12,20,.35) 75%,rgba(8,12,20,.65) 100%)'
          : 'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 50%,rgba(180,170,155,.15) 78%,rgba(140,130,115,.30) 100%)',
        transition: 'background 0.6s ease'
      }} />
    </>
  )
}
