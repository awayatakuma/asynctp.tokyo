import { render, screen } from '@testing-library/react'
import { Section } from '../Section'

describe('Section', () => {
  it('renders section with children', () => {
    render(
      <Section>
        <div>Test Content</div>
      </Section>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders as section element', () => {
    render(
      <Section data-testid="section-component">
        <div>Test Content</div>
      </Section>
    )

    const section = screen.getByTestId('section-component')
    expect(section).toBeInTheDocument()
    expect(section.tagName).toBe('SECTION')
  })

  it('accepts additional props', () => {
    render(
      <Section className="custom-class" data-testid="custom-section">
        <div>Test Content</div>
      </Section>
    )

    const section = screen.getByTestId('custom-section')
    expect(section).toBeInTheDocument()
  })

  it('renders without children', () => {
    render(<Section data-testid="empty-section" />)

    const section = screen.getByTestId('empty-section')
    expect(section).toBeInTheDocument()
  })
})
