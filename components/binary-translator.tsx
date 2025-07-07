'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  RotateCcw, 
  ArrowUpDown,
  Binary,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

function textToBinary(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function binaryToText(binary: string): string {
  try {
    return binary
      .split(' ')
      .filter(bin => bin.length === 8)
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  } catch (error) {
    return 'INVALID BINARY FORMAT';
  }
}

function isValidBinary(binary: string): boolean {
  const codes = binary.split(' ').filter(code => code !== '');
  return codes.every(code => /^[01]{8}$/.test(code));
}

export function BinaryTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');

  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'text-to-binary') {
        setOutputText(textToBinary(inputText));
      } else {
        if (!isValidBinary(inputText)) {
          setOutputText('INVALID BINARY FORMAT');
          return;
        }
        setOutputText(binaryToText(inputText));
      }
    } catch (error) {
      setOutputText('CONVERSION ERROR');
    }
  }, [inputText, mode]);

  const toggleMode = () => {
    const newMode = mode === 'text-to-binary' ? 'binary-to-text' : 'text-to-binary';
    setMode(newMode);
    
    // Swap input and output
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="space-y-8">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Binary className="h-7 w-7 text-blue-600" />
              Binary Translator
            </CardTitle>
            <Button onClick={toggleMode} variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Switch Mode
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {mode === 'text-to-binary' ? 'TEXT → BINARY' : 'BINARY → TEXT'}
            </Badge>
            <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              {mode === 'text-to-binary' ? 'Input Text' : 'Binary Input (8-bit format)'}
            </Label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === 'text-to-binary' 
                  ? 'Enter your text here...' 
                  : 'Enter binary code (e.g., 01001000 01100101 01101100 01101100 01101111)...'
              }
              className="min-h-[120px] font-mono"
            />
            <div className="flex gap-3">
              <Button onClick={clearAll} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              {inputText && (
                <Button
                  onClick={() => copyToClipboard(inputText)}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Input
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              {mode === 'text-to-binary' ? 'Binary Output' : 'Decoded Text'}
            </Label>
            <Textarea
              value={outputText}
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[120px] font-mono bg-gray-50"
            />
            
            {outputText && (
              <div className="flex gap-3">
                <Button
                  onClick={() => copyToClipboard(outputText)}
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Output
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Binary Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Activity className="h-5 w-5" />
            Binary Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Common Characters:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {[
                ['A', '01000001'], ['B', '01000010'], ['C', '01000011'], ['D', '01000100'],
                ['E', '01000101'], ['F', '01000110'], ['G', '01000111'], ['H', '01001000'],
                ['I', '01001001'], ['J', '01001010'], ['K', '01001011'], ['L', '01001100'],
                ['M', '01001101'], ['N', '01001110'], ['O', '01001111'], ['P', '01010000']
              ].map(([char, binary]) => (
                <div key={char} className="flex justify-between items-center p-2 rounded bg-blue-50 border border-blue-100">
                  <span className="font-mono font-bold text-blue-800">{char}</span>
                  <code className="font-mono text-xs text-blue-600">{binary}</code>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2 text-sm text-gray-600">
            <h4 className="font-medium text-gray-900">How Binary Works:</h4>
            <ul className="space-y-1 ml-4">
              <li>• Each character is represented by 8 bits (1 byte)</li>
              <li>• Each bit can be either 0 or 1</li>
              <li>• ASCII values are converted to binary representation</li>
              <li>• Binary format: 8-bit groups separated by spaces</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}