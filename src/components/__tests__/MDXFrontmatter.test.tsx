import { render, screen } from '@testing-library/react'
import type { PostMetadatum } from '@/types'
import { MDXFrontmatter } from '../MDXFrontmatter'

const mockMetadatum: PostMetadatum = {
  title: 'Test Article',
  description: 'Test description',
  date: '2023-12-01',
  tags: ['test', 'article'],
  uri: '/blog/test-article',
  emoji: '📝',
}

describe('MDXFrontmatter', () => {
  it('renders frontmatter with title and date', () => {
    render(<MDXFrontmatter metadatum={mockMetadatum} />)

    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('2023-12-01')).toBeInTheDocument()
  })

  it('renders emoji when provided', () => {
    render(<MDXFrontmatter metadatum={mockMetadatum} />)

    expect(screen.getByText('📝')).toBeInTheDocument()
  })

  it('renders without emoji when not provided', () => {
    const metadatumWithoutEmoji = { ...mockMetadatum, emoji: undefined }
    render(<MDXFrontmatter metadatum={metadatumWithoutEmoji} />)

    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.queryByText('📝')).not.toBeInTheDocument()
  })

  it('renders tag links correctly', () => {
    render(<MDXFrontmatter metadatum={mockMetadatum} />)

    const testTagLink = screen.getByRole('link', { name: 'test' })
    const articleTagLink = screen.getByRole('link', { name: 'article' })

    expect(testTagLink).toHaveAttribute('href', '/blog/tag/test')
    expect(articleTagLink).toHaveAttribute('href', '/blog/tag/article')
  })

  it('renders with empty tags array', () => {
    const metadatumWithoutTags = { ...mockMetadatum, tags: [] }
    render(<MDXFrontmatter metadatum={metadatumWithoutTags} />)

    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('2023-12-01')).toBeInTheDocument()
  })
})
