'use client'

import { ChakraProvider } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'
import { Fonts } from '@/components/Fonts'
import theme from '@/theme'

/**
 * Emotion (Chakra UI v2) SSR bridge for the App Router.
 *
 * RATIONALE: Left to itself, Emotion emits its <style> tags inline where the
 * components render — i.e. inside <body> — while on the client it inserts the
 * very same styles into <head>. React 18 tolerated that discrepancy, but React
 * 19 reports it as a hydration failure (error #418) and throws away the
 * server-rendered tree. Routing every insertion through our own cache lets us
 * flush the accumulated rules into <head> via `useServerInsertedHTML`, so the
 * server and client markup agree.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: string[] = []

    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null

    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Emotion hands us pre-serialized CSS, which is the only way to flush it into <head>.
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <Fonts />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
