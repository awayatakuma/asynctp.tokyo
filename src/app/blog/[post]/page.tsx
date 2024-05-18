import fs from 'fs'
import path from 'path'
import NotFound from '@/app/not-found'
import { MDXArticle, MDXFrontmatter } from '@/components'
import { BLOG_CONTENTS_DIR_PATH } from '@/constants'
import { getPost } from '@/utils'

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_CONTENTS_DIR_PATH)

  return files
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => {
      const basename = filename.replace(/\.mdx?$/, '')
      return { post: basename }
    })
}

export default async function PostPage({
  params,
}: {
  params: { post: string }
}) {
  const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, params.post + '.mdx')

  if (!fs.existsSync(fullpath)) {
    return (
      <>
        <NotFound />
      </>
    )
  }

  const { metadatum: metadata, content } = getPost(fullpath)

  return (
    <>
      <MDXFrontmatter metadatum={metadata} />
      <MDXArticle content={content} />
    </>
  )
}
