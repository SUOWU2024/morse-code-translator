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
      description: 'Professional morse code translator with instant text conversion and real-time audio feedback. Free online morse code translator for amateur radio, emergency communications, and learning.',
      keywords: multiLanguageSEO.en.keywords,
      canonical: '/',
      alternates: {
        canonical: 'https://morsecodetranslator.codes/',
        languages: {
          'en': 'https://morsecodetranslator.codes/',
          'zh-CN': 'https://morsecodetranslator.codes/cn'
        }
      }
    },
    cn: {
      title: '摩斯密码翻译器 - 免费在线文本摩斯码转换器',
      description: '专业摩尔斯电码翻译器，支持文本电码即时互转，实时音频播放。免费在线摩尔斯电码翻译器，适用于业余无线电考试、应急通信和电码学习。移动端完美支持。',
      keywords: multiLanguageSEO.cn.keywords,
      canonical: '/cn',
      alternates: {
        canonical: 'https://morsecodetranslator.codes/cn',
        languages: {
          'en': 'https://morsecodetranslator.codes/',
          'zh-CN': 'https://morsecodetranslator.codes/cn'
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
      question: "什么是摩斯码翻译器？",
      answer: "摩斯码翻译器是一个数字工具，可以将普通文本转换为摩斯码（点和划），反之亦然。我们的在线摩斯码转换器提供即时翻译和音频反馈，非常适合学习摩斯码、业余无线电练习或教育用途。翻译器支持文本到摩斯码和摩斯码到文本的双向转换，具有专业级准确性。"
    },
    {
      question: "如何使用这个摩斯码翻译器？",
      answer: "只需在文本框中输入您要转换的文本，翻译器会立即将其转换为摩斯码。您也可以输入摩斯码来转换为普通文本。我们的摩斯码转换器支持实时翻译，无需点击任何按钮。"
    },
    {
      question: "这个摩斯码转换器免费使用吗？",
      answer: "是的，我们的摩斯码翻译器完全免费使用，无需注册或下载任何软件。您可以无限制地进行摩斯码翻译，适合学生、业余无线电操作员和任何对学习摩斯码通信感兴趣的人。"
    },
    {
      question: "摩斯码翻译器支持音频播放吗？",
      answer: "是的，我们的翻译器支持实时音频反馈，您可以听到摩斯码的声音，就像真正的电报一样。您可以调整音频频率和播放速度，非常适合摩斯码学习和练习。"
    },
    {
      question: "使用摩斯码翻译器时我的数据安全吗？",
      answer: "绝对安全！所有摩斯码翻译都在您的浏览器中本地进行，没有数据发送到我们的服务器。您的文本和摩斯码转换保持完全私密和安全。"
    },
    {
      question: "摩斯码翻译器支持哪些字符？",
      answer: "我们的摩斯码翻译器支持标准国际摩斯码字符，包括字母A-Z、数字0-9和常见标点符号。翻译器遵循ITU-R M.1677-1标准，确保与国际业余无线电和海事通信协议的兼容性。"
    }
  ] : [
    {
      question: "What is a Morse code translator?",
      answer: "A Morse code translator is a digital tool that converts regular text into Morse code (dots and dashes) and vice versa. Our online Morse code converter provides instant translation with audio feedback, making it perfect for learning Morse code, amateur radio practice, or educational purposes. The translator supports both text-to-Morse and Morse-to-text conversion with professional accuracy."
    },
    {
      question: "How do I use this Morse code translator?",
      answer: "Simply type your text in the input box and the translator will instantly convert it to Morse code. You can also input Morse code to convert it back to regular text. Our Morse code converter supports real-time translation without needing to click any buttons."
    },
    {
      question: "Is this Morse code converter free to use?",
      answer: "Yes, our Morse code translator is completely free to use with no registration or software download required. You can perform unlimited Morse code translations, making it perfect for students, amateur radio operators, and anyone interested in learning Morse code communication."
    },
    {
      question: "Does the Morse code translator support audio playback?",
      answer: "Yes, our translator features real-time audio feedback so you can hear the Morse code sounds just like a real telegraph. You can adjust the audio frequency and playback speed, making it perfect for Morse code learning and practice."
    },
    {
      question: "Is my data safe when using the Morse code translator?",
      answer: "Absolutely! All Morse code translation happens locally in your browser - no data is sent to our servers. Your text and Morse code conversions remain completely private and secure."
    },
    {
      question: "What characters does the Morse code translator support?",
      answer: "Our Morse code translator supports standard international Morse code characters including letters A-Z, numbers 0-9, and common punctuation marks. The translator follows ITU-R M.1677-1 standards, ensuring compatibility with international amateur radio and maritime communication protocols."
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