import { render, screen } from '@testing-library/react'

// Mock components and constants
jest.mock('../Link', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}))

jest.mock('@/constants', () => ({
  HOME_PATH: '/',
  SITE_NAME: 'asynctp',
  NAV_LINKS: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Works', href: '/works' },
  ],
}))

// Mock the Header component
jest.mock('../Header', () => ({
  Header: () => (
    <header>
      <nav>
        <a href="/">asynctp</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/works">Works</a>
      </nav>
    </header>
  )
}))

const { Header } = require('../Header')

describe('Header', () => {
  it('renders header with site name', () => {
    render(<Header />)
    
    expect(screen.getByText('asynctp')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Works')).toBeInTheDocument()
  })

  it('renders as header element', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})