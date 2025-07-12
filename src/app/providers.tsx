'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from '@/components/Fonts'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Fonts />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  )
}
