import React from 'react'
import './styles.css'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export const metadata = {
  title: "My Two Cents – Thoughts I Didn't Keep to Myself",
  description:
    "A quiet corner of the internet where I share whatever's on my mind—from deep reflections to random sparks of thought. Nothing fancy. Just real.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "My Two Cents – Thoughts I Didn't Keep to Myself",
    description:
      "A quiet corner of the internet where I share whatever's on my mind—from deep reflections to random sparks of thought. Nothing fancy. Just real.",
    images: [
      {
        url: '/fonts/image_fx.jpg',
        width: 1200,
        height: 630,
        alt: 'My Two Cents Blog Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "My Two Cents – Thoughts I Didn't Keep to Myself",
    description:
      "A quiet corner of the internet where I share whatever's on my mind—from deep reflections to random sparks of thought. Nothing fancy. Just real.",
    images: ['/fonts/image_fx.jpg'],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <link
        rel="preload"
        href="/fonts/pogonia-regular.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Ghoip.otf"
        as="font"
        type="font/otf"
        crossOrigin="anonymous"
      />
      <body>
        <MantineProvider>
          <main className="font-qurova min-h-dvh bg-ivory">
            <Header />
            {children}
            <Footer />
          </main>
        </MantineProvider>
      </body>
    </html>
  )
}
