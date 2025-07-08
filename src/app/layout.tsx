import { Box } from '@chakra-ui/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Footer, Header } from '@/components'
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
        <Providers>
          <Header />
          <Box as="main" pt={{ base: '60px' }}>
            {children}
          </Box>
          <Footer />
        </Providers>
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  )
}
