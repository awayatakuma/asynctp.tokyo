import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { TOP_PAGE_IMAGE_PC_PATH, TOP_PAGE_IMAGE_SMP_PATH } from '@/constants'

export default function About() {
  return (
    <Flex direction="column" h="calc(65vh)">
      <Spacer />
      <Image
        src={TOP_PAGE_IMAGE_PC_PATH}
        alt="toppage-image"
        objectFit="cover"
        w="95%"
        h={{ base: 800, md: 'auto' }}
        mx="2.5%"
        pt={{ base: 10, md: 0 }}
      />
    </Flex>
  )
}
