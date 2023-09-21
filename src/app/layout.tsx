import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './Provider'
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chasescroll',
  description: 'Making your events great!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <Providers>
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
