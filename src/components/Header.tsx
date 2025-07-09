'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from '@/components'
import { HOME_PATH, NAV_LINKS, SITE_NAME } from '@/constants'

const MotionFlex = motion.create(Flex)
const MotionBox = motion.create(Box)

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [scrolled, setScrolled] = useState(false)

  // Glass morphism background
  const headerBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  )

  const scrolledBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)',
    'rgba(26, 32, 44, 0.95)'
  )

  const linkColor = useColorModeValue('gray.700', 'gray.200')
  const iconColor = useColorModeValue('gray.600', 'gray.400')
  const borderColor = useColorModeValue(
    'rgba(0,0,0,0.1)',
    'rgba(255,255,255,0.1)'
  )

  const updateScrolled = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [updateScrolled])

  return (
    <MotionFlex
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      px={{ base: 2, lg: 8 }}
      py={{ base: 2, lg: 4 }}
      bg={scrolled ? scrolledBg : headerBg}
      backdropFilter="blur(20px) saturate(180%)"
      borderBottom="1px solid"
      borderColor={borderColor}
      as="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      boxShadow={scrolled ? 'sm' : 'none'}
      maxW="100%"
      overflow="hidden"
    >
      <Flex as="nav" alignItems="center" w="100%">
        {/* Logo */}
        <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={HOME_PATH}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            <Text
              as="h2"
              fontSize={{ base: 'lg', lg: '2xl' }}
              fontWeight="black"
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
              letterSpacing="-0.02em"
            >
              {SITE_NAME}
            </Text>
          </Link>
        </MotionBox>

        <Spacer />

        {/* Navigation Links */}
        <HStack spacing={{ base: 3, lg: 8 }}>
          {NAV_LINKS.map(({ name, href }, index) => (
            <MotionBox
              key={name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={href}
                fontSize={{ base: 'sm', lg: 'md' }}
                fontWeight="medium"
                textDecoration="none"
                color={linkColor}
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '2px',
                  bg: 'purple.400',
                  transition: 'width 0.2s ease',
                }}
                _hover={{
                  color: 'purple.400',
                  textDecoration: 'none',
                  _after: {
                    width: '100%',
                  },
                }}
              >
                {name}
              </Link>
            </MotionBox>
          ))}

          {/* Color Mode Toggle */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size={{ base: 'xs', lg: 'sm' }}
            color={iconColor}
            minW={{ base: '32px', lg: 'auto' }}
            _hover={{
              bg: colorMode === 'light' ? 'purple.50' : 'purple.900',
              color: 'purple.400',
            }}
          />
        </HStack>
      </Flex>
    </MotionFlex>
  )
}
