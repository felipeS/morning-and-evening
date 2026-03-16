import { Verse } from '../interfaces/post'

const VERSION_TOKEN_PATTERN = /^[A-Z0-9-]{2,}$/

export const getBibleVersion = (verse: Verse) => verse['bible-version'] ?? verse.bibleVersion ?? ''

export const getVerseReferenceOnly = (verse: Verse) => {
  if (verse.verse) return verse.verse

  const cite = verse.cite?.trim() ?? ''
  if (!cite) return ''

  const parts = cite.split(/\s+/)
  const trailingToken = parts[parts.length - 1]

  if (parts.length > 1 && VERSION_TOKEN_PATTERN.test(trailingToken) && !trailingToken.includes(':')) {
    return parts.slice(0, -1).join(' ')
  }

  return cite
}

export const getVerseCitation = (verse: Verse) => {
  if (verse.cite?.trim()) return verse.cite.trim()

  const reference = verse.verse?.trim() ?? ''
  const version = getBibleVersion(verse).trim()

  return [reference, version].filter(Boolean).join(' ')
}
