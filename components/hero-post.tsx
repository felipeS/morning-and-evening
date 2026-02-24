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
      <div className="mb-8 md:mb-16">
        {/* <CoverImage title={title} src={coverImage} slug={slug} /> */}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-5xl lg:text-7xl font-serif font-bold leading-tight tracking-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:text-gray-600 transition-colors duration-200">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-sm font-sans uppercase tracking-widest text-gray-500">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed mb-6 drop-shadow-sm border-l-4 border-gray-200 pl-4">
            {excerpt}
          </p>
          <div className="mt-auto">
             <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
