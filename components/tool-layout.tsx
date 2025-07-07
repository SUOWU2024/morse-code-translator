import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

interface Article {
  title: string;
  href: string;
  excerpt: string;
  readTime: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  relatedTools?: RelatedTool[];
  articles?: Article[];
}

export function ToolLayout({ 
  title, 
  description, 
  category, 
  children, 
  relatedTools = [], 
  articles = [] 
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {category}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Tool */}
          <div className="xl:col-span-3">
            {children}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Tools</CardTitle>
                  <CardDescription>
                    Explore other translation and conversion tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedTools.map((tool) => (
                    <div key={tool.href} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <Link href={tool.href} className="block">
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Related Articles */}
            {articles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Learning Resources
                  </CardTitle>
                  <CardDescription>
                    Educational content and tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.href}>
                      <Link href={article.href} className="block group">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </Link>
                      {articles.indexOf(article) < articles.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                  
                  <Button asChild variant="outline" size="sm" className="w-full mt-4">
                    <Link href="/articles">
                      View All Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}