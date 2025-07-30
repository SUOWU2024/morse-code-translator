'use client';

import { useEffect, useState } from 'react';
import { Language } from '@/lib/translations';
import { getBrowserLanguage, parseLanguageFromPath, isValidLanguage } from '@/lib/i18n';

// 语言检测和管理的React Hook
export function useLanguageDetection(initialLanguage?: Language) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage || 'en');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    // 只在客户端执行语言检测
    if (typeof window === 'undefined') return;

    let detectedLanguage: Language = 'en';

    // 1. 优先使用初始语言参数
    if (initialLanguage && isValidLanguage(initialLanguage)) {
      detectedLanguage = initialLanguage;
    }
    // 2. 从URL路径解析语言
    else {
      const pathLanguage = parseLanguageFromPath(window.location.pathname);
      if (pathLanguage) {
        detectedLanguage = pathLanguage;
      }
      // 3. 最后使用浏览器语言偏好
      else {
        detectedLanguage = getBrowserLanguage();
      }
    }

    setCurrentLanguage(detectedLanguage);
    setIsLanguageLoaded(true);
  }, [initialLanguage]);

  return {
    currentLanguage,
    isLanguageLoaded,
    setLanguage: setCurrentLanguage
  };
}

// 语言切换组件
interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange?: (language: Language) => void;
  className?: string;
}

export function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange, 
  className = '' 
}: LanguageSwitcherProps) {
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'cn', name: '中文', flag: '🇨🇳' }
  ];

  const handleLanguageChange = (language: Language) => {
    if (onLanguageChange) {
      onLanguageChange(language);
    } else {
      // 默认行为：导航到对应语言的页面
      const currentPath = window.location.pathname;
      let newPath = '/';
      
      if (language === 'en') {
        // 英文版本，移除语言前缀
        newPath = currentPath.replace(/^\/cn/, '') || '/';
      } else {
        // 其他语言版本，添加语言前缀
        const pathWithoutLang = currentPath.replace(/^\/(en|cn)/, '') || '/';
        newPath = `/${language}${pathWithoutLang}`;
      }
      
      window.location.href = newPath;
    }
  };

  return (
    <div className={`language-switcher ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`language-option ${
            currentLanguage === lang.code ? 'active' : ''
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="flag">{lang.flag}</span>
          <span className="name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}

// 多语言内容组件
interface MultiLanguageContentProps {
  content: Partial<Record<Language, React.ReactNode>>;
  currentLanguage: Language;
  fallbackLanguage?: Language;
}

export function MultiLanguageContent({ 
  content, 
  currentLanguage, 
  fallbackLanguage = 'en' 
}: MultiLanguageContentProps) {
  const displayContent = content[currentLanguage] || content[fallbackLanguage] || content.en;
  
  if (!displayContent) {
    console.warn(`No content found for language ${currentLanguage} or fallback ${fallbackLanguage}`);
    return null;
  }

  return <>{displayContent}</>;
}