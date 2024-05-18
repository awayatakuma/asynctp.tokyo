import { FaGithub, FaTwitter, FaRss } from 'react-icons/fa'
import type { NavLink, SocialLink } from '@/types'

// common
export const SITE_NAME = '⚡🦀☔💤'
export const SITE_ORIGIN =
  process.env.SITE_ORIGIN || ('https://asynctp.tokyo' as const)
export const AUTHOR = 'asynctp' as const

export const TWITTER_HANDLE = '@asynctp' as const
export const DEFAULT_IMAGE_PATH = '/assets/siteicon.svg' as const
export const FAVICON_IMAGE_PATH = '/assets/favicon.ico' as const
export const TOP_PAGE_IMAGE_PATH = '/assets/top_image.JPG' as const
export const HERO_ICON = '/assets/pixel_icon.png' as const
export const OG_IMAGE_PATH = TOP_PAGE_IMAGE_PATH
export const MAIL = 'awayatakuma@gmail.com' as const
export const GA_ID = process.env.GA_ID || ('G-ABCDE12345' as const)

// Metadata
export const TITLE = "asynctp's blog" as const
export const DESCRIPTION = 'Tech blog of asynctp' as const

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
export const TWITTER_URL = 'https://twitter.com/asynctp' as const
export const RSS_URL = `${SITE_ORIGIN}/feed` as const
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: GITHUB_URL, Icon: FaGithub },
  { name: 'Twitter', href: TWITTER_URL, Icon: FaTwitter },
  { name: 'RSS', href: RSS_URL, Icon: FaRss },
]
