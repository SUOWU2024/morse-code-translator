import MorseTranslator from '@/components/morse-translator';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

export default function ChinesePage() {
  return (
    <>
      <Navigation language="cn" />
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
            <MorseTranslator language="cn" />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
