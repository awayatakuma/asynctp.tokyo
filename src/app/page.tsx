import { Flex, Image } from '@chakra-ui/react'
import { PC_TOP_PAGE_IMAGE_PATH } from '@/constants'

export default async function Top() {
  return (
    <Flex direction="column" h="calc(65vh)">
      <Image
        src={PC_TOP_PAGE_IMAGE_PATH}
        alt="toppage-image"
        objectFit="cover"
        w="95%"
        h={{ base: 'auto', md: '95%' }}
        mx="2.5%"
        pt={{ base: 10, md: 0 }}
      />
    </Flex>
  )
}
