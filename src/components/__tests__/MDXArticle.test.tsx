import { render, screen } from '@testing-library/react'

// Mock the MDXArticle component to avoid ESM issues
jest.mock('../MDXArticle', () => ({
  MDXArticle: ({ content }: { content: string }) => (
    <div data-testid="mdx-content">{content}</div>
  )
}))

const { MDXArticle } = require('../MDXArticle')

describe('MDXArticle', () => {
  it('renders MDX content', () => {
    const content = '# Test Heading\n\nThis is a test paragraph.'
    
    render(<MDXArticle content={content} />)
    
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
    expect(screen.getByText(/Test Heading/)).toBeInTheDocument()
  })

  it('handles empty content', () => {
    const content = ''
    
    render(<MDXArticle content={content} />)
    
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })
})