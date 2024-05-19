import { Flex, Image, Spacer } from '@chakra-ui/react'
import { PC_TOP_PAGE_IMAGE_PATH } from '@/constants'

export default async function Top() {
  return (
    <Flex direction="column" h="calc(65vh)">
      <Spacer />
      <Image
        src={PC_TOP_PAGE_IMAGE_PATH}
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
