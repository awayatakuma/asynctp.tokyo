import { Flex, type FlexProps } from '@chakra-ui/react'

export const Section: React.FC<FlexProps> = (props) => (
  <Flex
    as="section"
    direction="column"
    px={{ base: 4, md: 8 }}
    // biome-ignore lint/suspicious/noExplicitAny: verup
    {...(props as any)}
  />
)
