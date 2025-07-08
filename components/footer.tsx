import { Heart, Radio } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900/90 text-white border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg border border-green-400/30">
                <Radio className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold neon-text">Morse Telegraph</span>
            </div>
            <p className="text-gray-400 terminal-text">
              Professional Morse code translator with real-time audio feedback, visual representation, and authentic telegraph experience.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-300">Tools</h3>
            <ul className="space-y-2 text-gray-400 terminal-text">
              <li><Link href="/" className="hover:text-green-300 transition-colors">Morse Translator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Resources</h3>
            <ul className="space-y-2 text-gray-400 terminal-text">
              <li><Link href="/about" className="hover:text-blue-300 transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Connect</h3>
            <div className="space-y-2 text-gray-400 terminal-text">
              <p>contact@morsetelegraph.dev</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 terminal-text">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for communication enthusiasts</span>
          </p>
          <p className="mt-2">&copy; 2025 Morse Telegraph Station. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}