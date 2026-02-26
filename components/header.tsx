import Link from 'next/link'
import ThemeToggle from './theme-toggle'

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          Mañana y Noche
        </Link>
      </h2>
      <ThemeToggle />
    </header>
  )
}

export default Header
