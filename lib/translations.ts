// 翻译配置文件
export const translations = {
  en: {
    // Navigation
    nav: {
      title: "MORSE TELEGRAPH",
      tools: "TOOLS",
      articles: "ARTICLES",
      about: "ABOUT",
      language: "Language",
      english: "English",
      chinese: "中文"
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
      failedToCopy: "Failed to copy"
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
      chinese: "中文"
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
      failedToCopy: "复制失败"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.en;
