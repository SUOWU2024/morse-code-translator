import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Orbitron } from 'next/font/google';
import { Navigation } from '@/components/navigation';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: 'Morse Telegraph Station - Professional Morse Code Translator',
  description: 'Professional Morse code translator with real-time audio feedback, visual representation, and authentic telegraph experience.',
  keywords: 'morse code, translator, telegraph, communication, audio, visual, professional',
  authors: [{ name: 'Morse Telegraph Station' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${orbitron.variable} font-mono`}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}