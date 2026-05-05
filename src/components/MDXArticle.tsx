import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { getHighlighter, type Highlighter } from 'shiki'
import { useMDXComponents } from '@/mdx-components'
import type { MDXArticleProps } from '@/types/components'

// ハイライターのインスタンスをキャッシュするためのシングルトン
let highlighterPromise: Promise<Highlighter> | null = null

const getCachedHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ['dracula'],
      langs: [
        'javascript',
        'typescript',
        'tsx',
        'bash',
        'markdown',
        'go',
        'python',
        'yaml',
        'json',
        'html',
        'css',
        'sql',
      ],
    })
  }
  return highlighterPromise
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
                // キャッシュされたハイライターPromiseを返す関数を渡す
                getHighlighter: (options: any) =>
                  getCachedHighlighter().then((h) => h),
              },
            ],
          ],
        },
      }}
    />
  )
}
