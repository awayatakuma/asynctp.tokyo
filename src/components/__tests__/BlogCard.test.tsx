import { render } from '@testing-library/react'
import type { PostMetadatum } from '@/types'
import { BlogCard } from '../BlogCard'

const mockMetadata: PostMetadatum = {
  title: 'Test Blog Post',
  description: 'This is a test description',
  date: '2023-12-01',
  tags: ['test', 'blog'],
  uri: '/blog/test-post',
  emoji: '🧪',
}

describe('BlogCard', () => {
  it('renders blog card with correct information', () => {
    const { getByText } = render(<BlogCard {...mockMetadata} />)

    expect(getByText('Test Blog Post')).toBeInTheDocument()
    expect(getByText('This is a test description')).toBeInTheDocument()
    expect(getByText('2023-12-01')).toBeInTheDocument()
    expect(getByText('test')).toBeInTheDocument()
    expect(getByText('blog')).toBeInTheDocument()
  })

  it('renders correct link for blog post', () => {
    const { getByRole } = render(<BlogCard {...mockMetadata} />)

    const titleLink = getByRole('link', { name: 'Test Blog Post' })
    expect(titleLink).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders tag links correctly', () => {
    const { getByRole } = render(<BlogCard {...mockMetadata} />)

    const testTagLink = getByRole('link', { name: 'test' })
    const blogTagLink = getByRole('link', { name: 'blog' })

    expect(testTagLink).toHaveAttribute('href', '/blog/tag/test')
    expect(blogTagLink).toHaveAttribute('href', '/blog/tag/blog')
  })

  it('renders with empty tags array', () => {
    const metadataWithoutTags = { ...mockMetadata, tags: [] }
    const { getByText } = render(<BlogCard {...metadataWithoutTags} />)

    expect(getByText('Test Blog Post')).toBeInTheDocument()
    expect(getByText('This is a test description')).toBeInTheDocument()
  })
})
