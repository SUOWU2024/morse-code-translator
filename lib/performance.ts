// Performance和SEO优化配置
export const performanceConfig = {
  // 关键资源预加载
  preloadResources: [
    { href: '/fonts/JetBrainsMono-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { href: '/fonts/Orbitron-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ],
  
  // DNS预解析
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ],
  
  // 预连接资源
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ],
  
  // 图片优化配置
  imageOptimization: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1年
  },
  
  // 压缩配置
  compression: {
    gzip: true,
    brotli: true
  },
  
  // 缓存策略
  cacheHeaders: {
    static: 'public, max-age=31536000, immutable',
    dynamic: 'public, max-age=3600, must-revalidate',
    api: 'public, max-age=300, s-maxage=600'
  }
};

// 生成预加载链接标签
export function generatePreloadLinks() {
  return performanceConfig.preloadResources.map(resource => ({
    rel: 'preload',
    ...resource
  }));
}

// 生成DNS预解析标签
export function generateDNSPrefetchLinks() {
  return performanceConfig.dnsPrefetch.map(href => ({
    rel: 'dns-prefetch',
    href
  }));
}

// 生成预连接标签
export function generatePreconnectLinks() {
  return performanceConfig.preconnect.map(href => ({
    rel: 'preconnect',
    href,
    crossOrigin: 'anonymous'
  }));
}

// Core Web Vitals优化建议
export const coreWebVitalsOptimization = {
  // Largest Contentful Paint (LCP)
  lcp: {
    optimizations: [
      'Preload critical images',
      'Optimize image formats (WebP, AVIF)',
      'Use responsive images',
      'Implement proper caching',
      'Minimize render-blocking resources'
    ]
  },
  
  // First Input Delay (FID)
  fid: {
    optimizations: [
      'Code splitting and lazy loading',
      'Remove unused JavaScript',
      'Optimize third-party scripts',
      'Use web workers for heavy computations'
    ]
  },
  
  // Cumulative Layout Shift (CLS)
  cls: {
    optimizations: [
      'Set explicit dimensions for images',
      'Reserve space for dynamic content',
      'Avoid inserting content above existing content',
      'Use CSS transforms for animations'
    ]
  }
};

// SEO技术优化清单
export const technicalSEOChecklist = {
  onPage: [
    '✓ Title tags optimized (50-60 characters)',
    '✓ Meta descriptions optimized (150-160 characters)',
    '✓ Header tags (H1, H2, H3) properly structured',
    '✓ Alt text for all images',
    '✓ Internal linking strategy',
    '✓ URL structure optimized',
    '✓ Schema.org structured data implemented',
    '✓ Open Graph and Twitter Card meta tags'
  ],
  
  technical: [
    '✓ XML sitemap generated and submitted',
    '✓ Robots.txt file configured',
    '✓ Canonical URLs implemented',
    '✓ 404 error pages handled',
    '✓ Page speed optimized (Core Web Vitals)',
    '✓ Mobile-friendly responsive design',
    '✓ HTTPS enabled',
    '✓ Breadcrumb navigation (where applicable)'
  ],
  
  content: [
    '✓ High-quality, original content',
    '✓ Keyword research and optimization',
    '✓ Content freshness and updates',
    '✓ User intent alignment',
    '✓ Comprehensive topic coverage',
    '✓ FAQ sections for common queries'
  ]
};
