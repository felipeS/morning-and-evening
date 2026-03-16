import { getVerseCitation, getVerseReferenceOnly } from './verse-format'

describe('verse-format', () => {
  it('extracts only the reference from a legacy cite field', () => {
    expect(getVerseReferenceOnly({ text: 'Texto', cite: 'Efesios 2:19 RVR1960' })).toBe('Efesios 2:19')
  })

  it('uses the split verse field as the sidebar reference', () => {
    expect(
      getVerseReferenceOnly({ text: 'Texto', verse: 'Génesis 1:4', 'bible-version': 'RVR1960' })
    ).toBe('Génesis 1:4')
  })

  it('builds the full citation from split fields', () => {
    expect(getVerseCitation({ text: 'Texto', verse: 'Génesis 1:4', 'bible-version': 'RVR1960' })).toBe(
      'Génesis 1:4 RVR1960'
    )
  })
})
