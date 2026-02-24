import { render, screen } from '@testing-library/react'
import PostPreview from './post-preview'

describe('PostPreview', () => {
  const props = {
    title: 'Test Post',
    coverImage: '/assets/blog/test-cover.jpg',
    date: '2020-03-16T05:35:07.322Z',
    excerpt: 'Test excerpt',
    author: {
      name: 'Test Author',
      picture: '/assets/blog/authors/test.jpeg',
    },
    slug: 'test-post',
  }

  it('renders post preview details', () => {
    render(<PostPreview {...props} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test excerpt')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })
})
