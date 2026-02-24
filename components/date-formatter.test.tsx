import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DateFormatter from './date-formatter'

describe('DateFormatter', () => {
  it('renders formatted date', () => {
    render(<DateFormatter dateString="2020-03-16T05:35:07.322Z" />)
    expect(screen.getByText('March 16, 2020')).toBeInTheDocument()
  })
})
