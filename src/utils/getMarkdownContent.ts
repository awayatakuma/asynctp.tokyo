import fs from 'fs'
import matter from 'gray-matter'

export const getMarkdownContent = (filepath: string) => {
  const markdown = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(markdown)
  return { data, content }
}
