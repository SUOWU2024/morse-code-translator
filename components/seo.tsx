'use client';

import { generateStructuredData } from '@/lib/seo';

interface SEOJsonLdProps {
  page: string;
  language?: 'en' | 'cn' | 'ja';
  includeFAQ?: boolean;
}

export function SEOJsonLd({ page, language = 'en' }: SEOJsonLdProps) {
  const structuredData = generateStructuredData(page, language);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </>
  );
}

