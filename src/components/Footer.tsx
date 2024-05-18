import { Flex, Spacer, Text } from '@chakra-ui/react'
import { SocialLinks } from '@/components'

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
    <Flex w="full" alignItems="center" mt={1}>
      {' '}
      <Spacer />
      <Text as="span" fontSize="sm">
        ©asynctp
      </Text>
      <Spacer />
    </Flex>
  </Flex>
)
