// SEO配置文件 - 支持多语言和未来扩展
import { Metadata } from 'next';

// 基础网站信息
export const siteConfig = {
  name: 'Morse Telegraph Station',
  description: 'Professional Morse code translator with real-time audio feedback, visual representation, and authentic telegraph experience.',
  url: 'https://morsecodetranslator.codes',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/username/morse-code-translator',
    twitter: 'https://twitter.com/morsecodetrans'
  }
};

// 多语言SEO配置
export const multiLanguageSEO = {
  en: {
    siteName: 'Morse Code Translator',
    description: 'Professional online Morse code translator with real-time audio feedback and visual representation. Convert text to Morse code and vice versa with authentic telegraph experience. Free Morse code converter.',
  },
  cn: {
    siteName: '摩斯密码翻译器',
    description: '专业的在线摩斯码翻译器，具有实时音频反馈和可视化表示。将文本转换为摩斯码，体验真实的电报通信。免费的摩斯码转换器。',
  },
  ja: {
    siteName: 'モールス信号変換ツール',
    description: '無料のモールス信号変換ツールでテキストを瞬時にモールス信号に変換・翻訳。SOS信号解読、モールス信号一覧、覚え方ガイド付き。多言語対応のオンラインモールス信号学習サイト。',
  }
};

// 页面特定的SEO配置
export const pagesSEO = {
  home: {
    en: {
      title: 'Morse Code Translator - Free Online Text to Morse Converter',
      description: 'Professional morse code translator with instant text conversion and real-time audio feedback. Free online morse code translator for amateur radio, emergency communications, and learning.',
      canonical: '/',
      alternates: {
        canonical: 'https://morsecodetranslator.codes/',
        languages: {
          'en': 'https://morsecodetranslator.codes/',
          'zh-CN': 'https://morsecodetranslator.codes/cn',
          'ja': 'https://morsecodetranslator.codes/ja'
        }
      }
    },
    cn: {
      title: '摩斯密码翻译器 - 免费在线文本摩斯码转换器',
      description: '专业摩尔斯电码翻译器，支持文本电码即时互转，实时音频播放。免费在线摩尔斯电码翻译器，适用于业余无线电考试、应急通信和电码学习。移动端完美支持。',
      canonical: '/cn',
      alternates: {
        canonical: 'https://morsecodetranslator.codes/cn',
        languages: {
          'en': 'https://morsecodetranslator.codes/',
          'zh-CN': 'https://morsecodetranslator.codes/cn',
          'ja': 'https://morsecodetranslator.codes/ja'
        }
      }
    },
    ja: {
      title: 'モールス信号変換ツール | 無料オンラインモールス信号翻訳・解読サイト',
      description: '無料のモールス信号変換ツールでテキストを瞬時にモールス信号に変換・翻訳。SOS信号解読、モールス信号一覧、覚え方ガイド付き。多言語対応のオンラインモールス信号学習サイト。',
      canonical: '/ja',
      alternates: {
        canonical: 'https://morsecodetranslator.codes/ja',
        languages: {
          'en': 'https://morsecodetranslator.codes/',
          'zh-CN': 'https://morsecodetranslator.codes/cn',
          'ja': 'https://morsecodetranslator.codes/ja'
        }
      }
    }
  },
  about: {
    en: {
      title: 'About Morse Code Translator - Features & Technology',
      description: 'Learn about our professional Morse code translator features, technology stack, and mission to preserve Morse code communication. Discover the history and benefits of Morse code.',
      keywords: [
        'about morse code translator',
        'morse code history',
        'telegraph history',
        'morse code technology',
        'communication history',
        'amateur radio education',
        'morse code features',
        'telegraph communication'
      ],
      canonical: '/about'
    },
    cn: {
      title: '关于摩斯密码翻译器 - 功能与技术',
      description: '了解我们专业摩斯码翻译器的功能、技术架构和保护摩斯码通信的使命。探索摩斯码的历史和优势。',
      keywords: [
        '关于摩斯码翻译器',
        '摩斯码历史',
        '电报历史',
        '摩斯码技术',
        '通信历史',
        '业余无线电教育',
        '摩斯码功能',
        '电报通信'
      ],
      canonical: '/cn/about'
    }
  },
  privacy: {
    title: 'Privacy Policy - Morse Code Translator Privacy Protection',
    description: 'Our privacy policy explains how Morse Code Translator protects your data. We don\'t collect personal information - all Morse code processing happens locally in your browser.',
    keywords: ['privacy policy', 'data protection', 'morse code privacy', 'browser security', 'local processing'],
    canonical: '/privacy'
  },
  terms: {
    title: 'Terms of Service - Morse Code Translator Usage Terms',
    description: 'Terms of service for using Morse Code Translator. Learn about usage rights, acceptable use, and service availability for our online Morse code converter.',
    keywords: ['terms of service', 'usage terms', 'morse code terms', 'service agreement', 'user agreement'],
    canonical: '/terms'
  }
};

// 生成结构化数据的函数
export function generateStructuredData(page: string, language: 'en' | 'cn' | 'ja') {
  const config = language === 'cn' ? multiLanguageSEO.cn : 
                 language === 'ja' ? multiLanguageSEO.ja : 
                 multiLanguageSEO.en;
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": config.siteName,
    "description": config.description,
    "url": `${siteConfig.url}${language === 'cn' ? '/cn' : ''}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "permissions": "browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Morse Code Translator",
      "url": siteConfig.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/logo.png`
      }
    },
    "inLanguage": language === 'cn' ? 'zh-CN' : 'en-US',
    "browser": ["Chrome", "Firefox", "Safari", "Edge"],
    "screenshot": `${siteConfig.url}/screenshot.jpg`,
    "datePublished": "2025-07-08",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  // 根据页面类型添加特定的结构化数据
  switch (page) {
    case 'home':
      return {
        ...baseStructuredData,
        "featureList": [
          "Real-time Morse code translation",
          "Text to Morse code conversion",
          "Morse code to text conversion",
          "Audio feedback with customizable frequency",
          "Visual transmission display",
          "Multi-language support",
          "Educational reference materials",
          "Authentic telegraph experience",
          "Free online tool",
          "No registration required"
        ],
        "softwareVersion": "1.0",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1200",
          "bestRating": "5"
        },
        "potentialAction": {
          "@type": "UseAction",
          "target": `${siteConfig.url}${language === 'cn' ? '/cn' : ''}`,
          "object": "Morse Code Translation"
        }
      };
    
    case 'about':
      return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": `About ${config.siteName}`,
        "description": config.description,
        "url": `${siteConfig.url}${language === 'cn' ? '/cn' : ''}/about`,
        "inLanguage": language === 'cn' ? 'zh-CN' : 'en-US',
        "isPartOf": {
          "@type": "WebSite",
          "name": config.siteName,
          "url": siteConfig.url
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": config.siteName,
          "applicationCategory": "UtilityApplication",
          "description": config.description
        }
      };
    
    default:
      return baseStructuredData;
  }
}

// 生成元数据的通用函数
export function generateMetadata(
  pageConfig: any,
  language: 'en' | 'cn' | 'ja' = 'en'
): Metadata {
  const config = language === 'cn' ? multiLanguageSEO.cn : 
                 language === 'ja' ? multiLanguageSEO.ja : 
                 multiLanguageSEO.en;
  const currentPageConfig = pageConfig[language] || pageConfig;
  
  return {
    title: currentPageConfig.title,
    description: currentPageConfig.description,
    keywords: currentPageConfig.keywords,
    authors: [{ name: 'Morse Telegraph Station' }],
    creator: 'Morse Telegraph Station',
    publisher: 'Morse Telegraph Station',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: currentPageConfig.alternates || {
      canonical: `${siteConfig.url}${currentPageConfig.canonical}`,
    },
    openGraph: {
      title: currentPageConfig.title,
      description: currentPageConfig.description,
      url: `${siteConfig.url}${currentPageConfig.canonical}`,
      siteName: config.siteName,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: config.siteName,
        },
      ],
      locale: language === 'cn' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPageConfig.title,
      description: currentPageConfig.description,
      images: [siteConfig.ogImage],
      creator: '@morsetelegraph',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
