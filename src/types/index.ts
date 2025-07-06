import type { IconType } from 'react-icons'

// Content-related types
export type NavLink = {
  name: string
  href: string
}

export type SocialLink = {
  name: string
  href: string
  Icon: IconType
}

export type PostMetadatum = {
  uri: string
  title: string
  date: string
  description: string
  emoji?: string
  tags: string[]
}

export type Post = {
  metadatum: PostMetadatum
  content: string
}

export type WorkMetadatum = {
  uri: string
  title: string
  date: string
}

export type Work = {
  metadatum: WorkMetadatum
  content: string
}
