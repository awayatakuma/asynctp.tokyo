import type { FlexProps } from '@chakra-ui/react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import { SOCIAL_LINKS } from '@/constants'

export const SocialLinks: React.FC<FlexProps> = (props) => (
  <Flex
    direction={{ base: 'row' }}
    columnGap={8}
    flexWrap="wrap"
    justify="center"
    minWidth="max-content"
    w="100%"
    {...props}
  >
    {SOCIAL_LINKS.map(({ name, href, Icon }) => (
      <Link href={href} key={name} textDecoration="none">
        <Flex alignItems="center" color="secondary" gap={2}>
          <Box borderRadius="base" py={2}>
            <Icon size={18} />
          </Box>
          <Text fontSize="lg">{name}</Text>
        </Flex>
      </Link>
    ))}
  </Flex>
)
