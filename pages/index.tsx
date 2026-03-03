import Head from 'next/head'
import Link from 'next/link'
import styles from './home.module.css'
import { getAllPosts } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { PostType } from '../interfaces/post'

type SessionType = 'Morning' | 'Evening'

type Session = {
  type: SessionType
  icon: string
  label: SessionType
  title: string
  verse: string
  slug: string
  active?: boolean
}

type TimelineDay = {
  dateKey: string
  dateLabel: string
  sessions: Session[]
}

type HomePost = Pick<PostType, 'slug' | 'title' | 'date' | 'excerpt' | 'content' | 'verses'>

type Props = {
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
    excerpt: string
    slug: string
  } | null
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDateLabel = (dateInput: string) => {
  const date = new Date(dateInput)
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}`
}

const getSessionTypeFromSlug = (slug: string): SessionType => (slug.toUpperCase().endsWith('PM') ? 'Evening' : 'Morning')

const getVerseReference = (post: HomePost) => post.verses?.[0]?.cite ?? ''
const getVerseText = (post: HomePost) => post.verses?.[0]?.text ?? ''

export default function Index({ timeline, active, companion }: Props) {
  return (
    <>
      <Head>
        <title>Daily Reader - Devotional</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.appContainer}>
          <main className={styles.readingSurface}>
            <div className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span>Daily Devotion</span>
                <span>5 Min Read</span>
                <span>{active.dateLabel}</span>
              </div>
              <h1 className={styles.title}>{active.title}</h1>
            </div>

            <article className={styles.articleBody}>
              <blockquote className={styles.highlightVerse}>
                <p className={styles.highlightVerseText}>{active.verseText}</p>
                <cite className={styles.highlightVerseCite}>{active.verseCite}</cite>
              </blockquote>
              <div dangerouslySetInnerHTML={{ __html: active.content }} />
            </article>

            {companion && (
              <section className={styles.companionSection}>
                <div className={styles.sectionTitle}>Companion Reading · {active.dateLabel}</div>
                <div className={styles.companionCard}>
                  <div className={styles.companionIcon}>🌙</div>
                  <div className={styles.companionBody}>
                    <div className={styles.companionVerse}>{companion.verseReference}</div>
                    <div className={styles.companionTitle}>{companion.title}</div>
                    <p className={styles.companionText}>{companion.excerpt}</p>
                    <Link href={`/posts/${companion.slug}`} className={styles.companionCta}>
                      Read this companion →
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </main>

          <aside className={styles.timelineColumn}>
            {timeline.map((day) => (
              <div key={day.dateKey} className={styles.timelineDay}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineDateLabel}>{day.dateLabel}</div>
                {day.sessions.map((session) => (
                  <Link
                    href={`/posts/${session.slug}`}
                    key={session.slug}
                    className={`${styles.sessionCard} ${session.active ? styles.active : ''}`}
                  >
                    <div className={styles.sessionTag}>
                      <span className={styles.sessionIcon}>{session.icon}</span>
                      <span className={styles.sessionLabel}>{session.label}</span>
                    </div>
                    <div className={styles.sessionTitle}>{session.title}</div>
                    <div className={styles.sessionVerse}>{session.verse}</div>
                  </Link>
                ))}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'excerpt', 'content', 'verses']) as HomePost[]

  const grouped = new Map<string, HomePost[]>()
  for (const post of allPosts) {
    const key = post.date.slice(0, 10)
    const existing = grouped.get(key) ?? []
    existing.push(post)
    grouped.set(key, existing)
  }

  const sortedDateKeys = Array.from(grouped.keys()).sort((a, b) => (a > b ? 1 : -1))
  const latestDateKey = sortedDateKeys[sortedDateKeys.length - 1]
  const latestPosts = grouped.get(latestDateKey) ?? []
  const morningPost = latestPosts.find((post) => getSessionTypeFromSlug(post.slug) === 'Morning') ?? latestPosts[0]
  const eveningPost = latestPosts.find((post) => getSessionTypeFromSlug(post.slug) === 'Evening') ?? null

  const activeContent = await markdownToHtml(morningPost.content || '')

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
          active: post.slug === morningPost.slug,
        }
      })

    return {
      dateKey,
      dateLabel: formatDateLabel(dateKey),
      sessions,
    }
  })

  return {
    props: {
      timeline,
      active: {
        title: morningPost.title,
        dateLabel: formatDateLabel(morningPost.date),
        verseCite: getVerseReference(morningPost),
        verseText: getVerseText(morningPost),
        content: activeContent,
      },
      companion: eveningPost
        ? {
            title: eveningPost.title,
            verseReference: getVerseReference(eveningPost),
            excerpt: eveningPost.excerpt,
            slug: eveningPost.slug,
          }
        : null,
    },
  }
}
