import { Globe, HelpCircle, Shield, Volume2, Zap } from 'lucide-react';

interface FAQProps {
  language: 'en' | 'cn';
}

const faqData = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our Morse code translator',
    faqs: [
      {
        icon: HelpCircle,
        question: 'What is a Morse code translator?',
        answer: 'A Morse code translator is a digital tool that converts regular text into Morse code (dots and dashes) and vice versa. Our online Morse code converter provides instant translation with audio feedback, making it perfect for learning Morse code, amateur radio practice, or educational purposes. The translator supports both text-to-Morse and Morse-to-text conversion with professional accuracy.'
      },
      {
        icon: Volume2,
        question: 'How does the audio feedback work in the Morse code translator?',
        answer: 'Our Morse code translator features authentic audio feedback that plays the actual dots and dashes as beeping sounds. You can adjust the frequency and speed to match traditional telegraph settings. This audio feature helps users learn proper Morse code timing and rhythm, making it an excellent Morse code training tool for beginners and professionals alike.'
      },
      {
        icon: Zap,
        question: 'Is this Morse code converter free to use?',
        answer: 'Yes! Our Morse code translator is completely free with no registration required. You can convert unlimited text to Morse code and Morse code to text without any restrictions. This makes our tool perfect for students, amateur radio operators, and anyone interested in learning Morse code communication.'
      },
      {
        icon: Shield,
        question: 'Is my data safe when using the Morse code translator?',
        answer: 'Absolutely! All Morse code translation happens locally in your browser - no data is sent to our servers. Your text and Morse code conversions remain completely private and secure. This offline processing ensures fast translation speeds and protects your privacy while using our Morse code converter.'
      },
      {
        icon: Globe,
        question: 'Does the Morse code translator support international characters?',
        answer: 'Our Morse code translator supports standard international Morse code characters including letters A-Z, numbers 0-9, and common punctuation marks. The translator follows ITU-R M.1677-1 standards, ensuring compatibility with international amateur radio and maritime communication protocols. This makes it suitable for global Morse code communication.'
      }
    ]
  },
  cn: {
    title: '常见问题解答',
    subtitle: '关于我们摩斯码翻译器的所有信息',
    faqs: [
      {
        icon: HelpCircle,
        question: '什么是摩斯码翻译器？',
        answer: '摩斯码翻译器是一个数字工具，可以将普通文本转换为摩斯码（点和划），反之亦然。我们的在线摩斯码转换器提供即时翻译和音频反馈，非常适合学习摩斯码、业余无线电练习或教育用途。翻译器支持文本到摩斯码和摩斯码到文本的双向转换，具有专业级准确性。'
      },
      {
        icon: Volume2,
        question: '摩斯码翻译器的音频反馈是如何工作的？',
        answer: '我们的摩斯码翻译器具有真实的音频反馈功能，可以播放实际的点和划的蜂鸣声。您可以调整频率和速度以匹配传统电报设置。此音频功能帮助用户学习正确的摩斯码时序和节奏，使其成为初学者和专业人士的优秀摩斯码训练工具。'
      },
      {
        icon: Zap,
        question: '这个摩斯码转换器免费使用吗？',
        answer: '是的！我们的摩斯码翻译器完全免费，无需注册。您可以无限制地将文本转换为摩斯码，以及将摩斯码转换为文本。这使我们的工具非常适合学生、业余无线电操作员和任何对学习摩斯码通信感兴趣的人。'
      },
      {
        icon: Shield,
        question: '使用摩斯码翻译器时我的数据安全吗？',
        answer: '绝对安全！所有摩斯码翻译都在您的浏览器中本地进行 - 没有数据发送到我们的服务器。您的文本和摩斯码转换保持完全私密和安全。这种离线处理确保快速翻译速度并在使用我们的摩斯码转换器时保护您的隐私。'
      },
      {
        icon: Globe,
        question: '摩斯码翻译器支持国际字符吗？',
        answer: '我们的摩斯码翻译器支持标准国际摩斯码字符，包括字母A-Z、数字0-9和常见标点符号。翻译器遵循ITU-R M.1677-1标准，确保与国际业余无线电和海事通信协议的兼容性。这使其适用于全球摩斯码通信。'
      }
    ]
  }
};

export function FAQ({ language }: FAQProps) {
  const data = faqData[language];

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="neon-text text-3xl font-bold mb-4">{data.title}</h2>
          <p className="terminal-text text-lg text-gray-300">{data.subtitle}</p>
        </div>

        <div className="space-y-6">
          {data.faqs.map((faq, index) => (
            <div key={index} className="retro-card">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg border border-blue-400 shadow-lg shadow-blue-400/20">
                      <faq.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="neon-text text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="terminal-text text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
