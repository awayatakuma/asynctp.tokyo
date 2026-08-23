import { MDXArticle } from '@/components/MDXArticle'
import { TERMS_CONTENTS_PATH } from '@/constants'
import { getMarkdownContent } from '@/utils'

export default async function Terms() {
  const { content } = getMarkdownContent(TERMS_CONTENTS_PATH)

  return <MDXArticle content={content} />
}
