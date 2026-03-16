import { format, isValid, parseISO } from 'date-fns'

const normalizePostDate = (dateString: string) =>
  dateString.replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):(\d)$/, '$1:0$2')

export const parsePostDate = (dateString: string) => parseISO(normalizePostDate(dateString))

export const formatPostDate = (dateString: string, pattern: string) => {
  const date = parsePostDate(dateString)
  if (!isValid(date)) return dateString
  return format(date, pattern)
}
