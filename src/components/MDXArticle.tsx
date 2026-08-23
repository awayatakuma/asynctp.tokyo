import { evaluate } from '@mdx-js/mdx'
import rehypeShiki from '@shikijs/rehype'
import * as runtime from 'react/jsx-runtime'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/mdx-components'
import type { MDXArticleProps } from '@/types/components'

/**
 * MDXArticle Component (Production-ready RSC Version)
 *
 * RATIONALE: We compile MDX with `@mdx-js/mdx`'s `evaluate` directly rather than
 * going through `next-mdx-remote/rsc`. The latter resolves `react/jsx-runtime`
 * through a runtime `require()`, which bypasses Next's module aliasing and yields
 * elements from a different React copy than the one rendering the tree. Importing
 * the runtime as a normal ESM binding keeps MDX output on the same React instance
 * as the surrounding Server Components.
 */
export const MDXArticle = async ({ content }: MDXArticleProps) => {
  const components = useMDXComponents()

  const { default: Content } = await evaluate(content, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [[rehypeShiki, { theme: 'dracula' }]],
  })

  return <Content components={components} />
}
