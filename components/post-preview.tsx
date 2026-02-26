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

const PostPreview = ({
  title,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <article className="group flex flex-col gap-3 p-6 rounded-xl bg-white border border-stone-100 hover:border-amber-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-stone-400 tracking-wide uppercase">
          <DateFormatter dateString={date} />
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold font-serif leading-snug text-stone-900 group-hover:text-amber-800 transition-colors duration-200">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline underline-offset-2">
          {title}
        </Link>
      </h3>

      <p className="text-base font-serif italic text-stone-500 leading-relaxed line-clamp-2">
        &ldquo;{excerpt}&rdquo;
      </p>

      <div className="mt-auto pt-3 border-t border-stone-100 flex items-center gap-2">
        <img
          src={author.picture}
          alt={author.name}
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="text-sm text-stone-500">{author.name}</span>
      </div>
    </article>
  )
}

export default PostPreview
