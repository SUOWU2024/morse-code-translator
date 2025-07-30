import { Language, TranslationKey, translations } from '@/lib/translations';
import { usePathname } from 'next/navigation';

export function useLanguage(): {
  language: Language;
  t: TranslationKey;
  isDefaultLanguage: boolean;
} {
  const pathname = usePathname();
  
  // 从路径中提取语言
  const language: Language = pathname.startsWith('/cn') ? 'cn' : 
                           pathname.startsWith('/ja') ? 'ja' : 'en';
  const isDefaultLanguage = language === 'en';
  
  return {
    language,
    t: translations[language],
    isDefaultLanguage
  };
}
