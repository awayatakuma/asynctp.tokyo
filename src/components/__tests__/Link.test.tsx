import { render, screen } from '@testing-library/react'
import { Link } from '../Link'

// Mock Next.js Link to avoid nested anchor issues
jest.mock('next/link', () => {
  return function MockedNextLink({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) {
    return <span data-href={href}>{children}</span>
  }
})

describe('Link', () => {
  it('renders link with correct href', () => {
    render(<Link href="/test">Test Link</Link>)

    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('accepts additional props', () => {
    render(
      <Link href="/test" data-testid="custom-link">
        Test Link
      </Link>
    )

    const link = screen.getByTestId('custom-link')
    expect(link).toBeInTheDocument()
  })
})
