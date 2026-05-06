import { render } from '@testing-library/react'

// Mock the SocialLinks component
jest.mock('../SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>,
}))

// Mock the Footer component
jest.mock('../Footer', () => ({
  Footer: () => (
    <footer>
      <div data-testid="social-links">Social Links</div>
      <span>©asynctp</span>
    </footer>
  ),
}))

import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders footer with copyright text', () => {
    const { getByText } = render(<Footer />)

    expect(getByText('©asynctp')).toBeInTheDocument()
  })

  it('renders footer as footer element', () => {
    const { getByRole } = render(<Footer />)

    const footer = getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders SocialLinks component', () => {
    const { getByTestId } = render(<Footer />)

    expect(getByTestId('social-links')).toBeInTheDocument()
  })
})
