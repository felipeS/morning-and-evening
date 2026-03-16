jest.mock('./markdownToHtml', () => jest.fn())

import { formatDateLabel, getSessionReferenceLabel, getVerseReference, ReaderPost } from './daily-reader'

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
    expect(
      getVerseReference(
        buildPost([{ text: 'Texto', verse: 'Génesis 1:4', 'bible-version': 'RVR1960' }])
      )
    ).toBe('Génesis 1:4 RVR1960')
  })
})
