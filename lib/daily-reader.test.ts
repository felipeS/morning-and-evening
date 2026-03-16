jest.mock('./markdownToHtml', () => jest.fn())

import {
  formatDateLabel,
  getCurrentReadingSlug,
  getSessionReferenceLabel,
  getSessionTypeForDate,
  getVerseReference,
  ReaderPost,
  TimelineDay,
} from './daily-reader'

const buildPost = (verses: ReaderPost['verses']): ReaderPost => ({
  slug: '10-07-AM',
  title: 'Mañana, 10 de Julio',
  date: '2020-07-10T00:00:00.000Z',
  excerpt: '',
  content: '',
  verses,
})

describe('daily-reader helpers', () => {
  it('formats date-only values without shifting the day', () => {
    expect(formatDateLabel('2022-07-10')).toBe('Jul 10')
  })

  it('uses the verse reference when there is only one passage', () => {
    expect(getSessionReferenceLabel(buildPost([{ text: 'Texto', cite: 'Efesios 2:19 RVR1960' }]))).toBe(
      'Efesios 2:19'
    )
  })

  it('uses a passage count when there are multiple verses', () => {
    expect(
      getSessionReferenceLabel(
        buildPost([
          { text: 'Texto 1', cite: 'Efesios 2:19 RVR1960' },
          { text: 'Texto 2', cite: 'Salmo 23:1 RVR1960' },
        ])
      )
    ).toBe('2 pasajes')
  })

  it('builds the full citation for the main post display from split verse fields', () => {
    expect(getVerseReference(buildPost([{ text: 'Texto', verse: 'Génesis 1:4', 'bible-version': 'RVR1960' }]))).toBe(
      'Génesis 1:4 RVR1960'
    )
  })

  it('uses morning for client times before noon', () => {
    expect(getSessionTypeForDate(new Date('2024-03-16T11:59:00'))).toBe('Morning')
  })

  it('uses evening for client times at noon or later', () => {
    expect(getSessionTypeForDate(new Date('2024-03-16T12:00:00'))).toBe('Evening')
  })

  it('selects the current day and matching client session', () => {
    const timeline: TimelineDay[] = [
      {
        dateKey: '2024-03-15',
        dateLabel: 'Mar 15',
        sessions: [
          { type: 'Morning', label: 'Mañana', referenceLabel: 'A', slug: '15-03-AM' },
          { type: 'Evening', label: 'Noche', referenceLabel: 'B', slug: '15-03-PM' },
        ],
      },
      {
        dateKey: '2024-03-16',
        dateLabel: 'Mar 16',
        sessions: [
          { type: 'Morning', label: 'Mañana', referenceLabel: 'A', slug: '16-03-AM' },
          { type: 'Evening', label: 'Noche', referenceLabel: 'B', slug: '16-03-PM' },
        ],
      },
    ]

    expect(getCurrentReadingSlug(timeline, new Date('2024-03-16T20:00:00'))).toBe('16-03-PM')
  })

  it('falls back to the latest day when the current day is missing', () => {
    const timeline: TimelineDay[] = [
      {
        dateKey: '2024-03-15',
        dateLabel: 'Mar 15',
        sessions: [{ type: 'Morning', label: 'Mañana', referenceLabel: 'A', slug: '15-03-AM' }],
      },
      {
        dateKey: '2024-03-17',
        dateLabel: 'Mar 17',
        sessions: [{ type: 'Morning', label: 'Mañana', referenceLabel: 'A', slug: '17-03-AM' }],
      },
    ]

    expect(getCurrentReadingSlug(timeline, new Date('2024-03-16T08:00:00'))).toBe('17-03-AM')
  })
})
