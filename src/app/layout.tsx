import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

// ============================================
// Font Configuration
// ============================================

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

// ============================================
// Metadata Configuration
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'International TAMU Corporation | Building Cultural Bridges',
    template: '%s | ITC',
  },
  description:
    'International TAMU Corporation (ITC) is a nonprofit organization dedicated to building bridges across cultures, fostering community spirit, and preserving heritage for future generations.',
  keywords: [
    'ITC',
    'International TAMU Corporation',
    'nonprofit',
    'cultural organization',
    'community',
    'heritage',
    'cultural events',
  ],
  authors: [{ name: 'International TAMU Corporation' }],
  creator: 'International TAMU Corporation',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'International TAMU Corporation',
    title: 'International TAMU Corporation | Building Cultural Bridges',
    description:
      'A nonprofit organization dedicated to building bridges across cultures, fostering community spirit, and preserving heritage.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'International TAMU Corporation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International TAMU Corporation',
    description:
      'Building bridges across cultures, fostering community spirit, and preserving heritage.',
    images: ['/images/og-image.jpg'],
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
