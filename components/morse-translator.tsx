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
import { getMorseTimings, isValidMorseCode, morseToText, textToMorse } from '@/lib/morse-code';
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
const MorseVisualizer = ({ morse, isPlaying, progress }: { morse: string; isPlaying: boolean; progress: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blinkingDots, setBlinkingDots] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isPlaying) {
      const totalChars = morse.length;
      const newIndex = Math.floor(progress * totalChars);
      setCurrentIndex(newIndex);
      // Add blinking effect for active elements
      const newBlinking = new Set<number>();
      for (let i = Math.max(0, newIndex - 3); i <= newIndex; i++) {
        newBlinking.add(i);
      }
      setBlinkingDots(newBlinking);
    } else {
      setCurrentIndex(morse.length); // 变色到全部已播放
      setBlinkingDots(new Set());
    }
  }, [isPlaying, progress, morse]);

  const renderMorseChar = (char: string, index: number) => {
    const isActive = isPlaying && index <= currentIndex;
    const isPlayed = !isPlaying && index < currentIndex; // 新增: 播放过的变色
    const isBlinking = blinkingDots.has(index);
    if (char === '.') {
      return (
        <div
          key={index}
          className={`morse-dot${isActive ? ' active' : ''}${isBlinking ? ' animate-pulse' : ''}${isPlayed ? ' played' : ''}`}
        />
      );
    } else if (char === '-') {
      return (
        <div
          key={index}
          className={`morse-dash${isActive ? ' active' : ''}${isBlinking ? ' animate-pulse' : ''}${isPlayed ? ' played' : ''}`}
        />
      );
    } else if (char === ' ') {
      return <div key={index} className="w-4" />;
    } else if (char === '/') {
      return (
        <div key={index} className="w-8 h-1 bg-yellow-400 opacity-60 rounded mx-2">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="morse-visualization crt-screen">
      <div className="flex items-center gap-1 flex-wrap">
        {morse.split('').map((char, index) => renderMorseChar(char, index))}
        {isPlaying && (
          <div className="typing-cursor w-0.5 h-6 bg-green-400 ml-2" />
        )}
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [frequency, setFrequency] = useState([600]);
  const [speed, setSpeed] = useState([1]);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [lastMorse, setLastMorse] = useState(''); // 记录上次morse
  const [lastPlayIndex, setLastPlayIndex] = useState(0); // 记录上次播放到哪里

  // 自动播放所有新增内容（分段连续播放）
  const [autoQueue, setAutoQueue] = useState<string[]>([]);
  const [autoOffset, setAutoOffset] = useState(0);

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
    if (autoPlay && value.trim() && mode === 'text-to-morse') {
      const morse = textToMorse(value);
      // 找到新增部分（支持多段连续新增）
      let startIdx = 0;
      for (let i = 0; i < Math.min(lastMorse.length, morse.length); i++) {
        if (lastMorse[i] !== morse[i]) {
          startIdx = i;
          break;
        }
        if (i === lastMorse.length - 1) {
          startIdx = lastMorse.length;
        }
      }
      if (morse.length > lastMorse.length) {
        // 新增多段内容
        const newMorse = morse.slice(startIdx);
        setAutoQueue(q => q.concat(newMorse.split(/(?=[.\-/ ])/g).filter(Boolean)));
        setAutoOffset(startIdx);
      }
      setLastMorse(morse);
      setLastPlayIndex(startIdx);
    } else {
      setLastMorse('');
      setLastPlayIndex(0);
      setAutoQueue([]);
      setAutoOffset(0);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse';
    setMode(newMode);
    
    setInputText(outputText);
    setOutputText(translate(outputText, newMode));
  };

  // 自动队列播放
  useEffect(() => {
    if (autoPlay && autoQueue.length > 0 && !isPlaying) {
      const next = autoQueue[0];
      playMorseCode(next, autoOffset);
      setAutoQueue(q => q.slice(1));
      setAutoOffset(o => o + next.length);
    }
    // eslint-disable-next-line
  }, [autoQueue, isPlaying, autoPlay]);

  const playMorseCode = async (morse?: string, offset = 0) => {
    stopAudio();
    const morseToPlay = morse || (mode === 'text-to-morse' ? outputText : inputText);
    if (!morseToPlay || isPlaying) return;
    const timings = getMorseTimings(morseToPlay);
    if (timings.length === 0) return;
    setIsPlaying(true);
    setIsTransmitting(true);
    setPlayProgress(offset / (outputText.length || 1));
    await audioManager.playMorseCode(
      timings,
      frequency[0],
      speed[0],
      (progress) => setPlayProgress((offset + progress * morseToPlay.length) / (outputText.length || 1)),
      () => {
        setIsPlaying(false);
        setIsTransmitting(false);
        setPlayProgress((offset + morseToPlay.length) / (outputText.length || 1));
      }
    );
  };

  const stopAudio = () => {
    audioManager.stop();
    setIsPlaying(false);
    setIsTransmitting(false);
    setPlayProgress(0);
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
    stopAudio();
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
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Translator */}
        <div className="xl:col-span-3 space-y-8">
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
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="terminal-text text-sm font-medium">
                  {mode === 'text-to-morse' ? 'INPUT MESSAGE' : 'MORSE CODE INPUT'}
                </Label>
                <Textarea
                  value={inputText}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={
                    mode === 'text-to-morse' 
                      ? 'Enter your message here...' 
                      : 'Enter Morse code (. - / for spaces)...'
                  }
                  className="terminal-text min-h-[120px] crt-screen"
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
              </div>

              <Separator className="bg-green-500 opacity-30" />

              <div className="space-y-3">
                <Label className="terminal-text text-sm font-medium">
                  {mode === 'text-to-morse' ? 'MORSE CODE OUTPUT' : 'DECODED MESSAGE'}
                </Label>
                <Textarea
                  value={outputText}
                  readOnly
                  placeholder="Output will appear here..."
                  className="terminal-text min-h-[120px] crt-screen"
                />
                
                {/* Enhanced Visual Morse Code Display */}
                {mode === 'text-to-morse' && outputText && (
                  <div className="space-y-2">
                    <Label className="terminal-text text-sm font-medium">
                      VISUAL TRANSMISSION
                    </Label>
                    <MorseVisualizer 
                      morse={outputText} 
                      isPlaying={isPlaying} 
                      progress={playProgress} 
                    />
                  </div>
                )}
                
                <div className="flex gap-3">
                  {outputText && (
                    <>
                      <Button
                        onClick={() => copyToClipboard(outputText)}
                        className="retro-button"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        COPY OUTPUT
                      </Button>
                      {mode === 'text-to-morse' && (
                        <Button
                          onClick={() => playMorseCode()}
                          disabled={isPlaying}
                          className="retro-button"
                          size="sm"
                        >
                          {isPlaying ? (
                            <>
                              <Square className="h-4 w-4 mr-2" />
                              TRANSMITTING {Math.round(playProgress * 100)}%
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              TRANSMIT
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telegraph Controls */}
          <Card className="retro-card">
            <CardHeader>
              <CardTitle className="neon-text flex items-center gap-3">
                <Signal className="h-5 w-5" />
                TELEGRAPH CONTROLS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="terminal-text text-sm font-medium">
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
                <div className="space-y-3">
                  <Label className="terminal-text text-sm font-medium">
                    TRANSMISSION SPEED: {speed[0]}x
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="auto-play"
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <Label htmlFor="auto-play" className="terminal-text text-sm font-medium">
                    AUTO-TRANSMIT ON INPUT
                  </Label>
                </div>
                
                {isPlaying && (
                  <Button
                    onClick={stopAudio}
                    className="retro-button bg-red-900 border-red-500 hover:bg-red-800"
                    size="sm"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    STOP TRANSMISSION
                  </Button>
                )}
              </div>

              {/* Telegraph Key Animation */}
              <div className="text-center">
                <Label className="terminal-text text-sm font-medium block mb-2">
                  TELEGRAPH KEY
                </Label>
                <TelegraphKey isPressed={isTransmitting} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Panel & Reference */}
        <div className="space-y-6">
          {/* Status Panel */}
          <Card className="retro-card">
            <CardHeader>
              <CardTitle className="neon-text text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                STATION STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LEDIndicator active={!!inputText} label="INPUT READY" />
              <LEDIndicator active={!!outputText} label="OUTPUT READY" />
              <LEDIndicator active={isPlaying} label="TRANSMITTING" />
              <LEDIndicator active={autoPlay} label="AUTO-TRANSMIT" />
              
              <Separator className="bg-green-500 opacity-30" />
              
              <div className="space-y-2">
                <div className="terminal-text text-xs">
                  FREQUENCY: <span className="text-green-300">{frequency[0]} Hz</span>
                </div>
                <div className="terminal-text text-xs">
                  SPEED: <span className="text-green-300">{speed[0]}x</span>
                </div>
                <div className="terminal-text text-xs">
                  MODE: <span className="text-green-300">{mode.toUpperCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="retro-card">
            <CardHeader>
              <CardTitle className="neon-text text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                MORSE CODE REFERENCE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <Separator className="bg-green-500 opacity-30" />
              
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}