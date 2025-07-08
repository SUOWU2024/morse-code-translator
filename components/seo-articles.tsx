import { BookOpen, Clock, Lightbulb, Radio, Target, Users } from 'lucide-react';

interface SEOArticlesProps {
  language: 'en' | 'cn';
}

const articlesData = {
  en: {
    title: 'Learn More About Morse Code',
    subtitle: 'Comprehensive guides and resources for mastering Morse code translation',
    articles: [
      {
        icon: BookOpen,
        title: 'History of Morse Code and Telegraph Communication',
        description: 'Discover how Samuel Morse revolutionized long-distance communication with his ingenious code system. Learn about the evolution from telegraph to modern amateur radio, and why Morse code translators remain essential tools today. Our comprehensive guide covers the fascinating journey of dots and dashes that changed the world.',
        tags: ['morse code history', 'telegraph', 'samuel morse', 'communication evolution']
      },
      {
        icon: Radio,
        title: 'Amateur Radio and Morse Code: A Complete Guide',
        description: 'Master the art of amateur radio communication with our detailed Morse code translator guide. Learn proper procedures, international Q-codes, and how to use our Morse code converter for ham radio operations. Essential reading for anyone preparing for amateur radio licensing or improving their CW skills.',
        tags: ['amateur radio', 'ham radio', 'morse code practice', 'CW communication']
      },
      {
        icon: Lightbulb,
        title: 'Morse Code Learning Tips and Best Practices',
        description: 'Accelerate your Morse code learning with proven techniques and our advanced translator features. Discover memory aids, timing exercises, and effective practice routines. Our Morse code converter includes audio training features specifically designed to improve your reception and transmission skills.',
        tags: ['morse code learning', 'practice techniques', 'memory aids', 'training tips']
      },
      {
        icon: Target,
        title: 'Advanced Morse Code Translator Features Explained',
        description: 'Explore the professional features of our Morse code translator that set it apart from basic converters. Learn about customizable audio frequencies, visual timing displays, and advanced text formatting options. Perfect for serious Morse code enthusiasts and professionals.',
        tags: ['advanced features', 'professional tools', 'audio settings', 'customization']
      },
      {
        icon: Users,
        title: 'Morse Code in Emergency Communications',
        description: 'Understand the critical role of Morse code translators in emergency and disaster communications. Learn why amateur radio operators rely on CW for long-distance emergency traffic and how our translator helps prepare for emergency scenarios. Essential knowledge for emergency communicators.',
        tags: ['emergency communications', 'disaster response', 'emergency radio', 'public service']
      },
      {
        icon: Clock,
        title: 'Modern Applications of Morse Code Translation',
        description: 'Explore contemporary uses of Morse code beyond traditional radio. From maritime navigation to aviation, accessibility technology to educational tools, discover how our Morse code translator serves diverse modern applications. Learn about surprising current uses of this timeless communication method.',
        tags: ['modern applications', 'maritime', 'aviation', 'accessibility', 'education']
      }
    ]
  },
  cn: {
    title: '深入了解摩斯码',
    subtitle: '全面的指南和资源，帮助您掌握摩斯码翻译',
    articles: [
      {
        icon: BookOpen,
        title: '摩斯码和电报通信的历史',
        description: '了解萨缪尔·摩斯如何用他巧妙的编码系统革命性地改变了长距离通信。学习从电报到现代业余无线电的演变过程，以及为什么摩斯码翻译器至今仍是必不可少的工具。我们的综合指南涵盖了改变世界的点划符号的迷人历程。',
        tags: ['摩斯码历史', '电报', '萨缪尔摩斯', '通信演变']
      },
      {
        icon: Radio,
        title: '业余无线电与摩斯码：完整指南',
        description: '通过我们详细的摩斯码翻译器指南掌握业余无线电通信艺术。学习正确的程序、国际Q信号，以及如何使用我们的摩斯码转换器进行火腿电台操作。对于准备业余无线电执照考试或提高CW技能的人来说必读。',
        tags: ['业余无线电', '火腿电台', '摩斯码练习', 'CW通信']
      },
      {
        icon: Lightbulb,
        title: '摩斯码学习技巧和最佳实践',
        description: '使用经过验证的技术和我们的高级翻译器功能加速您的摩斯码学习。发现记忆辅助工具、时序练习和有效的练习程序。我们的摩斯码转换器包含专门设计的音频训练功能，以提高您的接收和发送技能。',
        tags: ['摩斯码学习', '练习技巧', '记忆辅助', '训练技巧']
      },
      {
        icon: Target,
        title: '高级摩斯码翻译器功能解释',
        description: '探索我们摩斯码翻译器的专业功能，这些功能使其区别于基本转换器。了解可定制的音频频率、视觉时序显示和高级文本格式选项。非常适合认真的摩斯码爱好者和专业人士。',
        tags: ['高级功能', '专业工具', '音频设置', '定制化']
      },
      {
        icon: Users,
        title: '紧急通信中的摩斯码',
        description: '了解摩斯码翻译器在紧急和灾难通信中的关键作用。学习为什么业余无线电操作员依靠CW进行长距离紧急通信，以及我们的翻译器如何帮助准备紧急情况。紧急通信员必备知识。',
        tags: ['紧急通信', '灾难响应', '紧急无线电', '公共服务']
      },
      {
        icon: Clock,
        title: '摩斯码翻译的现代应用',
        description: '探索摩斯码在传统无线电之外的当代用途。从海事导航到航空，从无障碍技术到教育工具，发现我们的摩斯码翻译器如何服务于多样化的现代应用。了解这种永恒通信方法令人惊讶的当前用途。',
        tags: ['现代应用', '海事', '航空', '无障碍', '教育']
      }
    ]
  }
};

export function SEOArticles({ language }: SEOArticlesProps) {
  const data = articlesData[language];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="neon-text text-3xl font-bold mb-4">{data.title}</h2>
          <p className="terminal-text text-lg text-gray-300">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.articles.map((article, index) => (
            <div key={index} className="retro-card group hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg border border-cyan-400 shadow-lg shadow-cyan-400/20">
                    <article.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="neon-text text-lg font-semibold">{article.title}</h3>
                </div>
                
                <p className="terminal-text text-sm text-gray-300 leading-relaxed mb-4">
                  {article.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-slate-700/50 text-cyan-300 rounded border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
