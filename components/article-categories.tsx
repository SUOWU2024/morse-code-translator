import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categories = [
  { name: 'All', count: 12 },
  { name: 'Communication', count: 3 },
  { name: 'Programming', count: 4 },
  { name: 'Web Development', count: 2 },
  { name: 'History', count: 2 },
  { name: 'Tutorials', count: 1 }
];

export function ArticleCategories() {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={category.name === 'All' ? 'default' : 'outline'}
          className="rounded-full"
        >
          {category.name}
          <Badge variant="secondary" className="ml-2">
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}