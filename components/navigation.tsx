'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/i18n';
import { Language } from '@/lib/translations';
import {
    BookOpen,
    ChevronDown,
    Globe,
    Home,
    Menu,
    Radio,
    Settings,
    X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface NavigationProps {
  language?: Language;
}

export function Navigation({ language = 'en' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, switchLanguage } = useTranslation(language);
  
  // 构建语言切换链接 - 使用新的i18n系统
  const getLanguageLink = (targetLang: Language) => {
    return switchLanguage(targetLang, typeof window !== 'undefined' ? window.location.pathname : '/');
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={language === 'en' ? '/' : `/${language}`} className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg border border-green-400 shadow-lg shadow-green-400/20">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <span className="neon-text text-xl font-bold">{t.nav.title}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={language === 'en' ? '/' : `/${language}`} className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors">
              <Home className="h-4 w-4" />
              <span>HOME</span>
            </Link>

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors p-0 h-auto">
                  <Settings className="h-4 w-4" />
                  <span>{t.nav.tools}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-green-500/30 backdrop-blur-sm">
                <div className="p-3 text-center terminal-text text-sm opacity-60">
                  {t.nav.comingSoon}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Articles Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors p-0 h-auto">
                  <BookOpen className="h-4 w-4" />
                  <span>{t.nav.articles}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-green-500/30 backdrop-blur-sm">
                <div className="p-3 text-center terminal-text text-sm opacity-60">
                  {t.nav.comingSoon}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors p-0 h-auto">
                  <Globe className="h-4 w-4" />
                  <span>{t.nav.language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-green-500/30 backdrop-blur-sm">
                <DropdownMenuItem asChild>
                  <Link 
                    href={getLanguageLink('en')}
                    className={`terminal-text cursor-pointer hover:bg-green-900/20 w-full ${language === 'en' ? 'bg-green-900/30' : ''}`}
                  >
                    {t.nav.english}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href={getLanguageLink('cn')}
                    className={`terminal-text cursor-pointer hover:bg-green-900/20 w-full ${language === 'cn' ? 'bg-green-900/30' : ''}`}
                  >
                    {t.nav.chinese}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href={getLanguageLink('ja')}
                    className={`terminal-text cursor-pointer hover:bg-green-900/20 w-full ${language === 'ja' ? 'bg-green-900/30' : ''}`}
                  >
                    {t.nav.japanese}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden terminal-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-green-500/30">
            <div className="space-y-2">
              <Link href={language === 'en' ? '/' : `/${language}`} className="block px-3 py-2 terminal-text hover:bg-green-900/20 rounded-md">
                HOME
              </Link>
              <div className="px-3 py-2 terminal-text opacity-60">
                {t.nav.tools} ({t.nav.comingSoon})
              </div>
              <div className="px-3 py-2 terminal-text opacity-60">
                {t.nav.articles} ({t.nav.comingSoon})
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <div className="text-sm terminal-text opacity-80 mb-2">{t.nav.language}:</div>
                <div className="flex gap-2">
                  <Link
                    href={getLanguageLink('en')}
                    className={`inline-block px-3 py-1 terminal-text text-xs rounded border transition-colors ${language === 'en' ? 'bg-green-900/30 border-green-500' : 'border-green-500/30 hover:bg-green-900/20'}`}
                  >
                    {t.nav.english}
                  </Link>
                  <Link
                    href={getLanguageLink('cn')}
                    className={`inline-block px-3 py-1 terminal-text text-xs rounded border transition-colors ${language === 'cn' ? 'bg-green-900/30 border-green-500' : 'border-green-500/30 hover:bg-green-900/20'}`}
                  >
                    {t.nav.chinese}
                  </Link>
                  <Link
                    href={getLanguageLink('ja')}
                    className={`inline-block px-3 py-1 terminal-text text-xs rounded border transition-colors ${language === 'ja' ? 'bg-green-900/30 border-green-500' : 'border-green-500/30 hover:bg-green-900/20'}`}
                  >
                    {t.nav.japanese}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}