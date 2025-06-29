import { Flex } from '@chakra-ui/react'
import { VRMViewer } from '@/components'

export default async function Top() {
  return (
    <Flex direction="column">
      <VRMViewer vrmUrl="/assets/asynct.vrm" width="100%" height="80vh" />
    </Flex>
  )
}
