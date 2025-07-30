// Internationalization (i18n) 配置和工具函数
import { translations, Language } from './translations';

// 支持的语言列表
export const supportedLanguages: Language[] = ['en', 'cn', 'ja'];

// 默认语言
export const defaultLanguage: Language = 'en';

// 语言显示名称映射
export const languageNames = {
  en: 'English',
  cn: '中文',
  ja: '日本語'
} as const;

// 获取翻译函数
export function getTranslation(language: Language) {
  return translations[language] || translations[defaultLanguage];
}

// 语言检测和验证
export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}

// 从路径或参数中解析语言
export function parseLanguageFromPath(path: string): Language {
  const segments = path.split('/').filter(Boolean);
  const possibleLang = segments[0];
  
  if (isValidLanguage(possibleLang)) {
    return possibleLang;
  }
  
  return defaultLanguage;
}

// 生成语言切换URL
export function generateLanguageUrl(targetLanguage: Language, currentPath: string = '/'): string {
  // 移除当前路径中的语言前缀
  const pathWithoutLang = currentPath.replace(/^\/(en|cn|ja)/, '') || '/';
  
  // 检查是否为子页面（about, terms, privacy等）
  const isSubPage = pathWithoutLang !== '/' && pathWithoutLang !== '';
  
  // 如果是子页面，只支持英文版本，其他语言回到首页
  if (isSubPage && targetLanguage !== defaultLanguage) {
    // 其他语言的子页面重定向到该语言的首页
    return `/${targetLanguage}`;
  }
  
  // 如果是默认语言(英文)，不添加前缀
  if (targetLanguage === defaultLanguage) {
    return pathWithoutLang;
  }
  
  // 其他语言添加语言前缀（仅首页）
  return `/${targetLanguage}`;
}

// 获取浏览器首选语言
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const browserLang = navigator.language.toLowerCase();
  
  // 检查完整匹配
  if (browserLang === 'zh-cn' || browserLang === 'zh') {
    return 'cn';
  }
  if (browserLang === 'ja' || browserLang === 'ja-jp') {
    return 'ja';
  }
  
  // 检查语言代码前缀
  const langPrefix = browserLang.split('-')[0];
  if (langPrefix === 'zh') {
    return 'cn';
  }
  if (langPrefix === 'ja') {
    return 'ja';
  }
  
  return defaultLanguage;
}

// 类型安全的翻译hook
export function useTranslation(language: Language) {
  const t = getTranslation(language);
  
  return {
    t,
    language,
    languages: supportedLanguages,
    languageNames,
    isDefaultLanguage: language === defaultLanguage,
    switchLanguage: (targetLanguage: Language, currentPath?: string) => 
      generateLanguageUrl(targetLanguage, currentPath)
  };
}

// 格式化多语言内容
export type MultiLanguageContent<T = string> = {
  [K in Language]?: T;
};

export function getLocalizedContent<T>(
  content: MultiLanguageContent<T>,
  language: Language
): T | undefined {
  return content[language] || content[defaultLanguage];
}

// 添加新语言支持的工具函数
export function addLanguageSupport(newLanguage: string, displayName: string) {
  console.log(`To add support for ${newLanguage}:`);
  console.log(`1. Add '${newLanguage}' to supportedLanguages array`);
  console.log(`2. Add translation object to translations.ts`);
  console.log(`3. Add '${newLanguage}: '${displayName}'' to languageNames`);
  console.log(`4. Create route folder /app/${newLanguage}/`);
  console.log(`5. Update SEO configuration in lib/seo.ts`);
}