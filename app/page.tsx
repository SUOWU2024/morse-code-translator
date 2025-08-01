import { Footer } from '@/components/footer';
import MorseTranslator from '@/components/morse-translator';
import { Navigation } from '@/components/navigation';
import { SEOJsonLd } from '@/components/seo';
import { SEOContent } from '@/components/seo-content';
import { Toaster } from '@/components/ui/sonner';
import { generateMetadata, pagesSEO } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata(pagesSEO.home, 'en');

export default function Home() {
  return (
    <>
      <Navigation language="en" />
      <div className="retro-bg min-h-screen">
        <div className="floating-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="py-16 px-6">
            <MorseTranslator language="en" />
          </div>
          <SEOContent language="en" />
        </div>
      </div>
      <SEOJsonLd page="home" language="en" />
      <Footer />
      <Toaster />
    </>
  );
}