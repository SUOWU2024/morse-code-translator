// 多语言路由配置
import { Language } from './translations';

// 多语言路由映射
export const multiLanguageRoutes = {
  // 主页路由
  home: {
    en: '/',
    cn: '/cn'
  },
  
  // About页面 - 根据要求只保留英文版
  about: {
    en: '/about'
  },
  
  // Privacy页面 - 只保留英文版
  privacy: {
    en: '/privacy'
  },
  
  // Terms页面 - 只保留英文版  
  terms: {
    en: '/terms'
  }
} as const;

// 获取多语言路由
export function getLocalizedRoute(route: keyof typeof multiLanguageRoutes, language: Language): string {
  const routeConfig = multiLanguageRoutes[route];
  
  // 如果该路由支持指定语言，返回对应路由
  if (routeConfig && language in routeConfig) {
    return routeConfig[language as keyof typeof routeConfig];
  }
  
  // 否则返回英文版本（如果存在）
  if ('en' in routeConfig) {
    return routeConfig.en;
  }
  
  // 如果都不存在，返回根路径
  return '/';
}

// 检查路由是否支持多语言
export function isMultiLanguageRoute(route: keyof typeof multiLanguageRoutes): boolean {
  const routeConfig = multiLanguageRoutes[route];
  return Object.keys(routeConfig).length > 1;
}

// 获取路由支持的语言列表
export function getRouteSupportedLanguages(route: keyof typeof multiLanguageRoutes): Language[] {
  const routeConfig = multiLanguageRoutes[route];
  return Object.keys(routeConfig) as Language[];
}

// 语言特定的元数据配置
export const languageMetadata = {
  en: {
    locale: 'en_US',
    htmlLang: 'en',
    dir: 'ltr',
    name: 'English'
  },
  cn: {
    locale: 'zh_CN', 
    htmlLang: 'zh-CN',
    dir: 'ltr',
    name: '中文'
  }
} as const;

// 获取语言元数据
export function getLanguageMetadata(language: Language) {
  return languageMetadata[language as keyof typeof languageMetadata] || languageMetadata.en;
}