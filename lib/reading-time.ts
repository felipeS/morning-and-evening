const WORDS_PER_MINUTE = 200

const stripMarkdown = (content: string) =>
  content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const getReadTimeMinutes = (content: string) => {
  const normalizedContent = stripMarkdown(content)
  const wordCount = normalizedContent ? normalizedContent.split(' ').length : 0

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export const formatReadTime = (minutes: number) => `${minutes} min de lectura`
