import { render } from '@testing-library/react'
import { Fonts } from '../Fonts'

describe('Fonts', () => {
  it('renders without crashing', () => {
    render(<Fonts />)
  })

  it('applies global font styles', () => {
    render(<Fonts />)

    // Check if the component renders (Global component from emotion doesn't create visible DOM)
    expect(document.head.querySelector('style')).toBeTruthy()
  })
})
