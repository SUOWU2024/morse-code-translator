import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { SEOJsonLd } from '@/components/seo';
import { generateMetadata, pagesSEO } from '@/lib/seo';
import { AlertTriangle, Clock, FileText, Scale } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata(pagesSEO.terms);

export default function TermsPage() {
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
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border border-purple-400 shadow-lg shadow-purple-400/20">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h1 className="neon-text text-4xl font-bold">Terms of Service</h1>
              </div>
              <p className="terminal-text text-lg text-gray-300">
                Last updated: January 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Agreement to Terms</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  By accessing and using Morse Telegraph Station, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations.
                </p>
              </div>
            </div>

            {/* Usage Rights */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Scale className="h-6 w-6 text-green-400 mr-3" />
                  Usage Rights
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  You may use our Morse code translator for personal, educational, and commercial purposes. 
                  The service is provided free of charge for all users. You may not attempt to reverse engineer, 
                  copy, or redistribute the source code without permission.
                </p>
              </div>
            </div>

            {/* Acceptable Use */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                  Acceptable Use
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  You agree to use the service only for lawful purposes. You will not use the service to 
                  transmit harmful, illegal, or inappropriate content. Emergency communications should use 
                  official channels rather than web-based tools.
                </p>
              </div>
            </div>

            {/* Service Availability */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Service Availability</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  The service is provided "as is" without warranties of any kind. We do not guarantee 
                  continuous availability and may modify or discontinue the service at any time.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="retro-card mb-8">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6">Limitation of Liability</h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  We are not liable for any damages arising from the use of our service. Users are responsible 
                  for verifying the accuracy of translations for critical communications.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="retro-card">
              <div className="p-8">
                <h2 className="neon-text text-2xl font-bold mb-6 flex items-center">
                  <Clock className="h-6 w-6 text-blue-400 mr-3" />
                  Changes to Terms
                </h2>
                <p className="terminal-text text-gray-300 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting. Continued use of the service constitutes acceptance of modified terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SEOJsonLd page="terms" language="en" />
      <Footer />
    </>
  );
}
