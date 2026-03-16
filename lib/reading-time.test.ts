import { formatReadTime, getReadTimeMinutes } from './reading-time'

describe('reading-time', () => {
  it('computes at least one minute for short content', () => {
    expect(getReadTimeMinutes('Short devotional text.')).toBe(1)
  })

  it('ignores basic markdown formatting when computing read time', () => {
    const content = `
# Heading

This is a [linked paragraph](https://example.com) with **bold** text.

> A quoted line to read.

\`\`\`
const hidden = 'code block'
\`\`\`
`

    expect(getReadTimeMinutes(content)).toBe(1)
  })

  it('formats the read time label', () => {
    expect(formatReadTime(3)).toBe('3 min de lectura')
  })
})
