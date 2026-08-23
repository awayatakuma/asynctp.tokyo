import { Box, ColorModeScript } from '@chakra-ui/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {
  AUTHOR,
  DESCRIPTION,
  FAVICON_IMAGE_PATH,
  GA_ID,
  GITHUB_URL,
  OG_IMAGE_PATH,
  SITE_ORIGIN,
  SITE_TITLE,
  TWITTER_HANDLE,
} from '@/constants'
// Imported from the module itself rather than through '@/theme', whose index
// calls extendTheme() at module scope — a client-only call that a Server
// Component cannot make.
import { config } from '@/theme/config'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_ORIGIN,
    title: SITE_TITLE,
    description: DESCRIPTION,
    siteName: SITE_TITLE,
    images: [OG_IMAGE_PATH],
  },
  authors: [
    {
      name: AUTHOR,
      url: GITHUB_URL,
    },
  ],
  creator: AUTHOR,

  twitter: {
    card: 'summary_large_image',
    title: AUTHOR,
    images: [OG_IMAGE_PATH],
    creator: TWITTER_HANDLE,
  },
  icons: {
    icon: FAVICON_IMAGE_PATH,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {/*
          Applies the stored or system colour mode before the first paint.
          Without it the prerendered HTML is painted in light mode and Chakra
          only switches to dark once React has hydrated, which the 200ms
          background transition in the theme turns into a visible flash.
        */}
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <Providers>
          <Header />
          <Box as="main" pt={{ base: 20, md: 20 }}>
            {children}
          </Box>
          <Footer />
        </Providers>
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  )
}
