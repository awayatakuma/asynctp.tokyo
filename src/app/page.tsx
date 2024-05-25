import { Flex, Image } from '@chakra-ui/react'
import { PC_TOP_PAGE_IMAGE_PATH } from '@/constants'

export default async function Top() {
  return (
    <Flex direction="column">
      <Image
        src={PC_TOP_PAGE_IMAGE_PATH}
        alt="toppage-image"
        objectFit="contain"
        w="95%"
        h="100%"
        mx="2.5%"
        pt={{ base: 4, md: 0 }}
      />
    </Flex>
  )
}
