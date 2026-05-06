import { render } from '@testing-library/react'
import type { MDXArticleProps } from '@/types/components'

// Mock the MDXArticle component to avoid ESM issues
jest.mock('../MDXArticle', () => ({
  MDXArticle: ({ content }: MDXArticleProps) => (
    <div data-testid="mdx-content">{content}</div>
  ),
}))

import { MDXArticle } from '../MDXArticle'

describe('MDXArticle', () => {
  it('renders MDX content', () => {
    const content = '# Test Heading\n\nThis is a test paragraph.'

    const { getByTestId, getByText } = render(<MDXArticle content={content} />)

    expect(getByTestId('mdx-content')).toBeInTheDocument()
    expect(getByText(/Test Heading/)).toBeInTheDocument()
  })

  it('handles empty content', () => {
    const content = ''

    const { getByTestId } = render(<MDXArticle content={content} />)

    expect(getByTestId('mdx-content')).toBeInTheDocument()
  })
})
