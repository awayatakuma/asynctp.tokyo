import { Text } from '@chakra-ui/react'
import { Link, Section } from '@/components'

export default function NotFound() {
  return (
    <>
      <Section>
        <Text
          position="relative"
          whiteSpace="pre-wrap"
          as="h1"
          fontSize="2xl"
          fontWeight="black"
          fontFamily="Titillium Web"
          color="primary"
          textAlign="center"
          w="auto"
          mt={{ base: 6, md: 12 }}
        >
          Page not found...
        </Text>
      </Section>
      <Section>
        <Link
          href="/"
          textDecoration="none"
          _hover={{ textDecoration: 'underline' }}
          textAlign="center"
          w="100%"
          color="primary"
        >
          [Return home]
        </Link>
      </Section>
    </>
  )
}
