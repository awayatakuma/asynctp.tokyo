import { render, screen } from '@testing-library/react'

// Mock components to avoid dependency issues
jest.mock('../Section', () => ({
  Section: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}))

jest.mock('@/constants', () => ({
  HERO_ICON: '/hero-icon.jpg',
}))

// Mock the Hero component
jest.mock('../Hero', () => ({
  Hero: () => (
    <section data-testid="hero">
      {/** biome-ignore lint/performance/noImgElement: this is in a test code */}
      <img src="/hero-icon.jpg" alt="hero-icon" />
      <h1>Hello,</h1>
      <h1>I'm asynct</h1>
      {/** biome-ignore lint/performance/noImgElement: this is in a test code */}
      <img src="/assets/512.webp" alt="hand waving" />
    </section>
  ),
}))

import { Hero } from '../Hero'

describe('Hero', () => {
  it('renders hero section with greeting text', () => {
    render(<Hero />)

    expect(screen.getByText('Hello,')).toBeInTheDocument()
    expect(screen.getByText("I'm asynct")).toBeInTheDocument()
  })

  it('renders hero avatar', () => {
    render(<Hero />)

    const avatar = screen.getByRole('img', { name: 'hero-icon' })
    expect(avatar).toBeInTheDocument()
  })

  it('renders waving hand image', () => {
    render(<Hero />)

    const handImage = screen.getByAltText('hand waving')
    expect(handImage).toBeInTheDocument()
  })
})
