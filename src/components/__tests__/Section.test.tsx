import { render } from '@testing-library/react'
import { Section } from '../Section'

describe('Section', () => {
  it('renders section with children', () => {
    const { getByText } = render(
      <Section>
        <div>Test Content</div>
      </Section>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('renders as section element', () => {
    const { getByTestId } = render(
      <Section data-testid="section-component">
        <div>Test Content</div>
      </Section>
    )

    const section = getByTestId('section-component')
    expect(section).toBeInTheDocument()
    expect(section.tagName).toBe('SECTION')
  })

  it('accepts additional props', () => {
    const { getByTestId } = render(
      <Section className="custom-class" data-testid="custom-section">
        <div>Test Content</div>
      </Section>
    )

    const section = getByTestId('custom-section')
    expect(section).toBeInTheDocument()
  })

  it('renders without children', () => {
    const { getByTestId } = render(<Section data-testid="empty-section" />)

    const section = getByTestId('empty-section')
    expect(section).toBeInTheDocument()
  })
})
// Test comment
