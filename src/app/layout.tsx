import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from 'next/font/google';
import { Providers } from './providers';
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

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-nepali',
  weight: ['400', '500', '600', '700'],
});

// ============================================
// Metadata Configuration
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'International Tamu (Gurung) Council | Unity, Identity and Prosperity',
    template: '%s | ITC',
  },
  description:
    'The International Tamu (Gurung) Council (ITC) is a non-profit, non-political international umbrella organization bringing together Tamu (Gurung) communities, associations, organizations, and individuals from different parts of the world.',
  keywords: [
    'ITC',
    'International Tamu (Gurung) Council',
    'Tamu',
    'Gurung',
    'non-profit',
    'indigenous',
    'culture',
    'heritage',
  ],
  authors: [{ name: 'International Tamu (Gurung) Council' }],
  creator: 'International Tamu (Gurung) Council',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'International Tamu (Gurung) Council',
    title: 'International Tamu (Gurung) Council | Unity, Identity and Prosperity',
    description:
      'Together, we preserve our heritage, strengthen our unity, and build a prosperous future for generations to come.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'International Tamu (Gurung) Council',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Tamu (Gurung) Council',
    description:
      'Together, we preserve our heritage, strengthen our unity, and build a prosperous future for generations to come.',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoSansDevanagari.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
