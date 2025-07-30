import fs from 'fs';
import path from 'path';

export async function loadSEOContent(language: 'en' | 'cn'): Promise<string> {
  const contentPath = path.join(process.cwd(), 'content', 'seo', `${language}.md`);
  const content = fs.readFileSync(contentPath, 'utf-8');
  
  return content;
}