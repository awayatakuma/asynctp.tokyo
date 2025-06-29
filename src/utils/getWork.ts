import { WORKS_PATH } from '@/constants'
import type { Work } from '@/types'
import { formatDate } from './formatDate'
import { getFilename } from './getFilename'
import { getMarkdownContent } from './getMarkdownContent'

export const getWork = (fullpath: string): Work => {
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
}
