import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type PostHeaderProps = {
  title: string
  author: Author
  verse: string
  cite: string
}

const PostHeader = ({ title, author, verse, cite }: PostHeaderProps) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
      <Verse verse={verse} cite={cite} />
    </>
  )
}

type VerseProps = {
  verse: string
  cite: string
}
const Verse = ({verse, cite}: VerseProps) => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight md:leading-none mb-12 text-center">
        {verse}
        <br />
        <small className='text-center text-lg font-medium tracking-normal'>{cite}</small>
      </h2>
    </>
  )
}

export default PostHeader
