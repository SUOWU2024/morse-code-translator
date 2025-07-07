import Link from 'next/link';
import { Code, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TranslateHub</span>
            </div>
            <p className="text-gray-400">
              Professional translation tools and educational resources for developers, students, and communication enthusiasts.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tools</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tools/morse-code" className="hover:text-white transition-colors">Morse Code</Link></li>
              <li><Link href="/tools/binary" className="hover:text-white transition-colors">Binary Translator</Link></li>
              <li><Link href="/tools/hex" className="hover:text-white transition-colors">Hex Converter</Link></li>
              <li><Link href="/tools/base64" className="hover:text-white transition-colors">Base64 Encoder</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/articles" className="hover:text-white transition-colors">All Articles</Link></li>
              <li><Link href="/articles/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link href="/articles/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TranslateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}