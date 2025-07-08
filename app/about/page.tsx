import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { translations } from '@/lib/translations';
import { Heart, Radio, Zap } from 'lucide-react';

export default function AboutPage() {
  const t = translations.en;
  
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
        
        <div className="relative z-10 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl border border-green-400 shadow-lg shadow-green-400/20">
                  <Radio className="h-8 w-8 text-white" />
                </div>
                <h1 className="neon-text text-4xl font-bold">{t.about.title}</h1>
              </div>
              <p className="terminal-text text-xl text-gray-300 max-w-2xl mx-auto">
                {t.about.subtitle}
              </p>
            </div>

            {/* Mission */}
            <div className="retro-card mb-12">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Heart className="h-6 w-6 text-red-400 mr-3" />
                  {t.about.mission}
                </h2>
                <p className="terminal-text text-gray-300 text-lg leading-relaxed">
                  {t.about.missionText}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="retro-card mb-12">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-8 flex items-center">
                  <Zap className="h-6 w-6 text-yellow-400 mr-3" />
                  {t.about.features}
                </h2>
                <div className="space-y-4">
                  {t.about.featuresList.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="terminal-text text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* History */}
            <div className="retro-card mb-12">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">{t.about.history}</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  {t.about.historyText}
                </p>
              </div>
            </div>

            {/* Technology */}
            <div className="retro-card">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Technology Stack</h2>
                <p className="terminal-text text-gray-300 mb-4">
                  This application is built with modern web technologies to provide a smooth, responsive experience.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-black/30 p-4 rounded border border-green-500/20">
                    <h4 className="text-green-300 font-semibold mb-2">Frontend</h4>
                    <ul className="terminal-text text-gray-400 space-y-1">
                      <li>• Next.js 14</li>
                      <li>• React 18</li>
                      <li>• TypeScript</li>
                      <li>• Tailwind CSS</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded border border-blue-500/20">
                    <h4 className="text-blue-300 font-semibold mb-2">Audio</h4>
                    <ul className="terminal-text text-gray-400 space-y-1">
                      <li>• Web Audio API</li>
                      <li>• Custom oscillator</li>
                      <li>• Real-time synthesis</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded border border-purple-500/20">
                    <h4 className="text-purple-300 font-semibold mb-2">Features</h4>
                    <ul className="terminal-text text-gray-400 space-y-1">
                      <li>• Responsive design</li>
                      <li>• Accessibility support</li>
                      <li>• Multi-language</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
