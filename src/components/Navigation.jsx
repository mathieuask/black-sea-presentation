import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { screens } from '../screenConfig'

// ---------------------------------------------------------------------------
// Helper: stagger-fade a list of elements onto a GSAP timeline
// ---------------------------------------------------------------------------
function staggerFadeElements(tl, elements, baseDelay, opts = {}) {
  const o = {
    fromY: 35, fromX: 0, fromScale: 1, fromRotation: 0,
    duration: 0.55, stagger: 0.07, ease: 'power3.out',
    ...opts
  }
  elements.forEach((el, i) => {
    tl.fromTo(el,
      { opacity: 0, y: o.fromY, x: o.fromX, scale: o.fromScale, rotation: o.fromRotation },
      { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0, duration: o.duration, ease: o.ease },
      baseDelay + i * o.stagger
    )
  })
}

// ---------------------------------------------------------------------------
// Helper: animate section header elements (tag, h2, accent-line)
// ---------------------------------------------------------------------------
function animateHeaders(tl, section, baseDelay) {
  const tag = section.querySelector('.tag')
  const h2 = section.querySelector('h2')
  const al = section.querySelector('.accent-line')
  if (tag) tl.fromTo(tag, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, baseDelay)
  if (h2) tl.fromTo(h2, { opacity: 0, y: 25, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'power3.out' }, baseDelay + 0.08)
  if (al) tl.fromTo(al, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, baseDelay + 0.2)
}

// ---------------------------------------------------------------------------
// Detect the "type" of a section by inspecting its DOM content
// ---------------------------------------------------------------------------
function getSectionType(section) {
  if (section.querySelector('.hero-content')) return 'hero'
  if (section.querySelector('.closing-content')) return 'thankyou'
  if (section.querySelector('.section-num')) return 'divider'
  if (section.querySelector('.quote-block')) return 'quote'
  if (section.querySelector('.loss-bar')) return 'lossBars'
  if (section.querySelector('.gauge-fill')) return 'gauges'
  if (section.querySelector('.gpr-chart-canvas')) return 'chart'
  if (section.querySelector('.data-table')) return 'table'
  if (section.querySelector('.timeline')) return 'timeline'
  if (section.querySelector('.actors-grid')) return 'actors'
  if (section.querySelector('.risk-list')) return 'riskList'
  if (section.querySelector('.uamr-grid')) return 'framework'
  if (section.querySelector('.sources-list')) return 'sources'
  if (section.querySelector('.conclusion-grid')) return 'conclusion'
  if (section.querySelector('.stat-grid')) return 'stats'
  return 'default'
}

// ---------------------------------------------------------------------------
// Counter animation  (data-target, data-prefix, data-suffix, data-decimals)
// ---------------------------------------------------------------------------
function animateCounter(el) {
  const raw = el.getAttribute('data-target')
  if (!raw) return
  const prefix = el.getAttribute('data-prefix') || ''
  const suffix = el.getAttribute('data-suffix') || ''
  const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
  const target = parseFloat(raw)
  const duration = parseInt(el.getAttribute('data-duration') || '2000', 10)
  const start = performance.now()
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = prefix + (eased * target).toFixed(decimals) + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

// ---------------------------------------------------------------------------
// Gauge animation  (SVG circle with data-percent)
// ---------------------------------------------------------------------------
function animateGauges(sectionEl) {
  sectionEl.querySelectorAll('.gauge-fill[data-percent]').forEach(circle => {
    const percent = parseFloat(circle.getAttribute('data-percent'))
    const circumference = 283
    circle.style.transition = 'none'
    circle.style.strokeDasharray = String(circumference)
    circle.style.strokeDashoffset = String(circumference)
    circle.getBoundingClientRect() // force reflow
    circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    circle.style.strokeDashoffset = String(circumference - (circumference * percent / 100))
  })
}

// ---------------------------------------------------------------------------
// Loss bar animation
// ---------------------------------------------------------------------------
function animateLossBars(sectionEl) {
  const bars = sectionEl.querySelectorAll('.loss-bar')
  if (!bars.length) return
  gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' })
  gsap.to(bars, { scaleX: 1, duration: 1.1, ease: 'elastic.out(1, 0.5)', stagger: 0.15, delay: 0.45 })
}

// ---------------------------------------------------------------------------
// Animate a section IN  (returns the GSAP timeline)
// ---------------------------------------------------------------------------
function animateIn(section, direction) {
  const type = getSectionType(section)
  const elements = section.querySelectorAll('.fade-element')
  const tl = gsap.timeline()
  const dir = direction || 1

  tl.set(section, { opacity: 1, visibility: 'visible' })
  // Reset all elements to clean state before animating in
  gsap.set(elements, { opacity: 0, x: 0, y: 0, scale: 1, rotation: 0, clearProps: 'clipPath' })

  // --- HERO ---
  if (type === 'hero') {
    const heroContent = section.querySelector('.hero-content')
    if (heroContent) {
      tl.fromTo(heroContent,
        { opacity: 0, scale: 0.85, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' }, 0.05)
    }
    const tag = section.querySelector('.tag')
    const marker = section.querySelector('.hero-marker')
    const h1 = section.querySelector('h1')
    const h3 = section.querySelector('h3')
    const p = section.querySelector('.hero-content > p')
    if (tag) tl.fromTo(tag, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
    if (marker) tl.fromTo(marker, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0.5)
    if (h1) tl.fromTo(h1, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.4)
    if (h3) tl.fromTo(h3, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.65)
    if (p) tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.9)

  // --- DIVIDER ---
  } else if (type === 'divider') {
    const sn = section.querySelector('.section-num')
    const heading = section.querySelector('h2.divider-title')
    const al = section.querySelector('.accent-line')
    const desc = section.querySelector('h2.divider-title ~ p')
    if (sn) tl.fromTo(sn, { opacity: 0, letterSpacing: '0.4em' }, { opacity: 1, letterSpacing: '0.12em', duration: 0.6, ease: 'power3.out' }, 0.05)
    if (heading) tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.15)
    if (al) tl.fromTo(al, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.3)
    if (desc) tl.fromTo(desc, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.35)

  // --- QUOTE (typewriter) ---
  } else if (type === 'quote') {
    const quoteBlock = section.querySelector('.quote-block')
    const attribution = section.querySelector('.quote-attribution')
    if (quoteBlock) {
      if (!quoteBlock._originalText) quoteBlock._originalText = quoteBlock.textContent
      const originalText = quoteBlock._originalText
      quoteBlock.textContent = ''
      quoteBlock.style.opacity = '1'
      quoteBlock.style.transform = 'translateY(0)'
      tl.fromTo(quoteBlock,
        { borderColor: 'transparent', paddingLeft: '0px' },
        { borderColor: 'var(--gold)', paddingLeft: '30px', duration: 0.4, ease: 'power2.out' }, 0.1)
      const chars = originalText.split('')
      let builtText = ''
      chars.forEach((ch, i) => {
        tl.call(() => { builtText += ch; quoteBlock.textContent = builtText }, null, 0.5 + i * 0.016)
      })
    }
    if (attribution) tl.fromTo(attribution, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.15')

  // --- THANK YOU ---
  } else if (type === 'thankyou') {
    const closing = section.querySelector('.closing-content')
    if (closing) tl.fromTo(closing, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, 0.05)
    staggerFadeElements(tl, elements, 0.2, { fromY: 30, duration: 0.6, stagger: 0.12 })

  // --- STATS ---
  } else if (type === 'stats') {
    animateHeaders(tl, section, 0.02)
    const nonStat = []
    const statEls = []
    elements.forEach(el => {
      if (el.classList.contains('stat-card') || el.querySelector('[data-target]')) statEls.push(el)
      else nonStat.push(el)
    })
    staggerFadeElements(tl, nonStat, 0.05, { fromY: 25, duration: 0.5, stagger: 0.06 })
    statEls.forEach((el, i) => {
      tl.fromTo(el,
        { opacity: 0, y: 60, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.7)' }, 0.25 + i * 0.1)
    })

  // --- LOSS BARS ---
  } else if (type === 'lossBars') {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromX: dir * -60, fromY: 0, duration: 0.5, stagger: 0.08 })

  // --- GAUGES ---
  } else if (type === 'gauges') {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromY: 30, fromScale: 0.85, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)' })

  // --- CHART ---
  } else if (type === 'chart') {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromY: 40, duration: 0.6, stagger: 0.08 })

  // --- TIMELINE ---
  } else if (type === 'timeline') {
    animateHeaders(tl, section, 0.02)
    const nonTl = []
    const tlEntries = []
    elements.forEach(el => {
      if (el.classList.contains('tl-entry')) tlEntries.push(el)
      else nonTl.push(el)
    })
    staggerFadeElements(tl, nonTl, 0.05, { fromY: 25, duration: 0.5, stagger: 0.06 })
    tlEntries.forEach((entry, i) => {
      tl.fromTo(entry,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 10 },
        { opacity: 1, x: 0, y: 0, duration: 0.55, ease: 'power3.out' }, 0.2 + i * 0.1)
    })

  // --- ACTORS ---
  } else if (type === 'actors') {
    animateHeaders(tl, section, 0.02)
    const nonA = []
    const cards = []
    elements.forEach(el => {
      if (el.classList.contains('actor-card')) cards.push(el)
      else nonA.push(el)
    })
    staggerFadeElements(tl, nonA, 0.05, { fromY: 25, duration: 0.5, stagger: 0.06 })
    cards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, scale: 0.7, rotation: -5, y: 30 },
        { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, 0.25 + i * 0.09)
    })

  // --- RISK LIST ---
  } else if (type === 'riskList') {
    animateHeaders(tl, section, 0.02)
    const nonR = []
    const items = []
    elements.forEach(el => {
      if (el.classList.contains('risk-item')) items.push(el)
      else nonR.push(el)
    })
    staggerFadeElements(tl, nonR, 0.05, { fromY: 25, duration: 0.5, stagger: 0.06 })
    items.forEach((item, i) => {
      tl.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 8 },
        { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.out' }, 0.2 + i * 0.06)
    })

  // --- FRAMEWORK (UAMR) ---
  } else if (type === 'framework') {
    animateHeaders(tl, section, 0.02)
    const nonFw = []
    const fwCards = []
    elements.forEach(el => {
      if (el.classList.contains('uamr-card')) fwCards.push(el)
      else nonFw.push(el)
    })
    staggerFadeElements(tl, nonFw, 0.05, { fromY: 25, duration: 0.5, stagger: 0.06 })
    fwCards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 50, scale: 0.85, rotationY: -15 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.65, ease: 'back.out(1.3)' }, 0.3 + i * 0.12)
    })

  // --- TABLE ---
  } else if (type === 'table') {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromY: 30, duration: 0.5, stagger: 0.07 })
    const rows = section.querySelectorAll('.data-table tbody tr')
    rows.forEach((row, i) => {
      tl.fromTo(row,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.35 + i * 0.06)
    })

  // --- CONCLUSION ---
  } else if (type === 'conclusion') {
    animateHeaders(tl, section, 0.02)
    const nonCards = []
    const cards = []
    elements.forEach(el => {
      if (el.classList.contains('card')) cards.push(el)
      else nonCards.push(el)
    })
    staggerFadeElements(tl, nonCards, 0.05, { fromY: 25, duration: 0.5, stagger: 0.07 })
    cards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 0.2 + i * 0.1)
    })

  // --- SOURCES ---
  } else if (type === 'sources') {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromY: 20, duration: 0.6, stagger: 0.05, ease: 'power2.out' })

  // --- DEFAULT ---
  } else {
    animateHeaders(tl, section, 0.02)
    staggerFadeElements(tl, elements, 0.05, { fromY: 25, duration: 0.55, stagger: 0.07 })
  }

  // Trigger counters
  section.querySelectorAll('[data-target]').forEach(el => {
    const delay = type === 'stats' ? 450 : 300
    setTimeout(() => animateCounter(el), delay)
  })

  // Trigger gauges
  if (section.querySelector('.gauge-fill[data-percent]')) {
    setTimeout(() => animateGauges(section), 500)
  }

  // Trigger loss bars
  animateLossBars(section)

  return tl
}

// ---------------------------------------------------------------------------
// Animate a section OUT  (returns the GSAP timeline)
// ---------------------------------------------------------------------------
function animateOut(section, direction) {
  const elements = section.querySelectorAll('.fade-element')
  const tl = gsap.timeline()
  const dir = direction || 1
  const count = elements.length

  elements.forEach((el, i) => {
    tl.to(el, { opacity: 0, y: -20, x: dir * -15, duration: 0.3, ease: 'power2.in' }, i * 0.02)
  })
  tl.to(section, { opacity: 0, visibility: 'hidden', duration: 0.01 }, Math.min(count * 0.02 + 0.3, 0.35))

  // Reset loss bars
  section.querySelectorAll('.loss-bar').forEach(bar => gsap.set(bar, { scaleX: 0 }))

  // Reset gauge strokes
  section.querySelectorAll('.gauge-fill[data-percent]').forEach(circle => {
    circle.style.transition = 'none'
    circle.style.strokeDashoffset = '283'
  })

  return tl
}

// ===========================================================================
// Navigation component
// ===========================================================================
export default function Navigation({ currentIndex, totalScreens, goToSection, isAnimating, setIsAnimating, isDark, globeRef }) {
  const wrapperRef = useRef(null)
  const prevIndexRef = useRef(0)
  const initializedRef = useRef(false)

  // ---- Section transitions ------------------------------------------------
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const sectionEls = wrapper.querySelectorAll('.section')
    const prevIndex = prevIndexRef.current

    if (!initializedRef.current) {
      // Initial load -- animate the first section in
      initializedRef.current = true
      const section = sectionEls[0]
      if (section) {
        section.classList.add('active')
        gsap.set(section, { opacity: 1, visibility: 'visible' })
        animateIn(section, 1)
      }
      prevIndexRef.current = currentIndex
      return
    }

    if (prevIndex === currentIndex) return

    const direction = currentIndex > prevIndex ? 1 : -1
    const currentSection = sectionEls[prevIndex]
    const nextSection = sectionEls[currentIndex]
    if (!currentSection || !nextSection) {
      setIsAnimating(false)
      return
    }

    const master = gsap.timeline({
      onComplete: () => {
        currentSection.classList.remove('active')
        nextSection.classList.add('active')
        setIsAnimating(false)
      }
    })

    master.add(animateOut(currentSection, direction))
    master.add(animateIn(nextSection, direction), 0.25)

    prevIndexRef.current = currentIndex
  }, [currentIndex, setIsAnimating])

  // ---- Keyboard navigation ------------------------------------------------
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goToSection(currentIndex + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToSection(currentIndex - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSection(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSection(totalScreens - 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, goToSection, totalScreens])

  // ---- Touch swipe --------------------------------------------------------
  useEffect(() => {
    let startX = 0, startY = 0, startTime = 0
    const onStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      startTime = Date.now()
    }
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && Date.now() - startTime < 500) {
        if (dx < 0) goToSection(currentIndex + 1)
        else goToSection(currentIndex - 1)
      }
    }
    document.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchend', onEnd)
    }
  }, [currentIndex, goToSection])

  // ---- Mouse wheel --------------------------------------------------------
  useEffect(() => {
    let wheelTimeout = null
    const onWheel = (e) => {
      if (wheelTimeout) return
      e.preventDefault()
      goToSection(currentIndex + (e.deltaY > 0 ? 1 : -1))
      wheelTimeout = setTimeout(() => { wheelTimeout = null }, 800)
    }
    document.addEventListener('wheel', onWheel, { passive: false })
    return () => document.removeEventListener('wheel', onWheel)
  }, [currentIndex, goToSection])

  // ---- Render -------------------------------------------------------------
  const progress = (currentIndex / (totalScreens - 1)) * 100

  return (
    <>
      {/* Nav Arrows */}
      <button
        className="nav-arrow prev"
        onClick={() => goToSection(currentIndex - 1)}
        disabled={currentIndex === 0}
        aria-label="Previous section"
      >
        &#8592;
      </button>
      <button
        className="nav-arrow next"
        onClick={() => goToSection(currentIndex + 1)}
        disabled={currentIndex === totalScreens - 1}
        aria-label="Next section"
      >
        &#8594;
      </button>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Slide Counter */}
      <div className="slide-counter">
        {String(currentIndex + 1).padStart(2, '0')} / {String(totalScreens).padStart(2, '0')}
      </div>

      {/* All sections rendered simultaneously; only one is visible at a time */}
      <div className="sections-wrapper" ref={wrapperRef}>
        {screens.map((screen, i) => {
          const ScreenComponent = screen.component
          return (
            <div key={i} className={`section ${i === 0 ? 'active' : ''}`}>
              <div className="section-inner">
                <ScreenComponent isDark={isDark} globeRef={globeRef} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
