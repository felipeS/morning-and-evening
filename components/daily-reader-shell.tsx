import Link from 'next/link'
import styles from '../pages/home.module.css'
import { ReaderProps } from '../lib/daily-reader'

type Props = ReaderProps

export default function DailyReaderShell({ timeline, active, companion }: Props) {
  return (
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
                <div className={styles.companionIcon}>{companion.slug.toUpperCase().endsWith('PM') ? '🌙' : '☀'}</div>
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
  )
}
