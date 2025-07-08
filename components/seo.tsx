'use client';

import { generateFAQStructuredData, generateStructuredData } from '@/lib/seo';

interface SEOJsonLdProps {
  page: string;
  language?: 'en' | 'cn';
  includeFAQ?: boolean;
}

export function SEOJsonLd({ page, language = 'en', includeFAQ = false }: SEOJsonLdProps) {
  const structuredData = generateStructuredData(page, language);
  const faqData = includeFAQ ? generateFAQStructuredData(language) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData, null, 2),
          }}
        />
      )}
    </>
  );
}
