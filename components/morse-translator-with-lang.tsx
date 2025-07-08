import MorseTranslator from '@/components/morse-translator';
import { Language } from '@/lib/translations';

interface MorseTranslatorWithLangProps {
  language: Language;
}

export function MorseTranslatorWithLang({ language }: MorseTranslatorWithLangProps) {
  return <MorseTranslator language={language} />;
}
