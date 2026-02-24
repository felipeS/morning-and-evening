import { PostType } from '../interfaces/post'
import PostPreview from './post-preview'

type Props = {
  posts: PostType[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-16 border-b-2 border-black pb-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter leading-tight">
          El Archivo
        </h2>
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">
           Colección Completa
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32">
        {posts.map((post) => (
          <div key={post.slug} className="group border border-gray-200 hover:border-black transition-colors duration-300 p-6 shadow-sm hover:shadow-md bg-white">
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoreStories
