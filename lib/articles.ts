// 多语言文章系统架构
import { Language } from './translations';

// 文章元数据接口
export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readingTime: number; // 分钟
  featured: boolean;
  published: boolean;
  language: Language;
  // 多语言关联
  translations?: Partial<Record<Language, string>>; // 其他语言版本的slug
}

// 文章内容接口
export interface ArticleContent {
  metadata: ArticleMetadata;
  content: string; // Markdown内容
  excerpt: string; // 摘要
  coverImage?: string;
  tableOfContents?: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

// 文章分类配置
export const articleCategories = {
  en: {
    'morse-code': 'Morse Code',
    'tutorials': 'Tutorials',
    'history': 'History',
    'technology': 'Technology',
    'communication': 'Communication'
  },
  cn: {
    'morse-code': '摩斯码',
    'tutorials': '教程',
    'history': '历史',
    'technology': '技术',
    'communication': '通信'
  }
} as const;

// 文章标签配置
export const articleTags = {
  en: {
    'beginner': 'Beginner',
    'advanced': 'Advanced',
    'telegraph': 'Telegraph',
    'radio': 'Radio',
    'learning': 'Learning',
    'practice': 'Practice',
    'equipment': 'Equipment',
    'software': 'Software'
  },
  cn: {
    'beginner': '初学者',
    'advanced': '进阶',
    'telegraph': '电报',
    'radio': '无线电',
    'learning': '学习',
    'practice': '练习',
    'equipment': '设备',
    'software': '软件'
  }
} as const;

// 文章路由生成器
export class ArticleRouter {
  static getArticleUrl(slug: string, language: Language): string {
    const basePath = language === 'en' ? '' : `/${language}`;
    return `${basePath}/articles/${slug}`;
  }

  static getCategoryUrl(category: string, language: Language): string {
    const basePath = language === 'en' ? '' : `/${language}`;
    return `${basePath}/articles/category/${category}`;
  }

  static getTagUrl(tag: string, language: Language): string {
    const basePath = language === 'en' ? '' : `/${language}`;
    return `${basePath}/articles/tag/${tag}`;
  }

  static getArticlesIndexUrl(language: Language): string {
    const basePath = language === 'en' ? '' : `/${language}`;
    return `${basePath}/articles`;
  }
}

// 文章管理器
export class ArticleManager {
  private static articles: Map<string, ArticleContent> = new Map();

  // 添加文章
  static addArticle(article: ArticleContent): void {
    const key = `${article.metadata.language}-${article.metadata.slug}`;
    this.articles.set(key, article);
  }

  // 获取文章
  static getArticle(slug: string, language: Language): ArticleContent | null {
    const key = `${language}-${slug}`;
    return this.articles.get(key) || null;
  }

  // 获取文章列表
  static getArticles(language: Language, options?: {
    category?: string;
    tag?: string;
    featured?: boolean;
    published?: boolean;
    limit?: number;
    offset?: number;
  }): ArticleContent[] {
    let articles = Array.from(this.articles.values())
      .filter(article => article.metadata.language === language);

    // 应用过滤器
    if (options?.category) {
      articles = articles.filter(article => article.metadata.category === options.category);
    }
    if (options?.tag) {
      articles = articles.filter(article => article.metadata.tags.includes(options.tag!));
    }
    if (options?.featured !== undefined) {
      articles = articles.filter(article => article.metadata.featured === options.featured);
    }
    if (options?.published !== undefined) {
      articles = articles.filter(article => article.metadata.published === options.published);
    }

    // 按发布时间排序
    articles.sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );

    // 分页
    if (options?.offset) {
      articles = articles.slice(options.offset);
    }
    if (options?.limit) {
      articles = articles.slice(0, options.limit);
    }

    return articles;
  }

  // 获取相关文章
  static getRelatedArticles(article: ArticleContent, limit: number = 3): ArticleContent[] {
    const sameCategoryArticles = this.getArticles(article.metadata.language, {
      category: article.metadata.category,
      published: true
    }).filter(a => a.metadata.id !== article.metadata.id);

    const sameTagArticles = Array.from(this.articles.values())
      .filter(a => 
        a.metadata.language === article.metadata.language &&
        a.metadata.published &&
        a.metadata.id !== article.metadata.id &&
        a.metadata.tags.some(tag => article.metadata.tags.includes(tag))
      );

    // 合并并去重
    const relatedArticles = [...sameCategoryArticles, ...sameTagArticles]
      .reduce((unique, article) => {
        if (!unique.find(a => a.metadata.id === article.metadata.id)) {
          unique.push(article);
        }
        return unique;
      }, [] as ArticleContent[]);

    return relatedArticles.slice(0, limit);
  }

  // 搜索文章
  static searchArticles(query: string, language: Language): ArticleContent[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.articles.values())
      .filter(article => 
        article.metadata.language === language &&
        article.metadata.published &&
        (article.metadata.title.toLowerCase().includes(lowerQuery) ||
         article.metadata.description.toLowerCase().includes(lowerQuery) ||
         article.metadata.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
         article.content.toLowerCase().includes(lowerQuery))
      );
  }

  // 获取文章的其他语言版本
  static getArticleTranslations(article: ArticleContent): Partial<Record<Language, ArticleContent>> {
    const translations: Partial<Record<Language, ArticleContent>> = {};
    
    if (article.metadata.translations) {
      Object.entries(article.metadata.translations).forEach(([lang, slug]) => {
        if (slug) {
          const translatedArticle = this.getArticle(slug, lang as Language);
          if (translatedArticle) {
            translations[lang as Language] = translatedArticle;
          }
        }
      });
    }

    return translations;
  }
}

// 文章SEO生成器
export class ArticleSEO {
  static generateArticleMetadata(article: ArticleContent, language: Language) {
    const url = ArticleRouter.getArticleUrl(article.metadata.slug, language);
    
    return {
      title: `${article.metadata.title} | Morse Code Telegraph`,
      description: article.metadata.description,
      keywords: article.metadata.tags,
      authors: [{ name: article.metadata.author }],
      publishedTime: article.metadata.publishedAt,
      modifiedTime: article.metadata.updatedAt || article.metadata.publishedAt,
      section: article.metadata.category,
      tags: article.metadata.tags,
      
      openGraph: {
        title: article.metadata.title,
        description: article.metadata.description,
        url: url,
        type: 'article',
        images: article.coverImage ? [{ url: article.coverImage }] : [],
        publishedTime: article.metadata.publishedAt,
        modifiedTime: article.metadata.updatedAt || article.metadata.publishedAt,
        authors: [article.metadata.author],
        section: article.metadata.category,
        tags: article.metadata.tags
      },

      alternates: this.generateAlternateLinks(article),
      
      structuredData: this.generateArticleStructuredData(article, language)
    };
  }

  private static generateAlternateLinks(article: ArticleContent) {
    const alternates: Record<string, string> = {};
    
    // 当前文章
    alternates[`${article.metadata.language === 'cn' ? 'zh-CN' : article.metadata.language}`] = 
      ArticleRouter.getArticleUrl(article.metadata.slug, article.metadata.language);

    // 其他语言版本
    if (article.metadata.translations) {
      Object.entries(article.metadata.translations).forEach(([lang, slug]) => {
        if (slug) {
          const langCode = lang === 'cn' ? 'zh-CN' : lang;
          alternates[langCode] = ArticleRouter.getArticleUrl(slug, lang as Language);
        }
      });
    }

    return { languages: alternates };
  }

  private static generateArticleStructuredData(article: ArticleContent, language: Language) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.metadata.title,
      "description": article.metadata.description,
      "image": article.coverImage,
      "author": {
        "@type": "Person",
        "name": article.metadata.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Morse Code Telegraph",
        "logo": {
          "@type": "ImageObject",
          "url": "/logo.png"
        }
      },
      "datePublished": article.metadata.publishedAt,
      "dateModified": article.metadata.updatedAt || article.metadata.publishedAt,
      "articleSection": article.metadata.category,
      "keywords": article.metadata.tags.join(", "),
      "wordCount": article.content.split(/\s+/).length,
      "timeRequired": `PT${article.metadata.readingTime}M`,
      "inLanguage": language === 'cn' ? 'zh-CN' : 'en-US',
      "url": ArticleRouter.getArticleUrl(article.metadata.slug, language)
    };
  }
}