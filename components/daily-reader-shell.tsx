import { Suspense, lazy } from 'react'
import Link from 'next/link'
import styles from '../pages/home.module.css'
import { ReaderProps } from '../lib/daily-reader'
import { getSessionTypeFromSlug } from '../lib/daily-reader'
import { formatReadTime } from '../lib/reading-time'
import SessionIcon from './session-icon'

type Props = ReaderProps

const ReadTimeLabel = lazy(() => import('./read-time-label'))

export default function DailyReaderShell({ timeline, active, companion }: Props) {
  const companionType = companion ? getSessionTypeFromSlug(companion.slug) : null

  return (
    <div className={styles.page}>
      <div className={styles.appContainer}>
        <aside className={styles.introPanel}>
          <div className={styles.introEyebrow}>Charles Spurgeon</div>
          <h2 className={styles.introTitle}>Mañana y Noche</h2>
          <p className={styles.introDescription}>
            Lecturas devocionales para la mañana y la noche, con meditaciones breves de Charles Spurgeon en
            español.
          </p>
        </aside>

        <main className={styles.readingSurface}>
          <div className={styles.articleHeader}>
            <div className={styles.articleMeta}>
              <span>Charles Spurgeon</span>
              <Suspense fallback={<span>{formatReadTime(active.readTimeMinutes)}</span>}>
                <ReadTimeLabel minutes={active.readTimeMinutes} />
              </Suspense>
              <span>{active.dateLabel}</span>
            </div>
            <h1 className={styles.title}>{active.title}</h1>
          </div>

          <article className={styles.articleBody}>
            <blockquote className={styles.highlightVerse}>
              <p className={styles.highlightVerseText}>{active.verseText}</p>
              <cite className={styles.highlightVerseCite}>{active.verseCite}</cite>
            </blockquote>
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: active.content }} />
          </article>

          {companion && (
            <section className={styles.companionSection}>
              <div className={styles.sectionTitle}>Lectura complementaria · {active.dateLabel}</div>
              <div className={styles.companionCard}>
                <SessionIcon
                  type={companionType!}
                  className={`${styles.companionIcon} ${companionType === 'Morning' ? styles.morningIcon : styles.eveningIcon}`}
                />
                <div className={styles.companionBody}>
                  <div className={styles.companionVerse}>{companion.verseReference}</div>
                  <div className={styles.companionTitle}>{companion.title}</div>
                  <p className={styles.companionText}>{companion.excerpt}</p>
                  <Link href={`/posts/${companion.slug}`} className={styles.companionCta}>
                    Leer esta lectura →
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>

        <div className={styles.timelineTray}>
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
                      <SessionIcon
                        type={session.type}
                        className={`${styles.sessionIcon} ${
                          session.type === 'Morning' ? styles.morningIcon : styles.eveningIcon
                        }`}
                      />
                      <span className={styles.sessionLabel}>{session.label}</span>
                    </div>
                    <div className={styles.sessionVerse}>{session.referenceLabel}</div>
                  </Link>
                ))}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
