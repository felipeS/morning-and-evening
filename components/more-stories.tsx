import { PostType } from '../interfaces/post'
import PostPreview from './post-preview'

type Props = {
  posts: PostType[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section aria-label="Días anteriores" className="mb-24">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-800 tracking-tight">
          Días anteriores
        </h2>
        <div className="flex-1 h-px bg-stone-200" aria-hidden="true"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
