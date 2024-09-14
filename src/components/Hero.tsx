import { Text, Avatar, Flex, Box } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { Section } from '@/components'
import { HERO_ICON } from '@/constants'

interface HeroProps extends FlexProps {
  stargazersCount?: number
}
export const Hero: React.FC<HeroProps> = ({ ...props }) => (
  <Section
    pt={{ base: 15, md: 15 }}
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
          <Box
            as="span"
            sx={{
              '&::before': {
                content: '"🤚"',
                animation: 'cycleCharacters 2s steps(10) infinite',
              },
              '@keyframes cycleCharacters': {
                '10%': { content: '"👋"' },
                '20%': { content: '"🤚"' },
                '30%': { content: '"👋"' },
                '40%': { content: '"🤚"' },
                '50%': { content: '"👋"' },
                '60%': { content: '"🤚"' },
                '70%': { content: '"👋"' },
                '80%': { content: '"🤚"' },
                '90%': { content: '"👋"' },
              },
            }}
          >
            &nbsp;
          </Box>
          Hello
          {`, I'm`}
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
          {`awayatakuma`}
        </Text>
      </Flex>
    </Flex>
  </Section>
)
