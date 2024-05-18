import { Flex, Heading } from '@chakra-ui/react'
import { BlogCard } from '@/components'
import { getAllPostTags, getPostMetadataFromTag } from '@/utils'

export async function generateStaticParams() {
  const tags = getAllPostTags()
  return tags.map((tag: string) => {
    return { tag: tag }
  })
}

export default async function TagPage({ params }: { params: { tag: string } }) {
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
