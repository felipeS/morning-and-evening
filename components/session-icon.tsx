type Props = {
  type: 'Morning' | 'Evening'
  className?: string
}

export default function SessionIcon({ type, className }: Props) {
  if (type === 'Morning') {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2.75V5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18.75V21.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.75 12H5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.75 12H21.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.45 5.45L7.2 7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.8 16.8L18.55 18.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.8 7.2L18.55 5.45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.45 18.55L7.2 16.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 1 0 21.752 15.002Z"
        fill="currentColor"
      />
    </svg>
  )
}
