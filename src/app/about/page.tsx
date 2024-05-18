import { Hero, MDXArticle } from '@/components'
import { ABOUT_CONTENTS_PATH } from '@/constants'
import { getMarkdownContent } from '@/utils'

export default function About() {
  const { content } = getMarkdownContent(ABOUT_CONTENTS_PATH)
  return (
    <>
      <Hero />
      <MDXArticle content={content} />
    </>
  )
}
