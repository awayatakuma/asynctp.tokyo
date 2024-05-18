import type { IconType } from 'react-icons'

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
