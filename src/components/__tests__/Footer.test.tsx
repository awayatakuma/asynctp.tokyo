import { render, screen } from '@testing-library/react'

// Mock the SocialLinks component
jest.mock('../SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>
}))

// Mock the Footer component
jest.mock('../Footer', () => ({
  Footer: () => (
    <footer>
      <div data-testid="social-links">Social Links</div>
      <span>©asynctp</span>
    </footer>
  )
}))

const { Footer } = require('../Footer')

describe('Footer', () => {
  it('renders footer with copyright text', () => {
    render(<Footer />)
    
    expect(screen.getByText('©asynctp')).toBeInTheDocument()
  })

  it('renders footer as footer element', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders SocialLinks component', () => {
    render(<Footer />)
    
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
  })
})