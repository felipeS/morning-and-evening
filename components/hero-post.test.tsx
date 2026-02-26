import { render, screen } from '@testing-library/react'
import HeroPost from './hero-post'

describe('HeroPost', () => {
  const props = {
    title: 'Mañana, 10 de Julio',
    coverImage: '/assets/blog/test-cover.jpg',
    date: '2022-07-10',
    excerpt: 'Prueba el espíritu para ver si es de Dios',
    author: {
      name: 'Charles Spurgeon',
      picture: '/assets/blog/authors/charles-spurgeon.jpeg',
    },
    slug: '10-07-AM',
  }

  it('renders the post title as a link', () => {
    render(<HeroPost {...props} />)
    expect(screen.getByText('Mañana, 10 de Julio')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mañana, 10 de Julio/i })).toBeInTheDocument()
  })

  it('renders the excerpt', () => {
    render(<HeroPost {...props} />)
    expect(screen.getByText(/Prueba el espíritu para ver si es de Dios/i)).toBeInTheDocument()
  })

  it('renders the author name', () => {
    render(<HeroPost {...props} />)
    expect(screen.getByText('Charles Spurgeon')).toBeInTheDocument()
  })

  it('renders the "Última devoción" badge', () => {
    render(<HeroPost {...props} />)
    expect(screen.getByText(/Última devoción/i)).toBeInTheDocument()
  })

  it('renders the "Leer devoción" call-to-action link', () => {
    render(<HeroPost {...props} />)
    expect(screen.getByRole('link', { name: /Leer devoción/i })).toBeInTheDocument()
  })
})
