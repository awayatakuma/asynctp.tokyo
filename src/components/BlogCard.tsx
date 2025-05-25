import { Flex, Text, Link } from '@chakra-ui/react'
import { BLOG_TAG_PATH } from '@/constants'
import { PostMetadatum } from '@/types'

export const BlogCard = (metadata: PostMetadatum) => {
  return (
    <Flex direction="column" mb={6}>
      <Text color="secondary" fontFamily="Titillium Web" key={metadata.date}>
        {metadata.date}
      </Text>
      <Link href={metadata.uri} textDecoration="none" data-group as="a">
        <Text
          as="h2"
          textStyle="h2"
          fontSize="2xl"
          color="primary"
          key={metadata.title}
          _groupHover={{
            color: 'primary',
            textDecoration: 'underline',
          }}
        >
          {metadata.title}
        </Text>
      </Link>

      <Text color="text" fontFamily="Titillium Web" key={metadata.description}>
        {metadata.description}
      </Text>
      <Flex wrap="wrap">
        {metadata.tags.map((tag) => (
          // eslint-disable-next-line react/jsx-key
          <Link
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
