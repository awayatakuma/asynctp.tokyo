import rehypeShiki from '@shikijs/rehype'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/mdx-components'
import type { MDXArticleProps } from '@/types/components'

/**
 * MDXArticle Component (Production-ready RSC Version)
 *
 * RATIONALE: We use the Server Components version of MDXRemote for optimal SEO
 * and performance. This avoids the hydration complexity of CSR.
 *
 * NOTE: React 19 dev mode may still show 'recentlyCreatedOwnerStacks' errors,
 * but these do NOT affect the production build or site visitors.
 */
export const MDXArticle = async ({ content }: MDXArticleProps) => {
  const components = useMDXComponents()

  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [[rehypeShiki, { theme: 'dracula' }]],
        },
      }}
    />
  )
}
