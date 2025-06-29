import { Flex, Link, Text } from '@chakra-ui/react'
import { BLOG_TAG_PATH } from '@/constants'
import type { PostMetadatum } from '@/types'

export interface MDXFrontmatterProps {
  metadatum: PostMetadatum
}

export const MDXFrontmatter = ({ metadatum }: MDXFrontmatterProps) => {
  return (
    <Flex direction="column" alignItems="center" justify="center" mb={8}>
      <Text
        as="h1"
        fontSize="4xl"
        color="primary"
        fontWeight="bold"
        mb={4}
        key={metadatum.title}
      >
        {metadatum.title}
      </Text>
      {metadatum.emoji && (
        <Text
          as="h1"
          fontSize="4xl"
          color="primary"
          fontWeight="bold"
          mb={4}
          key={metadatum.emoji}
        >
          {metadatum.emoji}
        </Text>
      )}

      <Text color="primary"> {metadatum.date}</Text>
      <Flex wrap="wrap">
        {metadatum.tags.map((tag) => (
          <Link
            key={tag}
            href={BLOG_TAG_PATH + tag}
            textDecoration="none"
            data-group
            as="a"
          >
            <Text
              color="secondary"
              key={tag}
              mr={2}
              _before={{ content: '"#"' }}
            >
              {tag}
            </Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
