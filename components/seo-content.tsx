import { use } from 'react';
import { loadSEOContent } from '@/lib/content-loader';

interface SEOContentProps {
  language: 'en' | 'cn' | 'ja';
}

function MarkdownRenderer({ content }: { content: string }) {
  const parseMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // H1 headings
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="neon-text text-4xl md:text-5xl font-bold mb-6 mt-8 leading-tight">
              {line.substring(2)}
            </h1>
          );
        }
        
        // H2 headings
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="neon-text text-2xl md:text-3xl font-bold mb-4 mt-8">
              {line.substring(3)}
            </h2>
          );
        }
        
        // H3 headings
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="neon-text text-xl md:text-2xl font-bold mb-3 mt-6">
              {line.substring(4)}
            </h3>
          );
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="mb-4" />;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="terminal-text text-gray-300 leading-relaxed mb-4">
            {line}
          </p>
        );
      });
  };

  return <div>{parseMarkdown(content)}</div>;
}

export function SEOContent({ language }: SEOContentProps) {
  const content = use(loadSEOContent(language));

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-slate-900/30 to-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="retro-card">
          <div className="p-8">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}