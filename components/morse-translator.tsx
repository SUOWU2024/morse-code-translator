'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { audioManager } from '@/lib/audio-manager';
import { getCurrentPlayingCharIndex, getMorseTimings, isValidMorseCode, morseToText, textToMorse } from '@/lib/morse-code';
import {
  Activity,
  ArrowUpDown,
  BookOpen,
  Copy,
  Play,
  Radio,
  RotateCcw,
  Signal,
  Square
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import './morse-translator.css'; // 新增：引入自定义样式

// Enhanced Morse Code Visualizer with CRT effect
const MorseVisualizer = ({ 
  morse, 
  isManualPlaying, 
  manualProgress, 
  playedLength,
  currentPlayingCharIndex 
}: { 
  morse: string; 
  isManualPlaying: boolean; 
  manualProgress: number;
  playedLength: number;
  currentPlayingCharIndex: number;
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
        {isManualPlaying && `Manual Transmission: ${Math.round(manualProgress * 100)}%`}
        {!isManualPlaying && playedLength > 0 && `Transmitted: ${playedLength}/${morse.length} chars`}
        {!isManualPlaying && playedLength === 0 && 'Ready for transmission'}
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

export default function MorseTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  
  // 手动播放状态
  const [isManualPlaying, setIsManualPlaying] = useState(false);
  const [manualProgress, setManualProgress] = useState(0);
  const [manualTransmitting, setManualTransmitting] = useState(false);
  const [currentPlayingCharIndex, setCurrentPlayingCharIndex] = useState(-1);
  
  const [playedLength, setPlayedLength] = useState(0); // 已播放的长度
  
  // 通用设置
  const [frequency, setFrequency] = useState([600]);
  const [speed, setSpeed] = useState([1]);

  const translate = useCallback((input: string, currentMode: typeof mode) => {
    if (!input.trim()) return '';
    
    try {
      if (currentMode === 'text-to-morse') {
        return textToMorse(input);
      } else {
        if (!isValidMorseCode(input)) {
          return 'INVALID MORSE CODE FORMAT';
        }
        return morseToText(input);
      }
    } catch (error) {
      return 'CONVERSION ERROR';
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
    setManualProgress(0);
    setCurrentPlayingCharIndex(-1);
    
    // 使用非阻塞方式播放
    audioManager.playMorseCode(
      timings,
      frequency[0],
      speed[0],
      (progress) => setManualProgress(progress),
      () => {
        setIsManualPlaying(false);
        setManualTransmitting(false);
        setManualProgress(1); // 显示完成状态
        setPlayedLength(outputText.length); // 标记全部播放完成
        setCurrentPlayingCharIndex(-1);
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

  // 停止所有播放
  const stopAllAudio = () => {
    audioManager.stop();
    setIsManualPlaying(false);
    setManualTransmitting(false);
    setCurrentPlayingCharIndex(-1);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!', {
        style: { background: '#001100', color: '#00ff41', border: '1px solid #00ff41' }
      });
    } catch (error) {
      toast.error('Failed to copy', {
        style: { background: '#110000', color: '#ff4141', border: '1px solid #ff4141' }
      });
    }
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
                MORSE TELEGRAPH STATION
              </CardTitle>
              <Button onClick={toggleMode} className="retro-button" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                SWITCH MODE
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-900 text-green-300 border-green-500">
                {mode === 'text-to-morse' ? 'TEXT → MORSE' : 'MORSE → TEXT'}
              </Badge>
              <div className="circuit-pattern h-px flex-1 opacity-30" />
            </div>
          </CardHeader>
        </Card>

        {/* Visual Transmission - Top Position */}
        {mode === 'text-to-morse' && outputText && (
          <Card className="retro-card border-4 border-yellow-400 shadow-2xl shadow-yellow-400/30 bg-gradient-to-br from-gray-900 to-gray-800 sticky top-4 z-10">
            <CardHeader className="pb-3">
              <CardTitle className="neon-text text-2xl flex items-center gap-3 text-yellow-300">
                <Activity className="h-8 w-8 animate-pulse" />
                VISUAL TRANSMISSION
              </CardTitle>
              <div className="text-sm terminal-text text-yellow-200 opacity-80">
                Real-time morse code visualization with signal patterns
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
                />
              </div>
              
              {/* Integrated Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-yellow-500/30">
                {/* Station Status */}
                <div className="space-y-3">
                  <h4 className="neon-text text-sm font-medium text-yellow-300 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    STATION STATUS
                  </h4>
                  <div className="space-y-2">
                    <LEDIndicator active={!!inputText} label="INPUT READY" />
                    <LEDIndicator active={!!outputText} label="OUTPUT READY" />
                    <LEDIndicator active={isManualPlaying} label="TRANSMITTING" />
                  </div>
                </div>

                {/* Telegraph Controls */}
                <div className="space-y-3">
                  <h4 className="neon-text text-sm font-medium text-yellow-300 flex items-center gap-2">
                    <Signal className="h-4 w-4" />
                    CONTROLS
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="terminal-text text-xs">
                        FREQUENCY: {frequency[0]} Hz
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
                        SPEED: {speed[0]}x
                      </Label>
                      <Slider
                        value={speed}
                        onValueChange={setSpeed}
                        min={0.5}
                        max={3}
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
                    TRANSMISSION
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
                          TRANSMIT
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
                        STOP
                      </Button>
                    )}

                    {/* Telegraph Key */}
                    <div className="text-center">
                      <Label className="terminal-text text-xs block mb-1">
                        TELEGRAPH KEY
                      </Label>
                      <TelegraphKey isPressed={isManualPlaying} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Message - Fixed Position */}
        <div className="sticky top-80 z-5">
          <Card className="retro-card border-2 border-blue-500 shadow-lg shadow-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="neon-text text-xl flex items-center gap-3 text-blue-300">
                <Signal className="h-6 w-6" />
                {mode === 'text-to-morse' ? 'INPUT MESSAGE' : 'MORSE CODE INPUT'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={
                  mode === 'text-to-morse' 
                    ? 'Enter your message here...' 
                    : 'Enter Morse code (. - / for spaces)...'
                }
                className="terminal-text min-h-[140px] crt-screen text-lg border-2 border-blue-400 focus:border-blue-300"
              />
              <div className="flex gap-3">
                <Button onClick={clearAll} className="retro-button" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  CLEAR
                </Button>
                {inputText && (
                  <Button
                    onClick={() => copyToClipboard(inputText)}
                    className="retro-button"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    COPY INPUT
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Morse Code Output - Prominent Position */}
        <Card className="retro-card border-2 border-green-500 shadow-lg shadow-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="neon-text text-xl flex items-center gap-3 text-green-300">
              <Radio className="h-6 w-6" />
              {mode === 'text-to-morse' ? 'MORSE CODE OUTPUT' : 'DECODED MESSAGE'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={outputText}
              readOnly
              placeholder="Output will appear here..."
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
                  COPY OUTPUT
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
              MORSE CODE REFERENCE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="terminal-text text-sm font-medium">ALPHABET</h4>
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
                <h4 className="terminal-text text-sm font-medium">NUMBERS</h4>
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
                  <h4 className="font-medium">USAGE GUIDE</h4>
                  <ul className="space-y-1 opacity-80">
                    <li>• DOT (.) = SHORT SIGNAL</li>
                    <li>• DASH (-) = LONG SIGNAL</li>
                    <li>• SPACE = LETTER SEPARATION</li>
                    <li>• "/" = WORD SEPARATION</li>
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