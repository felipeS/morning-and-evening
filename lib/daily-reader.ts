import { PostType, Verse } from '../interfaces/post'
import markdownToHtml from './markdownToHtml'
import { parsePostDate } from './post-date'
import { getReadTimeMinutes } from './reading-time'
import { getVerseCitation, getVerseReferenceOnly } from './verse-format'

type SessionType = 'Morning' | 'Evening'

export type Session = {
  type: SessionType
  label: string
  referenceLabel: string
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
    readTimeMinutes: number
  }
  companion: {
    title: string
    verseReference: string
    excerpt: string
    slug: string
  } | null
}

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export const formatDateLabel = (dateInput: string) => {
  const date = parsePostDate(dateInput)
  if (Number.isNaN(date.getTime())) return dateInput.slice(0, 10)
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`
}

export const getSessionTypeFromSlug = (slug: string): SessionType =>
  slug.toUpperCase().endsWith('PM') ? 'Evening' : 'Morning'

export const getSessionLabel = (type: SessionType) => (type === 'Morning' ? 'Mañana' : 'Noche')

export const getSessionTypeForDate = (date: Date): SessionType => (date.getHours() < 12 ? 'Morning' : 'Evening')

export const getVerseReference = (post: ReaderPost) =>
  post.verses?.[0] ? getVerseCitation(post.verses[0]) : ''
export const getVerseText = (post: ReaderPost) => post.verses?.[0]?.text ?? ''
export const getSessionReferenceLabel = (post: ReaderPost) => {
  const verseCount = post.verses?.length ?? 0
  if (verseCount > 1) return `${verseCount} pasajes`
  return post.verses?.[0] ? getVerseReferenceOnly(post.verses[0]) : ''
}

const normalizeVerses = (verses: unknown): Verse[] => {
  if (!Array.isArray(verses)) return []
  return verses.filter(
    (verse): verse is Verse =>
      typeof verse === 'object' &&
      verse !== null &&
      typeof (verse as Verse).text === 'string' &&
      (typeof (verse as Verse).cite === 'string' || typeof (verse as Verse).verse === 'string')
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
          label: getSessionLabel(type),
          referenceLabel: getSessionReferenceLabel(post),
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
      readTimeMinutes: getReadTimeMinutes(activePost.content || ''),
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

export const getCurrentReadingSlug = (timeline: TimelineDay[], now: Date): string | null => {
  if (timeline.length === 0) return null

  const preferredType = getSessionTypeForDate(now)

  const matchingDay = timeline.find((day) => {
    const date = parsePostDate(day.dateKey)
    return date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
  })

  const fallbackDay = timeline[timeline.length - 1]
  const day = matchingDay ?? fallbackDay
  const preferredSession = day.sessions.find((session) => session.type === preferredType)

  return preferredSession?.slug ?? day.sessions[0]?.slug ?? null
}
