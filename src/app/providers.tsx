'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from '@/components/Fonts'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <Fonts />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
