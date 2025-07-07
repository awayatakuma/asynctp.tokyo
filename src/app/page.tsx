'use client'

import {
  Box,
  Button,
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBlog, FaMapMarkerAlt, FaRocket } from 'react-icons/fa'
import { VRMViewer } from '@/components'

const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)
const MotionVStack = motion.create(VStack)
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
    <Box position="relative" overflow="hidden">
      {/* Hero Section */}
      <Box position="relative" minH="70vh">
        <Container
          maxW="container.xl"
          minH="70vh"
          position="relative"
          zIndex="2"
        >
          <MotionFlex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify={{ base: 'center', lg: 'space-between' }}
            minH="70vh"
            py={{ base: 10, lg: 8 }}
            gap={{ base: 8, lg: 12 }}
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
                transition={{ delay: 0.4 }}
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
                Hello I'm{' '}
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
                    animation: 'blink-cursor 1.25s step-end infinite',
                  }}
                >
                  asynct
                </Text>
              </MotionHeading>

              <MotionVStack
                spacing={3}
                align={{ base: 'center', lg: 'flex-start' }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
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
              </MotionVStack>

              {/* VRM Character - Mobile Only */}
              <MotionBox
                display={{ base: 'block', lg: 'none' }}
                w="100%"
                maxW="400px"
                h="400px"
                position="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {/* Decorative Background */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="90%"
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
                    height="400px"
                    vrmaUrl="/assets/greeting.vrma"
                  />
                </Box>
              </MotionBox>

              <MotionBox
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={descriptionColor}
                  maxW="xl"
                  lineHeight="1.8"
                >
                  Passionate about modern web technologies, cloud architecture,
                  and robotics. Building scalable solutions and sharing
                  knowledge through technical writing.
                </Text>
              </MotionBox>

              {/* Action Buttons */}
              <MotionBox
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <HStack
                  spacing={4}
                  flexWrap="wrap"
                  justify={{ base: 'center', lg: 'flex-start' }}
                >
                  <Button
                    as={Link}
                    href="/blog"
                    size="lg"
                    colorScheme="purple"
                    variant="solid"
                    leftIcon={<FaBlog />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl',
                    }}
                    transition="all 0.2s"
                  >
                    Read My Blog
                  </Button>
                  <Button
                    as={Link}
                    href="/works"
                    size="lg"
                    variant="outline"
                    color={textColor}
                    borderColor={accentColor}
                    leftIcon={<FaRocket />}
                    _hover={{
                      bg: accentColor,
                      color: 'white',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                  >
                    View Projects
                  </Button>
                </HStack>
              </MotionBox>
            </VStack>

            {/* Right Side - VRM Character - Desktop Only */}
            <MotionBox
              display={{ base: 'none', lg: 'block' }}
              flex="1"
              maxW="40%"
              w="full"
              h="500px"
              minH="500px"
              position="relative"
              order={{ base: 2, lg: 1 }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
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
                  height="500px"
                  vrmaUrl="/assets/greeting.vrma"
                />
              </Box>
            </MotionBox>
          </MotionFlex>
        </Container>
      </Box>
    </Box>
  )
}
