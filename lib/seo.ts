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
    keywords: [
      'morse code translator',
      'morse code converter',
      'text to morse code',
      'morse to text',
      'morse code generator',
      'morse code decoder',
      'morse code audio',
      'morse code practice',
      'morse code learning',
      'telegraph translator',
      'amateur radio',
      'ham radio',
      'communication',
      'morse code encoder',
      'dots and dashes',
      'morse code trainer',
      'online morse translator',
      'free morse code converter',
      'morse code tool',
      'morse code simulator'
    ]
  },
  cn: {
    siteName: '摩斯密码翻译器',
    description: '专业的在线摩斯码翻译器，具有实时音频反馈和可视化表示。将文本转换为摩斯码，体验真实的电报通信。免费的摩斯码转换器。',
    keywords: [
      '摩斯码翻译器',
      '摩斯码转换器',
      '文本转摩斯码',
      '摩斯码转文本',
      '摩斯码生成器',
      '摩斯码解码器',
      '摩斯码音频',
      '摩斯码练习',
      '摩斯码学习',
      '电报翻译器',
      '业余无线电',
      '火腿电台',
      '通信',
      '摩斯码编码器',
      '点划',
      '摩斯码训练',
      '在线摩斯码翻译',
      '免费摩斯码转换',
      '摩斯码工具',
      '摩斯码模拟器'
    ]
  }
};

// 页面特定的SEO配置
export const pagesSEO = {
  home: {
    en: {
      title: 'Morse Code Translator - Free Online Text to Morse Converter',
      description: 'Free online Morse code translator with real-time audio feedback and visual representation. Convert text to Morse code and vice versa instantly. Professional Morse code converter with authentic telegraph experience.',
      keywords: multiLanguageSEO.en.keywords,
      canonical: '/',
      alternates: {
        languages: {
          'en': '/',
          'zh-CN': '/cn'
        }
      }
    },
    cn: {
      title: '摩斯密码翻译器 - 免费在线文本摩斯码转换器',
      description: '免费在线摩斯码翻译器，具有实时音频反馈和可视化表示。即时将文本转换为摩斯码。专业的摩斯码转换器，体验真实的电报通信。',
      keywords: multiLanguageSEO.cn.keywords,
      canonical: '/cn',
      alternates: {
        languages: {
          'en': '/',
          'zh-CN': '/cn'
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
export function generateStructuredData(page: string, language: 'en' | 'cn' = 'en') {
  const config = language === 'cn' ? multiLanguageSEO.cn : multiLanguageSEO.en;
  
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

// 为不同类型的页面生成FAQ结构化数据
export function generateFAQStructuredData(language: 'en' | 'cn' = 'en') {
  const faqs = language === 'cn' ? [
    {
      question: "什么是摩斯码？",
      answer: "摩斯码是一种字符编码，通过不同长度的信号（点和划）来表示字母、数字和标点符号。它由萨缪尔·摩斯在1830年代发明。"
    },
    {
      question: "如何使用这个摩斯码翻译器？",
      answer: "只需在文本框中输入您要转换的文本，翻译器会立即将其转换为摩斯码。您也可以输入摩斯码来转换为普通文本。"
    },
    {
      question: "这个工具是免费的吗？",
      answer: "是的，我们的摩斯码翻译器完全免费使用，无需注册或下载任何软件。"
    },
    {
      question: "摩斯码翻译器支持音频播放吗？",
      answer: "是的，我们的翻译器支持实时音频反馈，您可以听到摩斯码的声音，就像真正的电报一样。"
    }
  ] : [
    {
      question: "What is Morse code?",
      answer: "Morse code is a character encoding system that represents letters, numbers, and punctuation through sequences of dots and dashes. It was invented by Samuel Morse in the 1830s."
    },
    {
      question: "How do I use this Morse code translator?",
      answer: "Simply type your text in the input box and the translator will instantly convert it to Morse code. You can also input Morse code to convert it back to regular text."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, our Morse code translator is completely free to use with no registration or software download required."
    },
    {
      question: "Does the Morse code translator support audio playback?",
      answer: "Yes, our translator features real-time audio feedback so you can hear the Morse code sounds just like a real telegraph."
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// 生成元数据的通用函数
export function generateMetadata(
  pageConfig: any,
  language: 'en' | 'cn' = 'en'
): Metadata {
  const config = language === 'cn' ? multiLanguageSEO.cn : multiLanguageSEO.en;
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
      canonical: currentPageConfig.canonical,
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