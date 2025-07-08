import type { Metadata } from 'next';
import { JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://morsecodetranslator.codes'),
  title: {
    default: 'Morse Code Translator - Free Online Text to Morse Converter',
    template: '%s | Morse Code Translator'
  },
  description: 'Professional morse code translator with instant text conversion and real-time audio feedback. Free online morse code translator for amateur radio, emergency communications, and learning.',
  keywords: [
    'morse code translator',
    'morse code converter',
    'text to morse code',
    'morse to text',
    'online morse translator',
    'free morse code converter',
    'morse code generator',
    'morse code decoder',
    'telegraph translator',
    'communication',
    'audio feedback',
    'visual representation',
    'amateur radio',
    'ham radio',
    'morse code practice',
    'morse code learning',
    'morse code tool',
    'dots and dashes'
  ],
  authors: [{ name: 'Morse Telegraph Station' }],
  creator: 'Morse Telegraph Station',
  publisher: 'Morse Telegraph Station',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#22c55e',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://morsecodetranslator.codes',
    siteName: 'Morse Code Translator',
    title: 'Morse Code Translator - Free Online Text to Morse Converter',
    description: 'Professional morse code translator with instant text conversion and real-time audio feedback. Free online morse code translator for amateur radio, emergency communications, and learning.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Morse Code Translator - Convert Text to Morse Code Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morse Code Translator - Free Online Text to Morse Converter',
    description: 'Professional morse code translator with instant text conversion and real-time audio feedback. Free online morse code translator for amateur radio, emergency communications, and learning.',
    images: ['/og-image.jpg'],
    creator: '@morsecodetrans',
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
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://morsecodetranslator.codes',
    languages: {
      'en': 'https://morsecodetranslator.codes',
      'zh-CN': 'https://morsecodetranslator.codes/cn'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${orbitron.variable} font-mono`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}