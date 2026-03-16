import { useState, useRef, useCallback } from 'react'
import Globe from './components/Globe'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'

import { screens } from './screenConfig'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDark, setIsDark] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const globeRef = useRef(null)

  const currentScreen = screens[currentIndex]

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  const goToSection = useCallback((index) => {
    if (isAnimating || index < 0 || index >= screens.length || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
  }, [isAnimating, currentIndex])

  return (
    <>
      <Globe ref={globeRef} config={currentScreen.globe} isDark={isDark} />
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <Navigation
        currentIndex={currentIndex}
        totalScreens={screens.length}
        goToSection={goToSection}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        isDark={isDark}
      />
    </>
  )
}
