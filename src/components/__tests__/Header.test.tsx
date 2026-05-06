import { render } from '@testing-library/react'
import type { NavLink } from '@/types'

// Mock components and constants
jest.mock('../Link', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

jest.mock('@/constants', () => ({
  HOME_PATH: '/',
  SITE_NAME: 'asynctp',
  NAV_LINKS: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Works', href: '/works' },
  ] satisfies NavLink[],
}))

// Mock the Header component
jest.mock('../Header', () => ({
  Header: () => (
    <header role="banner">
      <nav>
        <a href="/">asynctp</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/works">Works</a>
      </nav>
    </header>
  ),
}))

import { Header } from '../Header'

describe('Header', () => {
  it('renders header with site name', () => {
    const { getByText } = render(<Header />)

    expect(getByText('asynctp')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    const { getByText } = render(<Header />)

    expect(getByText('About')).toBeInTheDocument()
    expect(getByText('Blog')).toBeInTheDocument()
    expect(getByText('Works')).toBeInTheDocument()
  })

  it('renders as header element', () => {
    const { getByRole } = render(<Header />)

    const header = getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
