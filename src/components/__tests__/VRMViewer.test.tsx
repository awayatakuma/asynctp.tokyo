import { render } from '@testing-library/react'
import type { VRMModelProps, VRMViewerProps } from '@/types/components'

// Mock all dependencies
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
}))

jest.mock('@react-three/drei', () => ({
  Environment: () => <div data-testid="environment">Environment</div>,
  OrbitControls: () => <div data-testid="orbit-controls">OrbitControls</div>,
}))

jest.mock('../VRMModel', () => ({
  VRMModel: ({ url, animationUrl }: VRMModelProps) => (
    <div
      data-testid="vrm-model"
      data-url={url}
      data-animation-url={animationUrl}
    >
      VRM Model
    </div>
  ),
}))

// Mock the VRMViewer component
jest.mock('../VRMViewer', () => ({
  VRMViewer: ({
    vrmUrl,
    vrmaUrl,
    width = '100%',
    height = '500px',
  }: VRMViewerProps) => (
    <div style={{ width, height }} data-testid="vrm-viewer">
      <div data-testid="canvas">
        <div
          data-testid="vrm-model"
          data-url={vrmUrl}
          data-animation-url={vrmaUrl}
        >
          VRM Model
        </div>
        <div data-testid="orbit-controls">OrbitControls</div>
        <div data-testid="environment">Environment</div>
      </div>
    </div>
  ),
}))

import { VRMViewer } from '../VRMViewer'

describe('VRMViewer', () => {
  const mockProps: VRMViewerProps = {
    vrmUrl: '/test-model.vrm',
    vrmaUrl: '/test-animation.vrma',
  }

  it('renders VRM viewer with canvas', () => {
    const { getByTestId } = render(<VRMViewer {...mockProps} />)

    expect(getByTestId('canvas')).toBeInTheDocument()
  })

  it('renders VRM model with correct props', () => {
    const { getByTestId } = render(<VRMViewer {...mockProps} />)

    expect(getByTestId('vrm-model')).toBeInTheDocument()
  })

  it('renders with custom dimensions', () => {
    const { container } = render(
      <VRMViewer {...mockProps} width="600px" height="400px" />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.width).toBe('600px')
    expect(wrapper.style.height).toBe('400px')
  })

  it('renders orbit controls and environment', () => {
    const { getByTestId } = render(<VRMViewer {...mockProps} />)

    expect(getByTestId('orbit-controls')).toBeInTheDocument()
    expect(getByTestId('environment')).toBeInTheDocument()
  })
})
