import { cache } from 'react'
import { BLOG_PATH } from '@/constants'
import type { Post } from '@/types'
import { formatDate } from './formatDate'
import { getFilename } from './getFilename'
import { getMarkdownContent } from './getMarkdownContent'

const cachePolyfill = <T extends (...args: any[]) => any>(fn: T): T => {
  if (typeof cache === 'function') {
    return cache(fn)
  }
  return fn
}

export const getPost = cachePolyfill((fullpath: string): Post => {
  const { data, content } = getMarkdownContent(fullpath)
  const ret: Post = {
    metadatum: {
      uri: BLOG_PATH + getFilename(fullpath),
      title: data.title,
      date: formatDate(data.date),
      description: data.description,
      emoji: data.emoji,
      tags: data.tags,
    },
    content: content,
  }
  return ret
})
