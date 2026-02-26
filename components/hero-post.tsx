import DateFormatter from './date-formatter'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const HeroPost = ({
  title,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section aria-label="Última devoción" className="mb-20 md:mb-28">
      {/* "Latest" badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
          Última devoción
        </span>
        <span className="text-sm text-neutral-400">
          <DateFormatter dateString={date} />
        </span>
      </div>

      {/* Hero card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 border border-stone-200 shadow-md">
        {/* Decorative corner ornament */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-900">
            <path fill="currentColor" d="M40,0 C40,0 0,40 0,100 C0,160 40,200 100,200 C160,200 200,160 200,100 C200,40 160,0 100,0 Z" />
          </svg>
        </div>

        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight text-stone-900 mb-6">
              <Link
                as={`/posts/${slug}`}
                href="/posts/[slug]"
                className="hover:text-amber-800 transition-colors duration-200"
              >
                {title}
              </Link>
            </h2>

            <blockquote className="border-l-4 border-amber-400 pl-6 mb-8">
              <p className="text-xl md:text-2xl font-serif italic text-stone-600 leading-relaxed">
                &ldquo;{excerpt}&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={author.picture}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-200"
                />
                <span className="text-base font-semibold text-stone-700">{author.name}</span>
              </div>

              <Link
                as={`/posts/${slug}`}
                href="/posts/[slug]"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors duration-200 group"
              >
                Leer devoción
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
