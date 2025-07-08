import { Eye, Smartphone, Volume2, Zap } from 'lucide-react';

interface HeroIntroProps {
  language: 'en' | 'cn';
}

const introData = {
  en: {
    title: 'Professional Morse Code Translator',
    subtitle: 'The Ultimate Free Online Morse Code Converter',
    description: 'Transform text into Morse code instantly with our advanced morse code translator. Our professional morse code converter features real-time audio feedback, visual transmission display, and authentic telegraph experience. Perfect for amateur radio operators, students, and morse code enthusiasts.',
    features: [
      {
        icon: Zap,
        title: 'Instant Morse Code Translation',
        description: 'Convert text to morse code and morse code to text instantly. Our morse code translator provides lightning-fast conversion with professional accuracy for all your morse code translation needs.'
      },
      {
        icon: Volume2,
        title: 'Authentic Audio Feedback',
        description: 'Experience real morse code sounds with our built-in audio system. Adjust frequency and speed to match traditional telegraph settings. Perfect for morse code practice and learning.'
      },
      {
        icon: Eye,
        title: 'Visual Morse Code Display',
        description: 'Watch your morse code come to life with our visual transmission display. See dots and dashes in real-time as you type, making it easier to learn morse code patterns and timing.'
      },
      {
        icon: Smartphone,
        title: 'Mobile-Friendly Morse Translator',
        description: 'Use our morse code converter anywhere, anytime. Fully responsive design works perfectly on all devices - desktop, tablet, and mobile. Your pocket morse code translator.'
      }
    ],
    keywords: [
      'morse code translator',
      'morse code converter',
      'text to morse code',
      'morse to text',
      'morse code generator',
      'morse code decoder',
      'online morse translator',
      'free morse code tool',
      'morse code practice',
      'amateur radio morse'
    ]
  },
  cn: {
    title: '专业摩斯码翻译器',
    subtitle: '终极免费在线摩斯码转换器',
    description: '使用我们的高级摩斯码翻译器即时将文本转换为摩斯码。我们的专业摩斯码转换器具有实时音频反馈、可视传输显示和真实的电报体验。非常适合业余无线电操作员、学生和摩斯码爱好者。',
    features: [
      {
        icon: Zap,
        title: '即时摩斯码翻译',
        description: '即时将文本转换为摩斯码，将摩斯码转换为文本。我们的摩斯码翻译器提供闪电般快速的转换，具有专业精度，满足您所有的摩斯码翻译需求。'
      },
      {
        icon: Volume2,
        title: '真实音频反馈',
        description: '通过我们内置的音频系统体验真实的摩斯码声音。调整频率和速度以匹配传统电报设置。非常适合摩斯码练习和学习。'
      },
      {
        icon: Eye,
        title: '可视化摩斯码显示',
        description: '通过我们的可视传输显示观看您的摩斯码变得生动。在您输入时实时查看点和划，使学习摩斯码模式和时序变得更容易。'
      },
      {
        icon: Smartphone,
        title: '移动友好的摩斯码翻译器',
        description: '随时随地使用我们的摩斯码转换器。完全响应式设计在所有设备上都能完美运行 - 桌面、平板和移动设备。您的口袋摩斯码翻译器。'
      }
    ],
    keywords: [
      '摩斯码翻译器',
      '摩斯码转换器',
      '文本转摩斯码',
      '摩斯码转文本',
      '摩斯码生成器',
      '摩斯码解码器',
      '在线摩斯码翻译',
      '免费摩斯码工具',
      '摩斯码练习',
      '业余无线电摩斯'
    ]
  }
};

export function HeroIntro({ language }: HeroIntroProps) {
  const data = introData[language];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="neon-text text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>
          <h2 className="terminal-text text-xl md:text-2xl text-cyan-300 mb-6">{data.subtitle}</h2>
          <p className="terminal-text text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {data.features.map((feature, index) => (
            <div key={index} className="retro-card group hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl border border-green-400 shadow-lg shadow-green-400/20">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="neon-text text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="terminal-text text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keywords section for SEO */}
        <div className="retro-card">
          <div className="p-6">
            <h3 className="neon-text text-lg font-semibold mb-4">
              {language === 'cn' ? '相关关键词：' : 'Related Keywords:'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full border border-blue-500/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
