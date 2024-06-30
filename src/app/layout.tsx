import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next'
import { Providers } from './providers'
import { Footer, Header } from '@/components'
import {
  AUTHOR,
  DESCRIPTION,
  FAVICON_IMAGE_PATH,
  GA_ID,
  GITHUB_URL,
  SITE_ORIGIN,
  SITE_TITLE,
  TWITTER_HANDLE,
  OG_IMAGE_PATH,
} from '@/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    template: '%s | ' + SITE_TITLE,
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
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  )
}
