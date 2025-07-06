'use client'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaHamburger, FaMoon, FaSun } from 'react-icons/fa'
import { Link } from '@/components'
import { HOME_PATH, NAV_LINKS, SITE_NAME } from '@/constants'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)

export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
  const mobileColor = useColorModeValue('gray.700', 'gray.200')

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <>
      <MotionFlex
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        px={{ base: 4, md: 8 }}
        py={4}
        bg={scrolled ? scrolledBg : headerBg}
        backdropFilter="blur(20px) saturate(180%)"
        borderBottom="1px solid"
        borderColor={borderColor}
        as="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        boxShadow={scrolled ? 'sm' : 'none'}
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
                fontSize="2xl"
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

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
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
                  fontSize="md"
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
              size="sm"
              color={iconColor}
              _hover={{
                bg: colorMode === 'light' ? 'purple.50' : 'purple.900',
                color: 'purple.400',
              }}
            />
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            icon={<FaHamburger />}
            onClick={onOpen}
            variant="ghost"
            size="sm"
          />
        </Flex>
      </MotionFlex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              fontSize="xl"
              fontWeight="black"
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
            >
              {SITE_NAME}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              {NAV_LINKS.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  fontSize="lg"
                  fontWeight="medium"
                  textDecoration="none"
                  color={mobileColor}
                  _hover={{
                    color: 'purple.400',
                    textDecoration: 'none',
                  }}
                  onClick={onClose}
                >
                  {name}
                </Link>
              ))}

              <Button
                onClick={toggleColorMode}
                variant="outline"
                leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                colorScheme="purple"
                size="sm"
              >
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
