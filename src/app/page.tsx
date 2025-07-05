import { Box, Image } from '@chakra-ui/react'
import { VRMViewer } from '@/components'

export default async function Top() {
  return (
    <Box position="relative" width="100%" height="80vh">
      {/* 背景画像 */}
      <Image
        src="/assets/asynct_logo.png"
        alt="logo"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="contain"
        zIndex="1"
      />

      {/* 前面のVRMViewer */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="10"
      >
        <VRMViewer
          vrmUrl="/assets/asynct_low.vrm"
          width="100%"
          height="100%"
          vrmaUrl="/assets/peace.vrma"
        />
      </Box>
    </Box>
  )
}
