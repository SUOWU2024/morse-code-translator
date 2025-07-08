import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Database, Globe, Lock, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl border border-blue-400 shadow-lg shadow-blue-400/20">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="neon-text text-4xl font-bold">Privacy Policy</h1>
              </div>
              <p className="terminal-text text-lg text-gray-300">
                Last updated: January 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Our Commitment to Privacy</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  At Morse Telegraph Station, we are committed to protecting your privacy. This Privacy Policy 
                  explains how we handle information when you use our Morse code translator service.
                </p>
              </div>
            </div>

            {/* No Data Collection */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Database className="h-6 w-6 text-green-400 mr-3" />
                  No Data Collection
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  We do not collect, store, or transmit any personal information or user data. All Morse code 
                  translations are processed entirely in your browser locally. Your messages never leave your device.
                </p>
              </div>
            </div>

            {/* No Cookies */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Lock className="h-6 w-6 text-blue-400 mr-3" />
                  No Tracking
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  We do not use cookies, analytics, or any tracking technologies. Your browsing activity 
                  and usage patterns are not monitored or recorded.
                </p>
              </div>
            </div>

            {/* Local Processing */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Globe className="h-6 w-6 text-purple-400 mr-3" />
                  Local Processing
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  All functionality is implemented using client-side JavaScript. Audio generation, text processing, 
                  and Morse code conversion happen entirely within your browser using the Web Audio API and local computation.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="retro-card">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Contact</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@morsetelegraph.dev
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
