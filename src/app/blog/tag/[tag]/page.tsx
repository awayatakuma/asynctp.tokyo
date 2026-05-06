import { Flex, Heading } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { BlogCard } from '@/components'
import { getAllPostTags, getPostMetadataFromTag } from '@/utils'

type PageProps = {
  params: {
    tag: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const tags = getAllPostTags()
  return tags.map((tag: string) => {
    return { tag: tag }
  })
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = props.params
  return {
    title: `Posts tagged '${params.tag}'`,
    description: `Posts tagged '${params.tag}'`,
  }
}

export default async function TagPage(props: PageProps) {
  const params = props.params
  const metadata = getPostMetadataFromTag(params.tag)

  return (
    <>
      <Heading
        as="h1"
        textStyle="h1"
        fontSize="4xl"
        color="primary"
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
