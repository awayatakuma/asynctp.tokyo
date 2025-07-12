import { Avatar, Flex, Image, Text } from '@chakra-ui/react'
import { Section } from '@/components'
import { HERO_ICON } from '@/constants'
import type { HeroProps } from '@/types/components'
export const Hero: React.FC<HeroProps> = ({ ...props }) => (
  <Section
    pb={[15, null, null, 15]}
    gap={8}
    alignItems="left"
    textAlign="center"
    position="relative"
    {...props}
  >
    <Flex h="fit-content" alignItems="center" justify="center" minHeight={200}>
      <Avatar name="hero-icon" src={HERO_ICON} size="xl" />{' '}
      <Flex
        h="fit-content"
        direction="column"
        alignItems="center"
        justify="center"
        minHeight={200}
      >
        <Text
          position="relative"
          w="fit-content"
          whiteSpace="pre-wrap"
          as="h1"
          fontSize="2xl"
          fontWeight="black"
          fontFamily="Titillium Web"
          color="primary"
        >
          <Image
            src="/assets/512.webp"
            alt="hand waving"
            height="1em"
            width="auto"
            display="inline-block"
            verticalAlign="middle"
            mr="1"
          />
          {`Hello,`}
        </Text>
        <Text
          position="relative"
          w="fit-content"
          whiteSpace="pre-wrap"
          as="h1"
          fontSize="2xl"
          fontWeight="black"
          fontFamily="Titillium Web"
          color="primary"
          _after={{
            content: '"_"',
            display: 'inline-block',
            width: 0,
            overflowX: 'visible',
            color: 'primary',
            sx: {
              '@keyframes blink-cursor': {
                'from, to': { opacity: 0 },
                '50%': { opacity: 1 },
              },
            },
            animation: 'blink-cursor 1.25s step-end infinite',
          }}
        >
          {`I'm asynct`}
        </Text>
      </Flex>
    </Flex>
  </Section>
)
