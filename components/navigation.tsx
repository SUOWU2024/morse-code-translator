'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    BookOpen,
    ChevronDown,
    Home,
    Menu,
    Radio,
    Settings,
    X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg border border-green-400 shadow-lg shadow-green-400/20">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <span className="neon-text text-xl font-bold">MORSE TELEGRAPH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors">
              <Home className="h-4 w-4" />
              <span>HOME</span>
            </Link>

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors p-0 h-auto">
                  <Settings className="h-4 w-4" />
                  <span>TOOLS</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-green-500/30 backdrop-blur-sm">
                {/* 目前为空，将来添加工具选项 */}
                <div className="p-3 text-center terminal-text text-sm opacity-60">
                  Coming Soon...
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Articles Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="terminal-text flex items-center space-x-2 hover:text-green-300 transition-colors p-0 h-auto">
                  <BookOpen className="h-4 w-4" />
                  <span>ARTICLES</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-green-500/30 backdrop-blur-sm">
                {/* 目前为空，将来添加文章选项 */}
                <div className="p-3 text-center terminal-text text-sm opacity-60">
                  Coming Soon...
                </div>
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
              <Link href="/" className="block px-3 py-2 terminal-text hover:bg-green-900/20 rounded-md">
                HOME
              </Link>
              <div className="px-3 py-2 terminal-text opacity-60">
                TOOLS (Coming Soon...)
              </div>
              <div className="px-3 py-2 terminal-text opacity-60">
                ARTICLES (Coming Soon...)
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}