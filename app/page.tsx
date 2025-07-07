import MorseTranslator from '@/components/morse-translator';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <>
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
          <div className="text-center py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="neon-text text-6xl md:text-8xl font-bold mb-6" data-text="MORSE CODE">
                MORSE CODE
              </h1>
              <h2 className="neon-text text-3xl md:text-4xl font-semibold mb-8 text-blue-300" data-text="TRANSLATOR">
                TRANSLATOR
              </h2>
              <p className="terminal-text text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Professional Morse code translation with real-time audio feedback, 
                visual representation, and authentic telegraph experience.
              </p>
            </div>
          </div>
          
          <MorseTranslator />
        </div>
      </div>
      <Toaster />
    </>
  );
}