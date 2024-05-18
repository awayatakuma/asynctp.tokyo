import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { getHighlighter } from 'shiki'
import { useMDXComponents } from '@/mdx-components'

export interface MDXArticleProps {
  content: string
}

export const MDXArticle = async ({ content }: MDXArticleProps) => {
  const components = useMDXComponents()
  return (
    <MDXRemote
      components={components}
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: 'dracula',
                getHighlighter: await getHighlighter,
              },
            ],
          ],
        },
      }}
    />
  )
}
