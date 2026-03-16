import { formatPostDate, parsePostDate } from './post-date'

describe('post-date', () => {
  it('normalizes malformed one-digit seconds', () => {
    const date = parsePostDate('2022-07-12T18:00:0')

    expect(date.getFullYear()).toBe(2022)
    expect(date.getMonth()).toBe(6)
    expect(date.getDate()).toBe(12)
    expect(date.getHours()).toBe(18)
    expect(date.getMinutes()).toBe(0)
    expect(date.getSeconds()).toBe(0)
  })

  it('formats normalized post dates for display', () => {
    expect(formatPostDate('2022-07-12T18:00:0', 'LLLL d, yyyy')).toBe('July 12, 2022')
  })
})
