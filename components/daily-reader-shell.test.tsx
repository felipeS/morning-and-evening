import { render, screen } from '@testing-library/react'
import DailyReaderShell from './daily-reader-shell'
import type { ReaderProps } from '../lib/daily-reader'

jest.mock('../lib/daily-reader', () => ({
  getCurrentReadingSlug: jest.fn((timeline) => timeline[1]?.sessions[1]?.slug ?? null),
  getSessionTypeForDate: jest.fn(() => 'Evening'),
  getSessionTypeFromSlug: jest.fn((slug: string) => (slug.toUpperCase().endsWith('PM') ? 'Evening' : 'Morning')),
}))

const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView
const scrollIntoViewMock = jest.fn()

const createMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))

const props: ReaderProps = {
  timeline: [
    {
      dateKey: '2024-03-15',
      dateLabel: 'Mar 15',
      sessions: [
        { type: 'Morning', label: 'Mañana', referenceLabel: 'Salmos 1:1', slug: '15-03-AM' },
        { type: 'Evening', label: 'Noche', referenceLabel: 'Salmos 1:2', slug: '15-03-PM' },
      ],
    },
    {
      dateKey: '2024-03-16',
      dateLabel: 'Mar 16',
      sessions: [
        { type: 'Morning', label: 'Mañana', referenceLabel: 'Salmos 19:12', slug: '16-03-AM' },
        { type: 'Evening', label: 'Noche', referenceLabel: 'Salmos 19:13', slug: '16-03-PM', active: true },
      ],
    },
  ],
  active: {
    title: 'Salmos 19:13',
    dateLabel: 'Mar 16',
    verseCite: 'Salmos 19:13',
    verseText: 'Guarda también a tu siervo',
    content: '<p>Contenido</p>',
    readTimeMinutes: 4,
  },
  companion: null,
}

describe('DailyReaderShell', () => {
  beforeEach(() => {
    scrollIntoViewMock.mockReset()
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewMock,
    })
  })

  afterAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: originalScrollIntoView,
    })
  })

  it('smoothly scrolls the active day into view by default', async () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: createMatchMedia(false),
    })

    render(<DailyReaderShell {...props} />)

    await screen.findByText('4 min de lectura')

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  })

  it('uses instant scrolling when reduced motion is preferred', async () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: createMatchMedia(true),
    })

    render(<DailyReaderShell {...props} />)

    await screen.findByText('4 min de lectura')

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    })
  })
})
