import { PostType, Verse } from '../interfaces/post'
import markdownToHtml from './markdownToHtml'

type SessionType = 'Morning' | 'Evening'

export type Session = {
  type: SessionType
  icon: string
  label: SessionType
  title: string
  verse: string
  slug: string
  active?: boolean
}

export type TimelineDay = {
  dateKey: string
  dateLabel: string
  sessions: Session[]
}

export type ReaderPost = Pick<PostType, 'slug' | 'title' | 'date' | 'excerpt' | 'content' | 'verses'>

export type ReaderProps = {
  timeline: TimelineDay[]
  active: {
    title: string
    dateLabel: string
    verseCite: string
    verseText: string
    content: string
  }
  companion: {
    title: string
    verseReference: string
    excerpt: string
    slug: string
  } | null
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const formatDateLabel = (dateInput: string) => {
  const date = new Date(dateInput)
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}`
}

export const getSessionTypeFromSlug = (slug: string): SessionType =>
  slug.toUpperCase().endsWith('PM') ? 'Evening' : 'Morning'

export const getVerseReference = (post: ReaderPost) => post.verses?.[0]?.cite ?? ''
export const getVerseText = (post: ReaderPost) => post.verses?.[0]?.text ?? ''

const normalizeVerses = (verses: unknown): Verse[] => {
  if (!Array.isArray(verses)) return []
  return verses.filter(
    (verse): verse is Verse =>
      typeof verse === 'object' &&
      verse !== null &&
      typeof (verse as Verse).text === 'string' &&
      typeof (verse as Verse).cite === 'string'
  )
}

export const toReaderPosts = (posts: Record<string, unknown>[]): ReaderPost[] =>
  posts.map((post) => ({
    slug: String(post.slug ?? ''),
    title: String(post.title ?? ''),
    date: String(post.date ?? ''),
    excerpt: String(post.excerpt ?? ''),
    content: String(post.content ?? ''),
    verses: normalizeVerses(post.verses),
  }))

export const buildReaderProps = async (allPosts: ReaderPost[], activeSlug?: string): Promise<ReaderProps> => {
  const grouped = new Map<string, ReaderPost[]>()
  for (const post of allPosts) {
    const key = post.date.slice(0, 10)
    const existing = grouped.get(key) ?? []
    existing.push(post)
    grouped.set(key, existing)
  }

  const sortedDateKeys = Array.from(grouped.keys()).sort((a, b) => (a > b ? 1 : -1))
  const latestDateKey = sortedDateKeys[sortedDateKeys.length - 1]
  const latestPosts = grouped.get(latestDateKey) ?? []
  const defaultPost = latestPosts.find((post) => getSessionTypeFromSlug(post.slug) === 'Morning') ?? latestPosts[0]
  const activePost = allPosts.find((post) => post.slug === activeSlug) ?? defaultPost
  const activeType = getSessionTypeFromSlug(activePost.slug)

  const activeContent = await markdownToHtml(activePost.content || '')

  const sameDayPosts = grouped.get(activePost.date.slice(0, 10)) ?? []
  const companionType: SessionType = activeType === 'Morning' ? 'Evening' : 'Morning'
  const companionPost = sameDayPosts.find((post) => getSessionTypeFromSlug(post.slug) === companionType) ?? null

  const timeline = sortedDateKeys.map((dateKey) => {
    const sessions = (grouped.get(dateKey) ?? [])
      .sort((a, b) => {
        const aIsMorning = getSessionTypeFromSlug(a.slug) === 'Morning'
        const bIsMorning = getSessionTypeFromSlug(b.slug) === 'Morning'
        if (aIsMorning === bIsMorning) return 0
        return aIsMorning ? -1 : 1
      })
      .map((post) => {
        const type = getSessionTypeFromSlug(post.slug)
        return {
          type,
          icon: type === 'Morning' ? '☀' : '🌙',
          label: type,
          title: post.title,
          verse: getVerseReference(post),
          slug: post.slug,
          active: post.slug === activePost.slug,
        }
      })

    return {
      dateKey,
      dateLabel: formatDateLabel(dateKey),
      sessions,
    }
  })

  return {
    timeline,
    active: {
      title: activePost.title,
      dateLabel: formatDateLabel(activePost.date),
      verseCite: getVerseReference(activePost),
      verseText: getVerseText(activePost),
      content: activeContent,
    },
    companion: companionPost
      ? {
          title: companionPost.title,
          verseReference: getVerseReference(companionPost),
          excerpt: companionPost.excerpt,
          slug: companionPost.slug,
        }
      : null,
  }
}
