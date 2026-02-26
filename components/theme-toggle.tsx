import { useTheme } from './theme-provider'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
    if (theme === 'dark') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }

  const getLabel = () => {
    if (theme === 'system') return 'System'
    if (theme === 'dark') return 'Dark'
    return 'Light'
  }

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-200/50 dark:bg-stone-700/50 text-stone-600 dark:text-stone-300 hover:bg-stone-300/50 dark:hover:bg-stone-600/50 transition-colors"
      aria-label={`Current theme: ${getLabel()}. Click to change.`}
    >
      {getIcon()}
      <span className="text-sm font-medium">{getLabel()}</span>
    </button>
  )
}
