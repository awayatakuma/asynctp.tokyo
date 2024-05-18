import { FaGithub, FaTwitter } from 'react-icons/fa'
import type { NavLink, SocialLink } from '@/types'

// common
export const SITE_NAME = '⚡🦀☔💤'
export const SITE_URL = process.env.SITE_URL || ('https://acynctp.me/' as const)

export const TWITTER_HANDLE = '@awayatakuma' as const
export const DEFAULT_IMAGE_PATH = '/assets/siteicon.svg' as const
export const FAVICON_IMAGE_PATH = '/assets/favicon.ico' as const
export const TOP_PAGE_IMAGE_PC_PATH = 'IMG_0591_2.JPG' as const
export const TOP_PAGE_IMAGE_SMP_PATH = 'IMG_0591_2.JPG' as const

// contents path
export const ABOUT_CONTENTS_PATH = 'src/contents/about/about.mdx'
export const BLOG_CONTENTS_DIR_PATH = 'src/contents/blog/'

// URIs
export const HOME_PATH = '/' as const
export const BLOG_PATH = '/blog/' as const
export const BLOG_TAG_PATH = '/blog/tag/' as const
export const ABOUT_PATH = '/about/' as const

// Navigation link
export const NAV_LINKS: NavLink[] = [
  { name: 'Blog', href: BLOG_PATH },
  { name: 'About', href: ABOUT_PATH },
]

// Social links
export const GITHUB_URL = 'https://github.com/awayatakuma' as const
export const TWITTER_URL = 'https://twitter.com/awayatakuma' as const
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { name: 'Twitter', href: TWITTER_URL, Icon: FaTwitter },
]
