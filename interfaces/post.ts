import type Author from './author'

export type Verse = {
  text: string
  cite?: string
  verse?: string
  bibleVersion?: string
  'bible-version'?: string
}

export type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  verse: string
  cite: string
  verses: Verse[]
}
