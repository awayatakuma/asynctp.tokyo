'use client'
import { Providers } from './providers'
import { Footer, Header } from '@/components'
import { Fonts } from '@/components/Fonts'

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
          <Fonts />
        </Providers>
      </body>
    </html>
  )
}
