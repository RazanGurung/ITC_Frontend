import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/noto-sans-devanagari/400.css';
import '@fontsource/noto-sans-devanagari/500.css';
import '@fontsource/noto-sans-devanagari/600.css';
import '@fontsource/noto-sans-devanagari/700.css';
import { Providers } from './providers';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
