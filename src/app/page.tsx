'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const VRMViewer = dynamic(
  () => import('@/components').then((mod) => ({ default: mod.VRMViewer })),
  {
    ssr: false,
    loading: () => (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
        h="100%"
        bg="gray.100"
        borderRadius="xl"
      >
        <Text color="gray.500">Loading 3D Model...</Text>
      </Box>
    ),
  }
)

// Layout constants
const LAYOUT = {
  HEADER_HEIGHT: '60px',
  FOOTER_HEIGHT: '120px',
  MOBILE_PADDING_TOP: 10,
  VRM_SIZES: {
    MOBILE: '400px',
    TABLET: '500px',
    DESKTOP: '500px',
  },
} as const

// Animation delays
const ANIMATION_DELAYS = {
  HEADING: 0.4,
  SUBTITLE: 0.6,
  VRM_MOBILE: 0.8,
  DESCRIPTION: 1.0,
  VRM_DESKTOP: 1.2,
} as const

const _MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)
const _MotionVStack = motion.create(VStack)
const MotionHeading = motion.create(Heading)

export default function Top() {
  const [mounted, setMounted] = useState(false)

  // Theme colors
  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.9)',
    'rgba(45, 55, 72, 0.9)'
  )
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const accentColor = useColorModeValue('purple.500', 'purple.300')
  const headingColor = useColorModeValue('gray.800', 'white')
  const subtitleColor = useColorModeValue('gray.600', 'whiteAlpha.900')
  const descriptionColor = useColorModeValue('gray.500', 'whiteAlpha.700')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Box position="relative">
      {/* Hero Section */}
      <Box
        position="relative"
        h={{
          base: 'auto',
          md: `calc(100vh - ${LAYOUT.HEADER_HEIGHT} - ${LAYOUT.FOOTER_HEIGHT})`,
        }}
        minH={{ base: 'auto', md: 'auto' }}
        pt={{ base: 4, md: 0 }}
        overflow={{ base: 'visible', md: 'hidden' }}
      >
        <Container
          maxW="container.xl"
          h={{ base: 'auto', md: '100%' }}
          minH={{
            base: 'auto',
            md: 'auto',
          }}
          position="relative"
          zIndex="2"
          p={0}
          px={{ base: 4, md: 8 }}
        >
          <MotionFlex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify={{ base: 'center', lg: 'space-between' }}
            h="100%"
            py={0}
            gap={{ base: 4, lg: 6 }}
          >
            {/* Left Side - Hero Content */}
            <VStack
              spacing={6}
              align={{ base: 'center', lg: 'flex-start' }}
              textAlign={{ base: 'center', lg: 'left' }}
              flex="1"
              maxW={{ base: '100%', lg: '60%' }}
              w="full"
              order={{ base: 1, lg: 0 }}
            >
              <MotionHeading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="black"
                color={headingColor}
                lineHeight="1.1"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: ANIMATION_DELAYS.HEADING }}
              >
                <Image
                  src="/assets/512.webp"
                  alt="hand waving"
                  height="1em"
                  width="auto"
                  display="inline-block"
                  verticalAlign="middle"
                  mr="2"
                />
                Hello{' '}
                <Box as="span" display={{ base: 'block', lg: 'inline' }}>
                  I'm{' '}
                  <Text
                    as="span"
                    color={accentColor}
                    position="relative"
                    _after={{
                      content: '"_"',
                      display: 'inline-block',
                      width: 0,
                      overflowX: 'visible',
                      color: accentColor,
                      sx: {
                        '@keyframes blink-cursor': {
                          'from, to': { opacity: 0 },
                          '50%': { opacity: 1 },
                        },
                      },
                      animation: `blink-cursor ${ANIMATION_DELAYS.HEADING * 3}s step-end infinite`,
                    }}
                  >
                    asynct
                  </Text>
                </Box>
              </MotionHeading>

              <VStack spacing={3} align={{ base: 'center', lg: 'flex-start' }}>
                <Text
                  fontSize={{ base: 'xl', md: '2xl' }}
                  color={subtitleColor}
                  fontWeight="bold"
                >
                  Software Engineer
                </Text>
                <HStack spacing={2} color={textColor}>
                  <Icon as={FaMapMarkerAlt} />
                  <Text fontSize="lg">ap-northeast-1, Tokyo, Japan</Text>
                </HStack>
              </VStack>

              {/* VRM Character - Mobile & Tablet */}
              <Box
                display={{ base: 'block', lg: 'none' }}
                w="100%"
                maxW={{
                  base: LAYOUT.VRM_SIZES.MOBILE,
                  md: LAYOUT.VRM_SIZES.TABLET,
                }}
                h={{
                  base: LAYOUT.VRM_SIZES.MOBILE,
                  md: LAYOUT.VRM_SIZES.TABLET,
                }}
                position="relative"
                // モバイルでビューポート高さ調整
                sx={{
                  '@media (max-width: 768px)': {
                    height: '400px !important',
                    width: '400px !important',
                  },
                }}
              >
                {/* Decorative Background */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="80%"
                  h="90%"
                  bg={cardBg}
                  backdropFilter="blur(20px)"
                  borderRadius="3xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  zIndex="0"
                />

                <Box position="relative" zIndex="1" w="full" h="full">
                  <VRMViewer
                    vrmUrl="/assets/asynct_low.vrm"
                    width="100%"
                    height={LAYOUT.VRM_SIZES.MOBILE}
                    vrmaUrl="/assets/greeting.vrma"
                  />
                </Box>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={descriptionColor}
                  maxW="xl"
                  lineHeight="1.8"
                >
                  I love abstract principles and compelling ideas. I'm eager to
                  find those mystical moments where universal patterns
                  surface—whether in technologies, humanity or art.
                </Text>
              </Box>
            </VStack>

            {/* Right Side - VRM Character - Desktop Only */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              flex="1"
              maxW="40%"
              w="full"
              h={LAYOUT.VRM_SIZES.DESKTOP}
              minH={LAYOUT.VRM_SIZES.DESKTOP}
              position="relative"
              order={{ base: 2, lg: 1 }}
            >
              {/* Decorative Background */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="85%"
                h="85%"
                bg={cardBg}
                backdropFilter="blur(20px)"
                borderRadius="3xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
                zIndex="0"
              />

              <Box position="relative" zIndex="1" w="full" h="full">
                <VRMViewer
                  vrmUrl="/assets/asynct_low.vrm"
                  width="100%"
                  height={LAYOUT.VRM_SIZES.DESKTOP}
                  vrmaUrl="/assets/greeting.vrma"
                />
              </Box>
            </Box>
          </MotionFlex>
        </Container>
      </Box>
    </Box>
  )
}
