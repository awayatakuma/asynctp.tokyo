'use client'

import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGlobe } from 'react-icons/fa'
import type { LinkMetadata } from '@/types'

const MotionBox = motion.create(Box)

interface StaticLinkCardProps {
  metadata: LinkMetadata
}

export const StaticLinkCard: React.FC<StaticLinkCardProps> = ({ metadata }) => {
  // テーマカラー
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBorderColor = useColorModeValue('blue.200', 'blue.600')
  const textColor = useColorModeValue('gray.900', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('blue.500', 'blue.300')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      my={4}
      maxW="full"
      cursor="pointer"
      sx={{
        transition: 'all 0.2s',
      }}
      _hover={{
        borderColor: hoverBorderColor,
        boxShadow: 'lg',
      }}
    >
      <Link
        href={metadata.url}
        isExternal
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
      >
        <HStack spacing={0} align="stretch">
          {/* 画像部分 */}
          {metadata.image && (
            <Box
              width="120px"
              flexShrink={0}
              position="relative"
              overflow="hidden"
            >
              <Image
                src={metadata.image}
                alt={metadata.title}
                width="100%"
                height="100%"
                objectFit="cover"
                fallback={
                  <Box
                    width="100%"
                    height="100%"
                    bg={bg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaGlobe} color={mutedColor} boxSize={6} />
                  </Box>
                }
              />
            </Box>
          )}

          {/* コンテンツ部分 */}
          <VStack
            align="start"
            spacing={2}
            p={4}
            flex={1}
            justify="space-between"
            minH="100px"
          >
            <VStack align="start" spacing={2} flex={1}>
              <Text
                fontSize="md"
                fontWeight="bold"
                color={textColor}
                lineHeight="1.3"
                noOfLines={2}
                _hover={{ color: accentColor }}
                sx={{
                  transition: 'color 0.2s',
                }}
              >
                {metadata.title}
              </Text>

              <Text
                fontSize="sm"
                color={mutedColor}
                lineHeight="1.4"
                noOfLines={2}
              >
                {metadata.description}
              </Text>
            </VStack>

            {/* フッター */}
            <HStack justify="space-between" width="100%" align="center">
              <HStack spacing={2} align="center">
                {metadata.favicon && (
                  <Image
                    src={metadata.favicon}
                    alt="favicon"
                    width="16px"
                    height="16px"
                    fallback={
                      <Icon as={FaGlobe} boxSize={4} color={mutedColor} />
                    }
                  />
                )}
                <Text fontSize="xs" color={mutedColor} fontWeight="medium">
                  {metadata.siteName}
                </Text>
              </HStack>

              <Icon as={FaExternalLinkAlt} color={mutedColor} boxSize={3} />
            </HStack>
          </VStack>
        </HStack>
      </Link>
    </MotionBox>
  )
}

// フォールバック用のシンプルなリンクカード
export const FallbackLinkCard: React.FC<{
  url: string
  fallbackText?: string
}> = ({ url, fallbackText }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('blue.500', 'blue.300')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      p={4}
      my={4}
      maxW="full"
    >
      <Link
        href={url}
        isExternal
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
      >
        <HStack spacing={3} align="center">
          <Icon as={FaGlobe} color={mutedColor} boxSize={5} />
          <VStack align="start" spacing={1} flex={1}>
            <Text fontSize="sm" color={accentColor} fontWeight="medium">
              {fallbackText || url}
            </Text>
            <Text fontSize="xs" color={mutedColor}>
              {(() => {
                try {
                  return new URL(url).hostname
                } catch {
                  return url
                }
              })()}
            </Text>
          </VStack>
          <Icon as={FaExternalLinkAlt} color={mutedColor} boxSize={3} />
        </HStack>
      </Link>
    </MotionBox>
  )
}
