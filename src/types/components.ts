import type { FlexProps } from '@chakra-ui/react'

// Component Props types

// VRM related components
export interface VRMModelProps {
  url: string
  animationUrl?: string
}

export interface VRMViewerProps {
  vrmUrl: string
  vrmaUrl: string
  width?: string | number
  height?: string | number
}

// MDX related components
export interface MDXArticleProps {
  content: string
}

export interface MDXFrontmatterProps {
  metadatum: import('./index').PostMetadatum
}

// Layout components
export interface HeroProps extends FlexProps {
  stargazersCount?: number
}

// Common component props
export interface SectionProps extends FlexProps {}

export interface LinkProps {
  href: string
  children: React.ReactNode
  [key: string]: unknown
}