export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle dark/light mode">
      <span>{isDark ? '\u263E' : '\u263C'}</span>
    </button>
  )
}
