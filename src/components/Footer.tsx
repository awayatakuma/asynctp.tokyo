import { Link } from '@chakra-ui/next-js'
import { Flex, Spacer, Text } from '@chakra-ui/react'
import { SocialLinks } from '@/components/SocialLinks'

export const Footer: React.FC = () => (
  <Flex
    bottom={0}
    as="footer"
    direction={{ base: 'column' }}
    alignItems={{ base: 'start', md: 'center' }}
    pt={8}
    mb={4}
    px={{ base: 4, md: 8 }}
    mt="auto"
  >
    <SocialLinks />
    <Flex
      w="full"
      alignItems="center"
      mt={1}
      direction={{ base: 'column', md: 'row' }}
    >
      <Spacer />
      <Flex alignItems="center" gap={4}>
        <Text as="span" fontSize="sm">
          ©asynctp
        </Text>
        <Link href="/terms" fontSize="sm" _hover={{ color: 'gray.800' }}>
          Terms
        </Link>
      </Flex>
      <Spacer />
    </Flex>
  </Flex>
)
