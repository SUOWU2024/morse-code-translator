// 国际化翻译配置文件
// 支持多语言扩展的翻译系统

// 翻译接口定义，确保所有语言版本结构一致
interface NavigationTranslations {
  title: string;
  tools: string;
  articles: string;
  about: string;
  language: string;
  english: string;
  chinese: string;
  comingSoon: string;
}

interface MorseTranslations {
  title: string;
  switchMode: string;
  textToMorse: string;
  morseToText: string;
  visualTransmission: string;
  visualDescription: string;
  stationStatus: string;
  inputReady: string;
  outputReady: string;
  transmitting: string;
  repeatMode: string;
  controls: string;
  frequency: string;
  speed: string;
  transmission: string;
  transmit: string;
  stop: string;
  telegraphKey: string;
  inputMessage: string;
  morseCodeInput: string;
  inputPlaceholder: string;
  morsePlaceholder: string;
  morseCodeOutput: string;
  decodedMessage: string;
  outputPlaceholder: string;
  clear: string;
  copyInput: string;
  copyOutput: string;
  reference: string;
  alphabet: string;
  numbers: string;
  usageGuide: string;
  usageItems: string[];
  manualTransmission: string;
  transmitted: string;
  readyForTransmission: string;
  invalidMorseCode: string;
  conversionError: string;
  copiedToClipboard: string;
  failedToCopy: string;
  // 下载相关
  downloadTextSuccess: string;
  downloadTextFailed: string;
  downloadAudioSuccess: string;
  downloadAudioFailed: string;
  copyMorseCode: string;
  downloadText: string;
  downloadAudio: string;
}

interface AboutTranslations {
  title: string;
  subtitle: string;
  mission: string;
  missionText: string;
  features: string;
  featuresList: string[];
  history: string;
  historyText: string;
}

// 通用翻译接口
interface TranslationSet {
  nav: NavigationTranslations;
  morse: MorseTranslations;
  about: AboutTranslations;
}

export const translations: Record<string, TranslationSet> = {
  en: {
    // Navigation
    nav: {
      title: "MORSE TELEGRAPH",
      tools: "TOOLS",
      articles: "ARTICLES",
      about: "ABOUT",
      language: "Language",
      english: "English",
      chinese: "中文",
      comingSoon: "Coming Soon..."
    },
    
    // Morse Translator
    morse: {
      title: "MORSE TELEGRAPH STATION",
      switchMode: "SWITCH MODE",
      textToMorse: "TEXT → MORSE",
      morseToText: "MORSE → TEXT",
      
      // Visual Transmission
      visualTransmission: "VISUAL TRANSMISSION",
      visualDescription: "Real-time morse code visualization with signal patterns",
      
      // Station Status
      stationStatus: "STATION STATUS",
      inputReady: "INPUT READY",
      outputReady: "OUTPUT READY",
      transmitting: "TRANSMITTING",
      repeatMode: "REPEAT MODE",
      
      // Controls
      controls: "CONTROLS",
      frequency: "FREQUENCY",
      speed: "SPEED",
      
      // Transmission
      transmission: "TRANSMISSION",
      transmit: "TRANSMIT",
      stop: "STOP",
      telegraphKey: "TELEGRAPH KEY",
      
      // Input/Output
      inputMessage: "INPUT MESSAGE",
      morseCodeInput: "MORSE CODE INPUT",
      inputPlaceholder: "Enter your message here...",
      morsePlaceholder: "Enter Morse code (. - / for spaces)...",
      morseCodeOutput: "MORSE CODE OUTPUT",
      decodedMessage: "DECODED MESSAGE",
      outputPlaceholder: "Output will appear here...",
      
      // Buttons
      clear: "CLEAR",
      copyInput: "COPY INPUT",
      copyOutput: "COPY OUTPUT",
      
      // Reference
      reference: "MORSE CODE REFERENCE",
      alphabet: "ALPHABET",
      numbers: "NUMBERS",
      usageGuide: "USAGE GUIDE",
      usageItems: [
        "DOT (.) = SHORT SIGNAL",
        "DASH (-) = LONG SIGNAL",
        "SPACE = LETTER SEPARATION",
        "/ = WORD SEPARATION"
      ],
      
      // Status Messages
      manualTransmission: "Manual Transmission:",
      transmitted: "Transmitted:",
      readyForTransmission: "Ready for transmission",
      invalidMorseCode: "INVALID MORSE CODE FORMAT",
      conversionError: "CONVERSION ERROR",
      
      // Toast Messages
      copiedToClipboard: "Copied to clipboard!",
      failedToCopy: "Failed to copy",
      // 下载相关
      downloadTextSuccess: "Text file downloaded successfully!",
      downloadTextFailed: "Failed to download text file",
      downloadAudioSuccess: "Audio file downloaded successfully!",
      downloadAudioFailed: "Failed to generate audio file",
      copyMorseCode: "Copy Morse Code",
      downloadText: "Download Text",
      downloadAudio: "Download Audio"
    },
    
    // About Page (English only - others are single language)
    about: {
      title: "About Morse Telegraph Station",
      subtitle: "Bridging the gap between traditional communication and modern technology",
      mission: "Our Mission",
      missionText: "To preserve and modernize the art of Morse code communication through innovative digital tools that make learning and using Morse code accessible to everyone.",
      features: "Key Features",
      featuresList: [
        "Real-time audio feedback with customizable frequency and speed",
        "Visual transmission display with authentic telegraph aesthetics",
        "Comprehensive Morse code reference and learning tools",
        "Repeat mode for continuous practice",
        "Multi-language support for global accessibility"
      ],
      history: "Morse Code History",
      historyText: "Morse code was developed in the 1830s by Samuel Morse and Alfred Vail. It revolutionized long-distance communication and remained the primary method for telegraph communication for over a century. Today, it's still used in aviation, maritime, and amateur radio communications."
    }
  },
  
  cn: {
    // Navigation
    nav: {
      title: "摩斯电报站",
      tools: "工具",
      articles: "文章",
      about: "关于",
      language: "语言",
      english: "English",
      chinese: "中文",
      comingSoon: "敬请期待..."
    },
    
    // Morse Translator
    morse: {
      title: "摩斯电报站",
      switchMode: "切换模式",
      textToMorse: "文本 → 摩斯码",
      morseToText: "摩斯码 → 文本",
      
      // Visual Transmission
      visualTransmission: "可视化传输",
      visualDescription: "实时摩斯码可视化和信号模式",
      
      // Station Status
      stationStatus: "电台状态",
      inputReady: "输入就绪",
      outputReady: "输出就绪",
      transmitting: "正在传输",
      repeatMode: "循环模式",
      
      // Controls
      controls: "控制",
      frequency: "频率",
      speed: "速度",
      
      // Transmission
      transmission: "传输",
      transmit: "开始传输",
      stop: "停止",
      telegraphKey: "电报键",
      
      // Input/Output
      inputMessage: "输入消息",
      morseCodeInput: "摩斯码输入",
      inputPlaceholder: "请在此输入您的消息...",
      morsePlaceholder: "请输入摩斯码 (. - / 表示空格)...",
      morseCodeOutput: "摩斯码输出",
      decodedMessage: "解码消息",
      outputPlaceholder: "输出将显示在此处...",
      
      // Buttons
      clear: "清除",
      copyInput: "复制输入",
      copyOutput: "复制输出",
      
      // Reference
      reference: "摩斯码参考表",
      alphabet: "字母表",
      numbers: "数字",
      usageGuide: "使用指南",
      usageItems: [
        "点 (.) = 短信号",
        "划 (-) = 长信号",
        "空格 = 字母分隔",
        "/ = 单词分隔"
      ],
      
      // Status Messages
      manualTransmission: "手动传输:",
      transmitted: "已传输:",
      readyForTransmission: "准备传输",
      invalidMorseCode: "无效的摩斯码格式",
      conversionError: "转换错误",
      
      // Toast Messages
      copiedToClipboard: "已复制到剪贴板！",
      failedToCopy: "复制失败",
      // 下载相关
      downloadTextSuccess: "文本文件下载成功！",
      downloadTextFailed: "文本文件下载失败",
      downloadAudioSuccess: "音频文件下载成功！",
      downloadAudioFailed: "音频文件生成失败",
      copyMorseCode: "复制摩斯码",
      downloadText: "下载文本",
      downloadAudio: "下载音频"
    },
    
    // About Page (Chinese)
    about: {
      title: "关于摩斯电报站",
      subtitle: "连接传统通信与现代技术的桥梁",
      mission: "我们的使命",
      missionText: "通过创新的数字工具保护和现代化摩斯码通信艺术，让每个人都能轻松学习和使用摩斯码。",
      features: "主要特性",
      featuresList: [
        "可自定义频率和速度的实时音频反馈",
        "具有真实电报美学的可视化传输显示",
        "全面的摩斯码参考和学习工具",
        "用于持续练习的循环模式",
        "多语言支持，方便全球用户使用"
      ],
      history: "摩斯码历史",
      historyText: "摩斯码由塞缪尔·摩斯和阿尔弗雷德·维尔在1830年代开发。它革命性地改变了长距离通信，并在一个多世纪内一直是电报通信的主要方法。如今，它仍在航空、海事和业余无线电通信中使用。"
    }
  },
};

// 添加新语言的模板函数
export function createLanguageTemplate(languageCode: string): TranslationSet {
  console.warn(`Creating template for language: ${languageCode}`);
  console.warn('Please provide translations for all keys to complete the language support.');
  
  return {
    nav: {
      title: "[TRANSLATE] MORSE TELEGRAPH",
      tools: "[TRANSLATE] TOOLS", 
      articles: "[TRANSLATE] ARTICLES",
      about: "[TRANSLATE] ABOUT",
      language: "[TRANSLATE] Language",
      english: "English",
      chinese: "中文",
      comingSoon: "[TRANSLATE] Coming Soon..."
    },
    morse: {
      title: "[TRANSLATE] MORSE TELEGRAPH STATION",
      switchMode: "[TRANSLATE] SWITCH MODE",
      textToMorse: "[TRANSLATE] TEXT → MORSE",
      morseToText: "[TRANSLATE] MORSE → TEXT",
      visualTransmission: "[TRANSLATE] VISUAL TRANSMISSION",
      visualDescription: "[TRANSLATE] Real-time morse code visualization with signal patterns",
      stationStatus: "[TRANSLATE] STATION STATUS",
      inputReady: "[TRANSLATE] INPUT READY",
      outputReady: "[TRANSLATE] OUTPUT READY", 
      transmitting: "[TRANSLATE] TRANSMITTING",
      repeatMode: "[TRANSLATE] REPEAT MODE",
      controls: "[TRANSLATE] CONTROLS",
      frequency: "[TRANSLATE] FREQUENCY",
      speed: "[TRANSLATE] SPEED",
      transmission: "[TRANSLATE] TRANSMISSION",
      transmit: "[TRANSLATE] TRANSMIT",
      stop: "[TRANSLATE] STOP",
      telegraphKey: "[TRANSLATE] TELEGRAPH KEY",
      inputMessage: "[TRANSLATE] INPUT MESSAGE",
      morseCodeInput: "[TRANSLATE] MORSE CODE INPUT",
      inputPlaceholder: "[TRANSLATE] Enter your message here...",
      morsePlaceholder: "[TRANSLATE] Enter Morse code (. - / for spaces)...",
      morseCodeOutput: "[TRANSLATE] MORSE CODE OUTPUT",
      decodedMessage: "[TRANSLATE] DECODED MESSAGE",
      outputPlaceholder: "[TRANSLATE] Output will appear here...",
      clear: "[TRANSLATE] CLEAR",
      copyInput: "[TRANSLATE] COPY INPUT",
      copyOutput: "[TRANSLATE] COPY OUTPUT",
      reference: "[TRANSLATE] MORSE CODE REFERENCE",
      alphabet: "[TRANSLATE] ALPHABET",
      numbers: "[TRANSLATE] NUMBERS",
      usageGuide: "[TRANSLATE] USAGE GUIDE",
      usageItems: [
        "[TRANSLATE] DOT (.) = SHORT SIGNAL",
        "[TRANSLATE] DASH (-) = LONG SIGNAL", 
        "[TRANSLATE] SPACE = LETTER SEPARATION",
        "[TRANSLATE] / = WORD SEPARATION"
      ],
      manualTransmission: "[TRANSLATE] Manual Transmission:",
      transmitted: "[TRANSLATE] Transmitted:",
      readyForTransmission: "[TRANSLATE] Ready for transmission",
      invalidMorseCode: "[TRANSLATE] INVALID MORSE CODE FORMAT",
      conversionError: "[TRANSLATE] CONVERSION ERROR",
      copiedToClipboard: "[TRANSLATE] Copied to clipboard!",
      failedToCopy: "[TRANSLATE] Failed to copy",
      downloadTextSuccess: "[TRANSLATE] Text file downloaded successfully!",
      downloadTextFailed: "[TRANSLATE] Text file download failed",
      downloadAudioSuccess: "[TRANSLATE] Audio file downloaded successfully!",
      downloadAudioFailed: "[TRANSLATE] Audio file generation failed",
      copyMorseCode: "[TRANSLATE] Copy Morse Code",
      downloadText: "[TRANSLATE] Download Text",
      downloadAudio: "[TRANSLATE] Download Audio"
    },
    about: {
      title: "[TRANSLATE] About Morse Telegraph Station",
      subtitle: "[TRANSLATE] Bridging the gap between traditional communication and modern technology",
      mission: "[TRANSLATE] Our Mission",
      missionText: "[TRANSLATE] To preserve and modernize the art of Morse code communication through innovative digital tools that make learning and using Morse code accessible to everyone.",
      features: "[TRANSLATE] Key Features",
      featuresList: [
        "[TRANSLATE] Real-time audio feedback with customizable frequency and speed",
        "[TRANSLATE] Visual transmission display with authentic telegraph aesthetics",
        "[TRANSLATE] Comprehensive Morse code reference and learning tools",
        "[TRANSLATE] Repeat mode for continuous practice",
        "[TRANSLATE] Multi-language support for global accessibility"
      ],
      history: "[TRANSLATE] Morse Code History", 
      historyText: "[TRANSLATE] Morse code was developed in the 1830s by Samuel Morse and Alfred Vail. It revolutionized long-distance communication and remained the primary method for telegraph communication for over a century. Today, it's still used in aviation, maritime, and amateur radio communications."
    }
  };
}

// 类型导出
export type Language = keyof typeof translations;
export type TranslationKey = TranslationSet;
export type { TranslationSet, NavigationTranslations, MorseTranslations, AboutTranslations };
