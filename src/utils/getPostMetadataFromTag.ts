import fs from 'node:fs'
import path from 'node:path'
import { BLOG_CONTENTS_DIR_PATH } from '@/constants'
import type { PostMetadatum } from '@/types'
import { getPost } from '@/utils'

export const getPostMetadataFromTag = (tag: string): PostMetadatum[] => {
  const files = fs.readdirSync(BLOG_CONTENTS_DIR_PATH)
  return files
    .map((filename) => {
      const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, filename)
      const { metadatum: metadata } = getPost(fullpath)
      return metadata
    })
    .filter((elem) => {
      const tags: string[] = elem.tags
      return tags.includes(tag)
    })
}
