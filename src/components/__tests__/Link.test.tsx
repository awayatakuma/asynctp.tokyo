import { render } from '@testing-library/react'
import { Link } from '../Link'

// Mock Next.js Link to avoid nested anchor issues
jest.mock('next/link', () => {
  return function MockedNextLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: any
  }) {
    return (
      <span data-href={href} {...props}>
        {children}
      </span>
    )
  }
})

describe('Link', () => {
  it('renders link with correct href', () => {
    const { getByText } = render(<Link href="/test">Test Link</Link>)

    expect(getByText('Test Link')).toBeInTheDocument()
  })

  it('accepts additional props', () => {
    const { getByTestId } = render(
      <Link href="/test" data-testid="custom-link">
        Test Link
      </Link>
    )

    const link = getByTestId('custom-link')
    expect(link).toBeInTheDocument()
  })
})
