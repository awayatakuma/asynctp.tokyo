import fs from 'node:fs'
import path from 'node:path'
import { BLOG_CONTENTS_DIR_PATH } from '@/constants'
import type { PostMetadatum } from '@/types'
import { getPost } from './getPost'

export const getAllPosts = (): PostMetadatum[] => {
  return fs.readdirSync(BLOG_CONTENTS_DIR_PATH).map((filename) => {
    const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, filename)
    const { metadatum: metadata } = getPost(fullpath)
    return metadata
  })
}
