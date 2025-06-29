import { Flex, Heading } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { BlogCard } from '@/components'
import { getAllPostTags, getPostMetadataFromTag } from '@/utils'

interface PageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = getAllPostTags()
  return tags.map((tag: string) => {
    return { tag: tag }
  })
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Posts tagged '${params.tag}'`,
    description: `Posts tagged '${params.tag}'`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const metadata = getPostMetadataFromTag(params.tag)

  return (
    <>
      <Heading
        as="h1"
        textStyle="h1"
        fontSize="4xl"
        color="primary"
        pt={{ base: 15, md: 15 }}
        pb={[15, null, null, 15]}
        _before={{ content: '"#"', fontWeight: 'bold' }}
      >
        {params.tag}
      </Heading>
      <Flex as="section" direction="column">
        {' '}
        {metadata.map((metadatum) => (
          <BlogCard {...metadatum} key={metadatum.title} />
        ))}
      </Flex>
    </>
  )
}
