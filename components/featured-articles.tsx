import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    title: 'Complete Guide to Morse Code',
    description: 'Learn the history, fundamentals, and practical applications of Morse code in modern communication.',
    category: 'Communication',
    readTime: '8 min read',
    href: '/articles/morse-code-guide',
    featured: true
  },
  {
    title: 'Understanding Binary Numbers',
    description: 'Master binary number system and understand how computers process information at the fundamental level.',
    category: 'Programming',
    readTime: '6 min read',
    href: '/articles/binary-basics',
    featured: true
  },
  {
    title: 'Hexadecimal in Web Development',
    description: 'Explore how hexadecimal is used in web development, from color codes to data representation.',
    category: 'Web Development',
    readTime: '5 min read',
    href: '/articles/hex-web-dev',
    featured: true
  }
];

export function FeaturedArticles() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Learning Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive deep into the theory and practical applications of translation tools and communication systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {articles.map((article) => (
            <Card key={article.title} className="group hover:shadow-lg transition-all duration-300">
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
                <Button asChild variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200">
                  <Link href={article.href}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/articles">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}