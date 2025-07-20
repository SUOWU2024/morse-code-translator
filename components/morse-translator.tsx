'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { audioManager } from '@/lib/audio-manager';
import { getCurrentPlayingCharIndex, getMorseTimings, isValidMorseCode, morseToText, textToMorse } from '@/lib/morse-code';
import { Language, translations } from '@/lib/translations';
import {
  Activity,
  ArrowUpDown,
  BookOpen,
  Copy,
  Download,
  Play,
  Radio,
  Repeat,
  RotateCcw,
  Signal,
  Square
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import './morse-translator.css';

// Enhanced Morse Code Visualizer with CRT effect
const MorseVisualizer = ({ 
  morse, 
  isManualPlaying, 
  manualProgress, 
  playedLength,
  currentPlayingCharIndex,
  language = 'en'
}: { 
  morse: string; 
  isManualPlaying: boolean; 
  manualProgress: number;
  playedLength: number;
  currentPlayingCharIndex: number;
  language?: Language;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blinkingDots, setBlinkingDots] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isManualPlaying) {
      // 播放模式：使用当前播放字符索引
      setCurrentIndex(currentPlayingCharIndex);
      
      const newBlinking = new Set<number>();
      for (let i = Math.max(0, currentPlayingCharIndex - 2); i <= currentPlayingCharIndex; i++) {
        newBlinking.add(i);
      }
      setBlinkingDots(newBlinking);
    } else {
      // 非播放状态：保持已播放长度
      setCurrentIndex(playedLength);
      setBlinkingDots(new Set());
    }
  }, [isManualPlaying, currentPlayingCharIndex, playedLength, morse]);

  const renderMorseChar = (char: string, index: number) => {
    const isActive = isManualPlaying && index <= currentPlayingCharIndex;
    const isCurrentlyPlaying = isManualPlaying && index === currentPlayingCharIndex;
    const isPlayed = !isManualPlaying && index < playedLength;
    const isBlinking = blinkingDots.has(index);
    
    if (char === '.') {
      return (
        <div
          key={index}
          className={`morse-dot${isActive ? ' active' : ''}${isCurrentlyPlaying ? ' currently-playing' : ''}${isBlinking ? ' animate-pulse' : ''}${isPlayed ? ' played' : ''}`}
        />
      );
    } else if (char === '-') {
      return (
        <div
          key={index}
          className={`morse-dash${isActive ? ' active' : ''}${isCurrentlyPlaying ? ' currently-playing' : ''}${isBlinking ? ' animate-pulse' : ''}${isPlayed ? ' played' : ''}`}
        />
      );
    } else if (char === ' ') {
      return <div key={index} className="w-4" />;
    } else if (char === '/') {
      return (
        <div key={index} className={`w-8 h-1 bg-yellow-400 opacity-60 rounded mx-2${isCurrentlyPlaying ? ' currently-playing-space' : ''}`}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="morse-visualization crt-screen">
      <div className="flex items-center gap-2 flex-wrap justify-center min-h-[80px]">
        {morse.split('').map((char, index) => renderMorseChar(char, index))}
        {isManualPlaying && (
          <div className="typing-cursor w-1 h-8 bg-green-400 ml-3" />
        )}
      </div>
      <div className="text-center mt-4 terminal-text text-sm opacity-70">
        {isManualPlaying && `${language === 'en' ? 'Manual Transmission:' : '手动传输:'} ${Math.round(manualProgress * 100)}%`}
        {!isManualPlaying && playedLength > 0 && `${language === 'en' ? 'Transmitted:' : '已传输:'} ${playedLength}/${morse.length} chars`}
        {!isManualPlaying && playedLength === 0 && (language === 'en' ? 'Ready for transmission' : '准备传输')}
      </div>
    </div>
  );
};

// LED Status Indicator
const LEDIndicator = ({ active, label }: { active: boolean; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`led-indicator ${active ? 'active' : ''}`} />
    <span className="terminal-text text-sm">{label}</span>
  </div>
);

// Telegraph Key Animation
const TelegraphKey = ({ isPressed }: { isPressed: boolean }) => (
  <div className="flex items-center justify-center p-4">
    <div className="relative">
      <div className="w-16 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg border-2 border-gray-500">
        <div 
          className={`w-12 h-6 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-md border border-yellow-500 transition-all duration-150 ${
            isPressed ? 'translate-y-1 shadow-inner' : 'shadow-lg'
          }`}
          style={{ margin: '4px auto' }}
        />
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-700 rounded-full" />
    </div>
  </div>
);

export default function MorseTranslator({ language = 'en' }: { language?: Language }) {
  const t = translations[language];
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  
  // 手动播放状态
  const [isManualPlaying, setIsManualPlaying] = useState(false);
  const [manualProgress, setManualProgress] = useState(0);
  const [manualTransmitting, setManualTransmitting] = useState(false);
  const [currentPlayingCharIndex, setCurrentPlayingCharIndex] = useState(-1);
  const [repeatMode, setRepeatMode] = useState(false); // 循环播放模式
  
  const [playedLength, setPlayedLength] = useState(0); // 已播放的长度
  
  // 通用设置
  const [frequency, setFrequency] = useState([600]);
  const [speed, setSpeed] = useState([1]);

  // 使用ref来存储最新的状态值，避免闭包问题
  const repeatModeRef = useRef(repeatMode);
  const isManualPlayingRef = useRef(isManualPlaying);
  
  // 更新ref的值
  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);
  
  useEffect(() => {
    isManualPlayingRef.current = isManualPlaying;
  }, [isManualPlaying]);

  const translate = useCallback((input: string, currentMode: typeof mode) => {
    if (!input.trim()) return '';
    
    try {
      if (currentMode === 'text-to-morse') {
        return textToMorse(input);
      } else {
        if (!isValidMorseCode(input)) {
          return t.morse.invalidMorseCode;
        }
        return morseToText(input);
      }
    } catch (error) {
      return t.morse.conversionError;
    }
  }, []);

  useEffect(() => {
    const translated = translate(inputText, mode);
    setOutputText(translated);
  }, [inputText, mode, translate]);

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  const toggleMode = () => {
    const newMode = mode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse';
    setMode(newMode);
    
    setInputText(outputText);
    setOutputText(translate(outputText, newMode));
  };

  // 手动播放完整摩斯码
  const playManualMorse = async () => {
    if (!outputText || isManualPlaying) return;
    
    const timings = getMorseTimings(outputText);
    if (timings.length === 0) return;
    
    setIsManualPlaying(true);
    setManualTransmitting(true);
    
    const playOnce = async () => {
      setManualProgress(0);
      setCurrentPlayingCharIndex(-1);
      
      // 使用非阻塞方式播放
      await audioManager.playMorseCode(
        timings,
        frequency[0],
        speed[0],
        (progress) => setManualProgress(progress),
        () => {
          // 播放完成回调
          console.log('播放完成回调触发', { repeatMode: repeatModeRef.current, isManualPlaying: isManualPlayingRef.current });
          setManualProgress(1); // 显示完成状态
          setPlayedLength(outputText.length); // 标记全部播放完成
          setCurrentPlayingCharIndex(-1);
          
          // 如果开启了循环模式且仍在播放状态，继续播放
          if (repeatModeRef.current && isManualPlayingRef.current) {
            console.log('准备重复播放');
            setTimeout(() => {
              console.log('setTimeout回调执行', { repeatMode: repeatModeRef.current, isManualPlaying: isManualPlayingRef.current });
              if (repeatModeRef.current && isManualPlayingRef.current) {
                console.log('开始重复播放');
                // 重置进度并继续播放
                setManualProgress(0);
                setCurrentPlayingCharIndex(-1);
                setPlayedLength(0);
                playOnce(); // 递归调用继续播放
              }
            }, 500); // 缩短间隔到500ms
          } else {
            console.log('停止播放，未开启repeat或已手动停止');
            // 停止播放
            setIsManualPlaying(false);
            setManualTransmitting(false);
          }
        },
        (timingIndex) => {
          // 更新当前播放字符索引
          const charIndex = getCurrentPlayingCharIndex(outputText, timingIndex);
          setCurrentPlayingCharIndex(charIndex);
        }
      ).catch(() => {
        // 播放出错时也要重置状态
        setIsManualPlaying(false);
        setManualTransmitting(false);
        setCurrentPlayingCharIndex(-1);
      });
    };
    
    // 开始播放
    playOnce();
  };

  // 停止所有播放
  const stopAllAudio = () => {
    audioManager.stop();
    setIsManualPlaying(false);
    setManualTransmitting(false);
    setCurrentPlayingCharIndex(-1);
    // 注意：不要在这里关闭repeatMode，让用户手动控制
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t.morse.copiedToClipboard, {
        style: { background: '#001100', color: '#00ff41', border: '1px solid #00ff41' }
      });
    } catch (error) {
      toast.error(t.morse.failedToCopy, {
        style: { background: '#110000', color: '#ff4141', border: '1px solid #ff4141' }
      });
    }
  };

  // 下载摩斯电码文本文件
  const downloadMorseText = () => {
    if (!outputText) return;

    try {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `morse-code-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(language === 'en' ? 'Text file downloaded successfully!' : '文本文件下载成功！', {
        style: { background: '#001100', color: '#00ff41', border: '1px solid #00ff41' }
      });
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to download text file' : '文本文件下载失败', {
        style: { background: '#110000', color: '#ff4141', border: '1px solid #ff4141' }
      });
    }
  };
  const downloadMorseAudio = async () => {
    if (!outputText) return;

    try {
      const timings = getMorseTimings(outputText);
      if (timings.length === 0) return;

      // Create audio context for recording
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const sampleRate = audioContext.sampleRate;
      
      // Calculate total duration in seconds
      const totalDurationMs = timings.reduce((sum, timing) => sum + timing.duration, 0) / speed[0];
      const totalDurationSeconds = totalDurationMs / 1000;
      const bufferLength = Math.ceil(sampleRate * totalDurationSeconds);
      
      // Create audio buffer
      const audioBuffer = audioContext.createBuffer(1, bufferLength, sampleRate);
      const channelData = audioBuffer.getChannelData(0);
      
      let currentSample = 0;
      
      // Generate audio data for each timing
      timings.forEach((timing) => {
        const durationSamples = Math.ceil((timing.duration / speed[0] / 1000) * sampleRate);
        
        if (timing.type === 'dot' || timing.type === 'dash') {
          // Generate sine wave for beeps
          for (let i = 0; i < durationSamples && currentSample + i < bufferLength; i++) {
            const t = i / sampleRate;
            const fadeIn = Math.min(i / (sampleRate * 0.01), 1); // 10ms fade in
            const fadeOut = Math.min((durationSamples - i) / (sampleRate * 0.01), 1); // 10ms fade out
            const envelope = Math.min(fadeIn, fadeOut) * 0.15; // Volume
            channelData[currentSample + i] = envelope * Math.sin(2 * Math.PI * frequency[0] * t);
          }
        }
        // For pauses and spaces, leave silence (already initialized to 0)
        
        currentSample += durationSamples;
      });
      
      // Convert to WAV format
      const wavData = audioBufferToWav(audioBuffer);
      const blob = new Blob([wavData], { type: 'audio/wav' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `morse-code-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(language === 'en' ? 'Audio file downloaded successfully!' : '音频文件下载成功！', {
        style: { background: '#001100', color: '#00ff41', border: '1px solid #00ff41' }
      });
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to generate audio file' : '音频文件生成失败', {
        style: { background: '#110000', color: '#ff4141', border: '1px solid #ff4141' }
      });
    }
  };

  // Convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channelData = buffer.getChannelData(0);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert float32 to int16
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return arrayBuffer;
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setPlayedLength(0);
    setManualProgress(0);
    stopAllAudio();
  };

  const morseReference = [
    ['A', '.-'], ['B', '-...'], ['C', '-.-.'], ['D', '-..'], ['E', '.'], ['F', '..-.'],
    ['G', '--.'], ['H', '....'], ['I', '..'], ['J', '.---'], ['K', '-.-'], ['L', '.-..'],
    ['M', '--'], ['N', '-.'], ['O', '---'], ['P', '.--.'], ['Q', '--.-'], ['R', '.-.'],
    ['S', '...'], ['T', '-'], ['U', '..-'], ['V', '...-'], ['W', '.--'], ['X', '-..-'],
    ['Y', '-.--'], ['Z', '--..']
  ];

  const numberReference = [
    ['1', '.----'], ['2', '..---'], ['3', '...--'], ['4', '....-'], ['5', '.....'],
    ['6', '-....'], ['7', '--...'], ['8', '---..'], ['9', '----.'], ['0', '-----']
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <div className="space-y-8">
        {/* Header Card */}
        <Card className="retro-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="neon-text text-2xl flex items-center gap-3">
                <Radio className="h-7 w-7" />
                {t.morse.title}
              </CardTitle>
              <Button onClick={toggleMode} className="retro-button" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {t.morse.switchMode}
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-900 text-green-300 border-green-500">
                {mode === 'text-to-morse' ? t.morse.textToMorse : t.morse.morseToText}
              </Badge>
              <div className="circuit-pattern h-px flex-1 opacity-30" />
            </div>
          </CardHeader>
        </Card>

        {/* Visual Transmission - Top Position */}
        {mode === 'text-to-morse' && outputText && (
          <Card className="retro-card border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30 bg-gradient-to-br from-gray-900 to-gray-800 sticky top-20 z-10">
            <CardHeader className="pb-3">
              <CardTitle className="neon-text text-2xl flex items-center gap-3 text-yellow-300">
                <Activity className="h-8 w-8 animate-pulse" />
                {t.morse.visualTransmission}
              </CardTitle>
              <div className="text-sm terminal-text text-yellow-200 opacity-80">
                {t.morse.visualDescription}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-black rounded-lg border-2 border-yellow-500">
                <MorseVisualizer 
                  morse={outputText} 
                  isManualPlaying={isManualPlaying}
                  manualProgress={manualProgress}
                  playedLength={playedLength}
                  currentPlayingCharIndex={currentPlayingCharIndex}
                  language={language}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={() => copyToClipboard(outputText)}
                  className="retro-button bg-blue-900 border-blue-500 hover:bg-blue-800"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Copy Morse Code' : '复制摩斯码'}
                </Button>
                <Button
                  onClick={downloadMorseText}
                  className="retro-button bg-green-900 border-green-500 hover:bg-green-800"
                  size="sm"
                  disabled={!outputText}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Download Text' : '下载文本'}
                </Button>
                <Button
                  onClick={downloadMorseAudio}
                  className="retro-button bg-purple-900 border-purple-500 hover:bg-purple-800"
                  size="sm"
                  disabled={!outputText}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Download Audio' : '下载音频'}
                </Button>
              </div>
              
              {/* Integrated Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-yellow-500/30">
                {/* Station Status */}
                <div className="space-y-3">
                  <h4 className="neon-text text-sm font-medium text-yellow-300 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    {t.morse.stationStatus}
                  </h4>
                  <div className="space-y-2">
                    <LEDIndicator active={!!inputText} label={t.morse.inputReady} />
                    <LEDIndicator active={!!outputText} label={t.morse.outputReady} />
                    <LEDIndicator active={isManualPlaying} label={t.morse.transmitting} />
                    <LEDIndicator active={repeatMode} label={t.morse.repeatMode} />
                  </div>
                </div>

                {/* Telegraph Controls */}
                <div className="space-y-3">
                  <h4 className="neon-text text-sm font-medium text-yellow-300 flex items-center gap-2">
                    <Signal className="h-4 w-4" />
                    {t.morse.controls}
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="terminal-text text-xs">
                        {t.morse.frequency}: {frequency[0]} Hz
                      </Label>
                      <Slider
                        value={frequency}
                        onValueChange={setFrequency}
                        min={200}
                        max={1000}
                        step={50}
                        className="retro-slider"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="terminal-text text-xs">
                        {t.morse.speed}: {speed[0]}x
                      </Label>
                      <Slider
                        value={speed}
                        onValueChange={setSpeed}
                        min={0.1}
                        max={5}
                        step={0.1}
                        className="retro-slider"
                      />
                    </div>
                  </div>
                </div>

                {/* Transmission Controls */}
                <div className="space-y-3">
                  <h4 className="neon-text text-sm font-medium text-yellow-300 flex items-center gap-2">
                    <Radio className="h-4 w-4" />
                    {t.morse.transmission}
                  </h4>
                  <div className="space-y-3">
                    <Button
                      onClick={playManualMorse}
                      disabled={isManualPlaying}
                      className="retro-button bg-yellow-900 border-yellow-500 hover:bg-yellow-800 w-full"
                      size="sm"
                    >
                      {isManualPlaying ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          {Math.round(manualProgress * 100)}%
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {t.morse.transmit}
                        </>
                      )}
                    </Button>

                    {isManualPlaying && (
                      <Button
                        onClick={stopAllAudio}
                        className="retro-button bg-red-900 border-red-500 hover:bg-red-800 w-full"
                        size="sm"
                      >
                        <Square className="h-4 w-4 mr-2" />
                        {t.morse.stop}
                      </Button>
                    )}

                    {/* Repeat Mode Toggle */}
                    <div className={`flex items-center justify-between space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      repeatMode 
                        ? 'bg-yellow-600 bg-opacity-30 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                        : 'bg-yellow-900 bg-opacity-20 border-yellow-500 border-opacity-30'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <Repeat className={`h-4 w-4 transition-colors duration-200 ${
                          repeatMode ? 'text-yellow-200' : 'text-yellow-300'
                        }`} />
                        <Label htmlFor="repeat-mode" className={`terminal-text text-xs font-medium transition-colors duration-200 ${
                          repeatMode ? 'text-yellow-100' : 'text-yellow-300'
                        }`}>
                          {t.morse.repeatMode}
                        </Label>
                      </div>
                      <Switch
                        id="repeat-mode"
                        checked={repeatMode}
                        onCheckedChange={setRepeatMode}
                        disabled={isManualPlaying}
                        className="data-[state=checked]:bg-yellow-400"
                      />
                    </div>

                    {/* Telegraph Key */}
                    <div className="text-center">
                      <Label className="terminal-text text-xs block mb-1">
                        {t.morse.telegraphKey}
                      </Label>
                      <TelegraphKey isPressed={isManualPlaying} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Message */}
        <Card className="retro-card border-2 border-blue-500 shadow-lg shadow-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="neon-text text-xl flex items-center gap-3 text-blue-300">
                <Signal className="h-6 w-6" />
                {mode === 'text-to-morse' ? t.morse.inputMessage : t.morse.morseCodeInput}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={
                  mode === 'text-to-morse' 
                    ? t.morse.inputPlaceholder
                    : t.morse.morsePlaceholder
                }
                className="terminal-text min-h-[140px] crt-screen text-lg border-2 border-blue-400 focus:border-blue-300"
              />
              <div className="flex gap-3">
                <Button onClick={clearAll} className="retro-button" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t.morse.clear}
                </Button>
                {inputText && (
                  <Button
                    onClick={() => copyToClipboard(inputText)}
                    className="retro-button"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t.morse.copyInput}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

        {/* Morse Code Output - Prominent Position */}
        <Card className="retro-card border-2 border-green-500 shadow-lg shadow-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="neon-text text-xl flex items-center gap-3 text-green-300">
              <Radio className="h-6 w-6" />
              {mode === 'text-to-morse' ? t.morse.morseCodeOutput : t.morse.decodedMessage}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={outputText}
              readOnly
              placeholder={t.morse.outputPlaceholder}
              className="terminal-text min-h-[140px] crt-screen text-lg border-2 border-green-400 bg-green-950/20"
            />
            <div className="flex gap-3">
              {outputText && (
                <Button
                  onClick={() => copyToClipboard(outputText)}
                  className="retro-button"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t.morse.copyOutput}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Morse Code Reference - Moved below output */}
        <Card className="retro-card">
          <CardHeader>
            <CardTitle className="neon-text text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t.morse.reference}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="terminal-text text-sm font-medium">{t.morse.alphabet}</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {morseReference.slice(0, 13).map(([letter, morse]) => (
                    <div key={letter} className="flex justify-between items-center p-1 rounded bg-green-900 bg-opacity-20 border border-green-500 border-opacity-30">
                      <span className="terminal-text font-bold">{letter}</span>
                      <code className="terminal-text text-green-300">{morse}</code>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {morseReference.slice(13).map(([letter, morse]) => (
                    <div key={letter} className="flex justify-between items-center p-1 rounded bg-green-900 bg-opacity-20 border border-green-500 border-opacity-30">
                      <span className="terminal-text font-bold">{letter}</span>
                      <code className="terminal-text text-green-300">{morse}</code>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="terminal-text text-sm font-medium">{t.morse.numbers}</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {numberReference.map(([number, morse]) => (
                    <div key={number} className="flex justify-between items-center p-1 rounded bg-blue-900 bg-opacity-20 border border-blue-500 border-opacity-30">
                      <span className="terminal-text font-bold">{number}</span>
                      <code className="terminal-text text-blue-300">{morse}</code>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-green-500 opacity-30" />

                <div className="space-y-2 text-xs terminal-text">
                  <h4 className="font-medium">{t.morse.usageGuide}</h4>
                  <ul className="space-y-1 opacity-80">
                    {t.morse.usageItems.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}