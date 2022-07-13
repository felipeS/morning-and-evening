import Avatar from './avatar'
import PostTitle from './post-title'
import type Author from '../interfaces/author'
import { Verse } from '../interfaces/post'

type PostHeaderProps = {
  title: string
  author: Author
  verses: Verse[]
}

const PostHeader = ({ title, author, verses }: PostHeaderProps) => {
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
      <div className='max-w-4xl mx-auto'>
        {verses.map((verse) => (
          <Verse key={verse.cite} verse={verse.text} cite={verse.cite} />
        ))}
      </div>
    </>
  )
}

type VerseProps = {
  verse: string
  cite: string
}
const Verse = ({verse, cite}: VerseProps) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic font-bold lg:leading-normal mt-5 mb-7 text-center">
      {verse}
      <small className='block text-center text-base md:text-lg lg:text-lg font-sans not-italic font-medium mt-1 lg:mt-3 text-stone-500'>{cite}</small>
    </h2>
  )
}

export default PostHeader
