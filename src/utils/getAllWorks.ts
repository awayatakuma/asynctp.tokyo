import fs from 'fs'
import path from 'path'
import { getWork } from './getWork'
import { WORKS_CONTENTS_DIR_PATH } from '@/constants'
import { Work } from '@/types'

export const getAllWorks = (): Work[] => {
  return fs
    .readdirSync(WORKS_CONTENTS_DIR_PATH)
    .filter((filename) => /\.(md|mdx)$/i.test(filename))
    .map((filename) => {
      const fullpath = path.join(WORKS_CONTENTS_DIR_PATH, filename)
      const work = getWork(fullpath)
      return work
    })
}
