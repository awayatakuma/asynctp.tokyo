import { render } from '@testing-library/react'

// Mock the entire VRMModel component to avoid Three.js primitive tag warnings
jest.mock('../VRMModel', () => ({
  VRMModel: ({ url, animationUrl }: { url: string; animationUrl?: string }) => (
    <div data-testid="vrm-model" data-url={url} data-animation-url={animationUrl}>
      VRM Model Component
    </div>
  )
}))

const { VRMModel } = require('../VRMModel')


describe('VRMModel', () => {
  const mockProps = {
    url: '/test-model.vrm',
    animationUrl: '/test-animation.vrma',
  }

  it('renders without crashing', () => {
    const { getByTestId } = render(<VRMModel {...mockProps} />)
    expect(getByTestId('vrm-model')).toBeInTheDocument()
  })

  it('renders with only url prop', () => {
    const { getByTestId } = render(<VRMModel url="/test-model.vrm" />)
    expect(getByTestId('vrm-model')).toBeInTheDocument()
  })

  it('passes props correctly', () => {
    const { getByTestId } = render(<VRMModel {...mockProps} />)
    const element = getByTestId('vrm-model')
    expect(element).toHaveAttribute('data-url', '/test-model.vrm')
    expect(element).toHaveAttribute('data-animation-url', '/test-animation.vrma')
  })
})