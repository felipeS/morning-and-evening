import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
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
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start mb-24 md:mb-32">
        <div className="md:order-last">
           {/* Placeholder for cover image if available */}
           {coverImage ? (
             <div className="relative aspect-[3/4] bg-gray-100 border border-black shadow-lg">
                <CoverImage title={title} src={coverImage} slug={slug} />
             </div>
           ) : (
              <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center border border-black shadow-lg">
                <span className="font-serif italic text-gray-400 text-2xl">Sin Imagen</span>
              </div>
           )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-6 font-sans font-bold text-xs uppercase tracking-[0.2em] text-gray-500 border-b border-gray-300 pb-2 inline-block">
             <DateFormatter dateString={date} />
          </div>
          <h3 className="mb-6 text-5xl lg:text-7xl font-serif font-black leading-[0.9] tracking-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline decoration-4 decoration-gray-300 underline-offset-4">
              {title}
            </Link>
          </h3>
          <div className="mb-8">
             <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
              {excerpt}
             </p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-8 border-t border-black">
             <Avatar name={author.name} picture={author.picture} />
             <Link as={`/posts/${slug}`} href="/posts/[slug]" className="font-sans font-bold uppercase tracking-widest text-sm hover:text-gray-600 transition-colors flex items-center group">
               Leer Devocional <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
             </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
