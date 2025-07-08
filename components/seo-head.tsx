// SEO优化的HTML头部标签
import { generateStructuredData } from '@/lib/seo';

interface SEOHeadProps {
  page: string;
  language?: 'en' | 'cn';
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export function SEOHead({ page, language = 'en', additionalMeta = [] }: SEOHeadProps) {
  const structuredData = generateStructuredData(page, language);
  
  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      
      {/* 额外的SEO元标签 */}
      <meta name="format-detection" content="telephone=no,address=no,email=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Morse Code Translator" />
      <meta name="application-name" content="Morse Code Translator" />
      <meta name="msapplication-TileColor" content="#22c55e" />
      <meta name="theme-color" content="#22c55e" />
      
      {/* 预连接到外部资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* 图标配置 - 确保在Google搜索中正确显示 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
      
      {/* 规范化URL */}
      <link rel="canonical" href={`https://morsecodetranslator.codes${language === 'cn' ? '/cn' : ''}`} />
      
      {/* 语言版本链接 */}
      <link rel="alternate" hrefLang="en" href="https://morsecodetranslator.codes/" />
      <link rel="alternate" hrefLang="zh-CN" href="https://morsecodetranslator.codes/cn" />
      <link rel="alternate" hrefLang="x-default" href="https://morsecodetranslator.codes/" />
      
      {/* 额外的元标签 */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* 特定页面的微数据 */}
      {page === 'home' && (
        <>
          <meta name="google-site-verification" content="your-google-verification-code" />
          <meta name="msvalidate.01" content="your-bing-verification-code" />
          <meta name="yandex-verification" content="your-yandex-verification-code" />
        </>
      )}
    </>
  );
}
