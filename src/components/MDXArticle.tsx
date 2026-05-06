import rehypeShiki from '@shikijs/rehype'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/mdx-components'
import type { MDXArticleProps } from '@/types/components'

export const MDXArticle = async ({ content }: MDXArticleProps) => {
  const components = useMDXComponents()

  return (
    <MDXRemote
      components={components}
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypeShiki,
              {
                theme: 'dracula',
              },
            ],
          ],
        },
      }}
    />
  )
}
