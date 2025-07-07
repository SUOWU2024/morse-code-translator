import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Translation
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Tools & Learning
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive platform for Morse code, binary, hexadecimal, and other translation tools. 
            Learn with our educational resources and master communication systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/tools/morse-code">
                <Code className="mr-2 h-5 w-5" />
                Try Morse Code Translator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/articles">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Learning Resources
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Tools</h3>
              <p className="text-gray-600">Morse code, binary, hex, Base64, and more translation tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Conversion</h3>
              <p className="text-gray-600">Instant translation with audio playback and visual feedback</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational Content</h3>
              <p className="text-gray-600">Comprehensive guides and tutorials for learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}