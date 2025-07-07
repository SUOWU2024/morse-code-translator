import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    title: 'Complete Guide to Morse Code',
    description: 'Learn the history, fundamentals, and practical applications of Morse code in modern communication.',
    category: 'Communication',
    readTime: '8 min read',
    href: '/articles/morse-code-guide',
    date: '2025-01-15'
  },
  {
    title: 'Understanding Binary Numbers',
    description: 'Master binary number system and understand how computers process information at the fundamental level.',
    category: 'Programming',
    readTime: '6 min read',
    href: '/articles/binary-basics',
    date: '2025-01-14'
  },
  {
    title: 'Hexadecimal in Web Development',
    description: 'Explore how hexadecimal is used in web development, from color codes to data representation.',
    category: 'Web Development',
    readTime: '5 min read',
    href: '/articles/hex-web-dev',
    date: '2025-01-13'
  },
  {
    title: 'History of Telegraph Systems',
    description: 'Discover the evolution of telegraph communication and its impact on modern technology.',
    category: 'History',
    readTime: '7 min read',
    href: '/articles/telegraph-history',
    date: '2025-01-12'
  },
  {
    title: 'Base64 Encoding Explained',
    description: 'Understanding Base64 encoding, its uses in web development, and practical applications.',
    category: 'Programming',
    readTime: '4 min read',
    href: '/articles/base64-explained',
    date: '2025-01-11'
  },
  {
    title: 'ASCII and Character Encoding',
    description: 'Deep dive into ASCII, Unicode, and character encoding systems used in computing.',
    category: 'Programming',
    readTime: '9 min read',
    href: '/articles/character-encoding',
    date: '2025-01-10'
  }
];

export function ArticlesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.href} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            <CardTitle className="group-hover:text-blue-600 transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription>{article.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{article.date}</span>
              <Link 
                href={article.href}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}