import { render } from '@testing-library/react'
import { Link } from '../Link'

// Mock Next.js Link to avoid nested anchor issues
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => (
    <span data-href={href} {...props}>
      {children}
    </span>
  ),
}))

describe('Link Component', () => {
  it('renders a link with correctly passed props', () => {
    const { getByText } = render(<Link href="/test">Test Link</Link>)
    const linkElement = getByText('Test Link')
    expect(linkElement).toHaveAttribute('data-href', '/test')
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <Link href="/test">
        <span>Child Content</span>
      </Link>
    )
    expect(getByText('Child Content')).toBeInTheDocument()
  })
})
