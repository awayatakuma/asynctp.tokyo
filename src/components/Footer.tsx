import { Flex } from '@chakra-ui/react'
import { SocialLinks } from '@/components'

export const Footer: React.FC = () => (
  <Flex
    bottom={0}
    as="footer"
    direction={{ base: 'row' }}
    alignItems={{ base: 'start', md: 'center' }}
    pb={8}
    pt={8}
    px={{ base: 4, md: 8 }}
    mt="auto"
    gap={10}
  >
    <SocialLinks />
  </Flex>
)
