import fs from 'node:fs'
import path from 'node:path'
import { WORKS_CONTENTS_DIR_PATH } from '@/constants'
import type { Work } from '@/types'
import { getWork } from './getWork'

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
