import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXArticle, MDXFrontmatter } from '@/components'
import {
  BLOG_CONTENTS_DIR_PATH,
  OG_IMAGE_PATH,
  SITE_ORIGIN,
  SITE_TITLE,
  TWITTER_HANDLE,
} from '@/constants'
import { getPost } from '@/utils'

type PageProps = {
  params: Promise<{
    post: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const params = await props.params
  const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, `${params.post}.mdx`)

  if (!fs.existsSync(fullpath)) {
    return {}
  }

  const { metadatum } = getPost(fullpath)
  return {
    title: metadatum.title,
    description: metadatum.description,
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: SITE_ORIGIN,
      title: metadatum.title,
      description: metadatum.description,
      siteName: SITE_TITLE,
      images: [OG_IMAGE_PATH],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadatum.title,
      images: [OG_IMAGE_PATH],
      creator: TWITTER_HANDLE,
      description: metadatum.description,
    },
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_CONTENTS_DIR_PATH)

  return files
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => {
      const basename = filename.replace(/\.mdx?$/, '')
      return { post: basename }
    })
}

export default async function PostPage(props: PageProps) {
  const params = await props.params
  const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, `${params.post}.mdx`)

  if (!fs.existsSync(fullpath)) {
    notFound()
  }

  const { metadatum: metadata, content } = getPost(fullpath)

  return (
    <>
      <MDXFrontmatter metadatum={metadata} />
      <MDXArticle content={content} />
    </>
  )
}
