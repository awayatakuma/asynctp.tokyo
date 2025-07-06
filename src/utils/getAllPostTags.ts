import fs from 'node:fs'
import path from 'node:path'
import { BLOG_CONTENTS_DIR_PATH } from '@/constants'
import { getPost } from './getPost'

export const getAllPostTags = (): string[] => {
  const files = fs.readdirSync(BLOG_CONTENTS_DIR_PATH)
  const tags = [
    ...new Set<string>(
      files.flatMap((filename) => {
        const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, filename)
        const { metadatum } = getPost(fullpath)
        return metadatum.tags
      })
    ),
  ]
  return tags
}
