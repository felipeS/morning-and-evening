import { render, screen } from '@testing-library/react'
import PostHeader from './post-header'

describe('PostHeader', () => {
  const props = {
    title: 'Test Post',
    author: {
      name: 'Test Author',
      picture: '/assets/blog/authors/test.jpeg',
    },
    verses: [
        { text: 'Verse 1', cite: 'Citation 1' },
        { text: 'Verse 2', cite: 'Citation 2' }
    ]
  }

  it('renders post header details', () => {
    render(<PostHeader {...props} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    // Author appears twice (mobile/desktop)
    expect(screen.getAllByText('Test Author').length).toBeGreaterThan(0)

    expect(screen.getByText('Verse 1')).toBeInTheDocument()
    expect(screen.getByText('Citation 1')).toBeInTheDocument()
    expect(screen.getByText('Verse 2')).toBeInTheDocument()
    expect(screen.getByText('Citation 2')).toBeInTheDocument()
  })
})
