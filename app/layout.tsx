import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HomeVisor - Your Home, Managed',
  description: 'A 24/7 home manager that tracks assets, coordinates contractors, and makes homeownership feel like a managed portfolio instead of a never‑ending to‑do list.',
  keywords: ['home management', 'property management', 'homeowner', 'contractor coordination', 'home operating system', 'asset tracking'],
  authors: [{ name: 'HomeVisor' }],
  creator: 'HomeVisor',
  publisher: 'HomeVisor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://homevisor.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HomeVisor - Your Home, Managed',
    description: 'A 24/7 home manager that tracks assets, coordinates contractors, and makes homeownership feel like a managed portfolio instead of a never‑ending to‑do list.',
    url: 'https://homevisor.com',
    siteName: 'HomeVisor',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeVisor - Your Home, Managed',
    description: 'A 24/7 home manager that tracks assets, coordinates contractors, and makes homeownership feel like a managed portfolio instead of a never‑ending to‑do list.',
    creator: '@homevisor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  )
}

