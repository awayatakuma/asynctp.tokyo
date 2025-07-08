import { Flex, Heading } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { BlogCard } from '@/components'
import { getAllPosts } from '@/utils'

export const metadata: Metadata = {
  title: 'Blog posts',
  description: 'All blog posts',
}

export default async function BlogPage() {
  const postMetadata = await getAllPosts()
  postMetadata.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return (
    <>
      <Heading
        as="h1"
        textStyle="h1"
        fontSize="4xl"
        color="primary"
        pt={{ base: 15, md: 20 }}
        pb={[15, null, null, 15]}
      >
        {'Blog posts'}
      </Heading>
      {
        <Flex as="section" direction="column">
          {' '}
          {postMetadata.map((metadata) => (
            <BlogCard {...metadata} key={metadata.title} />
          ))}
        </Flex>
      }
    </>
  )
}
