import { cache } from 'react'
import { WORKS_PATH } from '@/constants'
import type { Work } from '@/types'
import { formatDate } from './formatDate'
import { getFilename } from './getFilename'
import { getMarkdownContent } from './getMarkdownContent'

// biome-ignore lint/suspicious/noExplicitAny: generic function wrapper
const cachePolyfill = <T extends (...args: any[]) => any>(fn: T): T => {
  if (typeof cache === 'function') {
    return cache(fn)
  }
  return fn
}

export const getWork = cachePolyfill((fullpath: string): Work => {
  const { data, content } = getMarkdownContent(fullpath)
  const ret: Work = {
    metadatum: {
      uri: WORKS_PATH + getFilename(fullpath),
      title: data.title,
      date: formatDate(data.date),
    },
    content: content,
  }
  return ret
})
