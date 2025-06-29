import type { Metadata } from 'next'
import { MDXArticle } from '@/components'
import { getAllWorks } from '@/utils/getAllWorks'

export const metadata: Metadata = {
  title: 'Works',
  description: 'My works',
}

export default async function Works() {
  const works = await getAllWorks()
  works.sort(
    (a, b) => +new Date(b.metadatum.date) - +new Date(a.metadatum.date)
  )
  return (
    <>
      {works.map((work) => (
        <MDXArticle key={work.metadatum.date} content={work.content} />
      ))}
    </>
  )
}
