import { render } from '@testing-library/react'
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
    const { getByText } = render(<MDXFrontmatter metadatum={mockMetadatum} />)

    expect(getByText('Test Article')).toBeInTheDocument()
    expect(getByText('2023-12-01')).toBeInTheDocument()
  })

  it('renders emoji when provided', () => {
    const { getByText } = render(<MDXFrontmatter metadatum={mockMetadatum} />)

    expect(getByText('📝')).toBeInTheDocument()
  })

  it('renders without emoji when not provided', () => {
    const metadatumWithoutEmoji = { ...mockMetadatum, emoji: undefined }
    const { getByText, queryByText } = render(
      <MDXFrontmatter metadatum={metadatumWithoutEmoji} />
    )

    expect(getByText('Test Article')).toBeInTheDocument()
    expect(queryByText('📝')).not.toBeInTheDocument()
  })

  it('renders tag links correctly', () => {
    const { getByRole } = render(<MDXFrontmatter metadatum={mockMetadatum} />)

    const testTagLink = getByRole('link', { name: 'test' })
    const articleTagLink = getByRole('link', { name: 'article' })

    expect(testTagLink).toHaveAttribute('href', '/blog/tag/test')
    expect(articleTagLink).toHaveAttribute('href', '/blog/tag/article')
  })

  it('renders with empty tags array', () => {
    const metadatumWithoutTags = { ...mockMetadatum, tags: [] }
    const { getByText } = render(
      <MDXFrontmatter metadatum={metadatumWithoutTags} />
    )

    expect(getByText('Test Article')).toBeInTheDocument()
    expect(getByText('2023-12-01')).toBeInTheDocument()
  })
})
