import { ArticlesGrid } from '@/components/articles-grid';
import { ArticleCategories } from '@/components/article-categories';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Resources & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides, tutorials, and educational content about translation tools, 
            communication systems, and programming concepts.
          </p>
        </div>
        
        <ArticleCategories />
        <ArticlesGrid />
      </div>
    </div>
  );
}