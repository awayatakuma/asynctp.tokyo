import fs from 'fs'
import path from 'path'
import { getPost } from './getPost'
import { BLOG_CONTENTS_DIR_PATH } from '@/constants'
import { PostMetadatum } from '@/types'

export const getAllPosts = (): PostMetadatum[] => {
  return fs.readdirSync(BLOG_CONTENTS_DIR_PATH).map((filename) => {
    const fullpath = path.join(BLOG_CONTENTS_DIR_PATH, filename)
    const { metadatum: metadata } = getPost(fullpath)
    return metadata
  })
}
