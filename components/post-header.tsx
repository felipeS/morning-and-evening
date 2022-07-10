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
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic font-bold  mb-12 mt-10 text-center">
        {verse}
        <br />
        <small className='text-center text-base font-sans not-italic font-light tracking-normal'>{cite}</small>
      </h2>
    </>
  )
}

export default PostHeader
