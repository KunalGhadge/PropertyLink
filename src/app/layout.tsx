import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'Apex Realty Panvel | Navi Mumbai Verified Real Estate & Direct Builder Inventory',
    template: '%s | Apex Realty Navi Mumbai',
  },
  description:
    'Navi Mumbai’s trusted real estate platform. Search verified 1, 2, 3 BHK apartments, penthouses, and commercial plots in Panvel, Kharghar, Kamothe, Taloja & Seawoods. MahaRERA: A52000012345.',
  keywords: [
    'Property in Panvel',
    'Flats in Kharghar',
    'Navi Mumbai Real Estate',
    'Apex Realty',
    'MahaRERA verified properties',
    '2 BHK Panvel',
    '3 BHK Kharghar',
    'Zero Brokerage Navi Mumbai',
  ],
  authors: [{ name: 'Apex Realty Panvel' }],
  metadataBase: new URL('https://apexrealty.in'),
  openGraph: {
    title: 'Apex Realty Panvel | Navi Mumbai Verified Real Estate',
    description: 'Find verified luxury homes in Panvel & Kharghar. Direct builder pricing & zero brokerage on new launches.',
    siteName: 'PropertyLink',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fdfbf7] text-[#0c0f14] antialiased font-sans selection:bg-[#c5a059]/20 selection:text-[#0c0f14]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
