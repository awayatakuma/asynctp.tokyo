import { Flex, Image } from '@chakra-ui/react'
import { PC_TOP_PAGE_IMAGE_PATH } from '@/constants'

export default async function Top() {
  return (
    <Flex direction="column">
      <Image
        src={PC_TOP_PAGE_IMAGE_PATH}
        alt="toppage-image"
        objectFit="contain"
        w="100vw"
        h="100%"
        position="relative"
        left="50%"
        transform="translateX(-50%)"
        pt={{ base: 4, md: 0 }}
      />
    </Flex>
  )
}
