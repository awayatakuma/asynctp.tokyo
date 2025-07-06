import { render, screen } from '@testing-library/react'
import { BlogCard } from '../BlogCard'

const mockMetadata = {
  title: 'Test Blog Post',
  description: 'This is a test description',
  date: '2023-12-01',
  tags: ['test', 'blog'],
  uri: '/blog/test-post',
  emoji: '🧪',
  featured: false,
  published: true,
  slug: 'test-post',
}

describe('BlogCard', () => {
  it('renders blog card with correct information', () => {
    render(<BlogCard {...mockMetadata} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test description')).toBeInTheDocument()
    expect(screen.getByText('2023-12-01')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
  })

  it('renders correct link for blog post', () => {
    render(<BlogCard {...mockMetadata} />)
    
    const titleLink = screen.getByRole('link', { name: 'Test Blog Post' })
    expect(titleLink).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders tag links correctly', () => {
    render(<BlogCard {...mockMetadata} />)
    
    const testTagLink = screen.getByRole('link', { name: 'test' })
    const blogTagLink = screen.getByRole('link', { name: 'blog' })
    
    expect(testTagLink).toHaveAttribute('href', '/blog/tag/test')
    expect(blogTagLink).toHaveAttribute('href', '/blog/tag/blog')
  })

  it('renders with empty tags array', () => {
    const metadataWithoutTags = { ...mockMetadata, tags: [] }
    render(<BlogCard {...metadataWithoutTags} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test description')).toBeInTheDocument()
  })
})