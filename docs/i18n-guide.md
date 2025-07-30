# 多语言支持扩展指南

本项目已经建立了完整的国际化(i18n)框架，支持轻松添加新语言。

## 项目架构

### 核心文件
- `lib/translations.ts` - 翻译内容和类型定义
- `lib/i18n.ts` - 国际化工具函数和hooks
- `lib/routes.ts` - 多语言路由配置
- `components/language-detector.tsx` - 语言检测和切换组件

### 当前支持的语言
- `en` - English (默认语言)
- `cn` - 中文

## 添加新语言步骤

### 1. 添加翻译内容

在 `lib/translations.ts` 中：

```typescript
export const translations: Record<string, TranslationSet> = {
  en: { /* 现有英文翻译 */ },
  cn: { /* 现有中文翻译 */ },
  
  // 添加新语言，例如日语
  ja: {
    nav: {
      title: "モールス電信局",
      tools: "ツール",
      articles: "記事",
      // ... 其他翻译
    },
    morse: {
      title: "モールス電信局",
      // ... 完整的摩斯码翻译
    },
    about: {
      title: "モールス電信局について", 
      // ... 关于页面翻译
    }
  }
};
```

### 2. 更新支持的语言列表

在 `lib/i18n.ts` 中：

```typescript
export const supportedLanguages: Language[] = ['en', 'cn', 'ja']; // 添加新语言

export const languageNames = {
  en: 'English',
  cn: '中文',
  ja: '日本語'  // 添加语言显示名称
} as const;
```

### 3. 配置路由支持

在 `lib/routes.ts` 中：

```typescript
export const multiLanguageRoutes = {
  home: {
    en: '/',
    cn: '/cn',
    ja: '/ja'  // 添加日语路由
  },
  // 注意：根据项目要求，about/privacy/terms等页面只保留英文版
};

export const languageMetadata = {
  en: { /* 现有配置 */ },
  cn: { /* 现有配置 */ },
  ja: {
    locale: 'ja_JP',
    htmlLang: 'ja',
    dir: 'ltr',
    name: '日本語'
  }
};
```

### 4. 创建新语言的页面路由

创建新的路由文件夹：
```
app/
  ja/           # 新语言文件夹
    page.tsx    # 主页
    layout.tsx  # 布局（可选）
```

### 5. 更新语言切换组件

在 `components/language-detector.tsx` 中：

```typescript
const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'cn', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }  // 添加新语言
];
```

### 6. 更新SEO配置

在 `lib/seo.ts` 中添加新语言的SEO配置：

```typescript
export const multiLanguageSEO = {
  en: { /* 现有配置 */ },
  cn: { /* 现有配置 */ },
  ja: {
    siteName: 'モールス符号翻訳器',
    description: 'プロフェッショナルなオンラインモールス符号翻訳器...'
  }
};
```

## 使用模板快速创建

项目提供了自动生成模板的功能：

```typescript
import { createLanguageTemplate } from '@/lib/translations';

// 生成新语言的翻译模板
const jaTemplate = createLanguageTemplate('ja');
```

这会生成包含所有需要翻译键的模板，所有文本都标记为 `[TRANSLATE]` 前缀，便于识别和翻译。

## 最佳实践

### 1. 类型安全
- 使用TypeScript接口确保所有语言版本具有相同的结构
- 利用类型系统防止翻译遗漏

### 2. 翻译质量
- 考虑文化差异，不仅仅是字面翻译
- 保持技术术语的一致性
- 测试文本长度对界面布局的影响

### 3. SEO优化
- 为每种语言配置适当的hreflang标签
- 提供本地化的meta描述和关键词
- 确保URL结构清晰

### 4. 渐进式添加
- 可以先实现核心功能的翻译
- 逐步完善所有界面元素
- 根据用户反馈调整翻译

## 注意事项

### 页面支持策略
根据项目要求：
- **多语言页面**: 主页(/)、摩斯码翻译器
- **仅英文页面**: about、privacy、terms等基础界面

### 路由结构
- 英文版本：直接使用根路径 `/`
- 其他语言：使用语言前缀 `/[lang]/`

### 组件使用
所有支持多语言的组件都应该：
- 接受 `language` 参数
- 使用 `useTranslation` hook获取翻译
- 遵循现有的组件模式

## 测试新语言

1. 创建翻译内容
2. 添加路由配置  
3. 测试语言切换
4. 验证SEO设置
5. 检查响应式布局
6. 确认所有功能正常工作

通过这套完整的i18n架构，可以快速、安全地为项目添加新语言支持。