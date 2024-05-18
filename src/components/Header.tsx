import { Flex, Text, Spacer } from '@chakra-ui/react'
import { Link } from '@/components'
import { HOME_PATH, NAV_LINKS, SITE_NAME } from '@/constants'

export const Header: React.FC = () => {
  return (
    <>
      <Flex
        position="sticky"
        zIndex="sticky"
        top={0}
        px={{ base: 4, md: 8 }}
        py={4}
        bg="transparent"
        backdropFilter="blur(3px)"
        as="header"
      >
        {/* Nav bar */}
        <Flex as="nav" display={['flex']} alignItems="center" w="100%">
          <Link
            href={HOME_PATH}
            // letterSpacing="-0.02em"
            textDecoration="none"
            boxSizing="content-box"
            borderBottom="1px"
            borderColor="transparent"
          >
            {' '}
            <Text
              as="h2"
              px={2}
              letterSpacing="-0.02em"
              textDecoration="none"
              boxSizing="content-box"
              borderBottom="1px"
              borderColor="transparent"
              fontSize="2xl"
              color="primary"
              fontWeight="bold"
              fontStyle="italic"
              fontFamily="Roboto"
            >
              {SITE_NAME}
            </Text>
          </Link>

          <Spacer />
          {NAV_LINKS.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              px={2}
              py={1}
              letterSpacing="-0.02em"
              textDecoration="none"
              boxSizing="content-box"
              borderBottom="1px"
              borderColor="transparent"
              fontSize="sm"
              _hover={{
                color: 'primary',
                borderColor: 'primary',
              }}
            >
              {name}
            </Link>
          ))}
        </Flex>
      </Flex>
    </>
  )
}
