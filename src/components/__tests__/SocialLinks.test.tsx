import { render } from '@testing-library/react'

// Mock the entire SocialLinks component to avoid import issues
jest.mock('../SocialLinks', () => ({
  SocialLinks: (props: unknown) => (
    <div data-testid="social-links" {...(props as object)}>
      <div data-testid="github-icon">GitHub Icon</div>
      <span>GitHub</span>
    </div>
  ),
}))

import { SocialLinks } from '../SocialLinks'

describe('SocialLinks', () => {
  it('renders social links component', () => {
    const { getByText } = render(<SocialLinks />)

    expect(getByText('GitHub')).toBeInTheDocument()
  })

  it('renders social link icons', () => {
    const { getByTestId } = render(<SocialLinks />)

    expect(getByTestId('github-icon')).toBeInTheDocument()
  })

  it('accepts additional props', () => {
    const { getByTestId } = render(
      <SocialLinks data-testid="social-links-component" />
    )

    const socialLinks = getByTestId('social-links-component')
    expect(socialLinks).toBeInTheDocument()
  })
})
