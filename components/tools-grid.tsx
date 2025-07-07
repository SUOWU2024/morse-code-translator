import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, Binary, Hash, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    name: 'Morse Code Translator',
    description: 'Convert text to Morse code with audio playback and visual feedback. Perfect for learning and communication.',
    icon: Radio,
    href: '/tools/morse-code',
    category: 'Communication',
    features: ['Audio Playback', 'Visual Feedback', 'Speed Control', 'Reference Guide'],
    status: 'Available'
  },
  {
    name: 'Binary Translator',
    description: 'Convert text to binary code and vice versa. Essential tool for programming and computer science.',
    icon: Binary,
    href: '/tools/binary',
    category: 'Programming',
    features: ['Real-time Conversion', 'ASCII Support', 'Copy to Clipboard'],
    status: 'Coming Soon'
  },
  {
    name: 'Hex Converter',
    description: 'Convert text to hexadecimal and back. Useful for programming, debugging, and data analysis.',
    icon: Hash,
    href: '/tools/hex',
    category: 'Programming',
    features: ['Hex to Text', 'Color Codes', 'Byte Analysis'],
    status: 'Coming Soon'
  },
  {
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings. Essential for data transmission and web development.',
    icon: FileText,
    href: '/tools/base64',
    category: 'Web Development',
    features: ['File Encoding', 'URL Safe', 'Image Support'],
    status: 'Coming Soon'
  }
];

export function ToolsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Translation Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive suite of translation and conversion tools designed for professionals, 
            students, and enthusiasts. Each tool comes with educational resources and tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Card key={tool.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                      <tool.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {tool.category}
                        </Badge>
                        <Badge 
                          variant={tool.status === 'Available' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {tool.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-3">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full group-hover:bg-blue-700 transition-colors"
                    disabled={tool.status !== 'Available'}
                  >
                    <Link href={tool.href}>
                      {tool.status === 'Available' ? 'Try Tool' : 'Coming Soon'}
                      {tool.status === 'Available' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}