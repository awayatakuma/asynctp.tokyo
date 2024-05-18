import path from 'path'

export const getFilename = (filepath: string): string => {
  // ex: src/contents/about/about.md => about
  return path.basename(filepath, path.extname(filepath))
}
