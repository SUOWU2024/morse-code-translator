// Morse code mapping
export const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

// Reverse mapping for decoding
export const REVERSE_MORSE_MAP: Record<string, string> = Object.entries(MORSE_CODE_MAP)
  .reduce((acc, [char, morse]) => {
    acc[morse] = char;
    return acc;
  }, {} as Record<string, string>);

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE_MAP[char] || char)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      return REVERSE_MORSE_MAP[code] || code;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isValidMorseCode(morse: string): boolean {
  const codes = morse.split(' ').filter(code => code !== '');
  return codes.every(code => 
    code === '/' || 
    REVERSE_MORSE_MAP[code] || 
    /^[.\-]+$/.test(code)
  );
}

export function getMorseTimings(morse: string): Array<{ type: 'dot' | 'dash' | 'pause' | 'space'; duration: number }> {
  const timings: Array<{ type: 'dot' | 'dash' | 'pause' | 'space'; duration: number }> = [];
  const dotDuration = 60; // milliseconds
  
  for (let i = 0; i < morse.length; i++) {
    const char = morse[i];
    
    if (char === '.') {
      timings.push({ type: 'dot', duration: dotDuration });
      if (i < morse.length - 1 && morse[i + 1] !== ' ') {
        timings.push({ type: 'pause', duration: dotDuration });
      }
    } else if (char === '-') {
      timings.push({ type: 'dash', duration: dotDuration * 3 });
      if (i < morse.length - 1 && morse[i + 1] !== ' ') {
        timings.push({ type: 'pause', duration: dotDuration });
      }
    } else if (char === ' ') {
      timings.push({ type: 'space', duration: dotDuration * 7 });
    }
  }
  
  return timings;
}

export function getMorseCharacterMapping(morse: string): Array<{ charIndex: number; timingIndices: number[] }> {
  const mapping: Array<{ charIndex: number; timingIndices: number[] }> = [];
  let timingIndex = 0;
  
  for (let charIndex = 0; charIndex < morse.length; charIndex++) {
    const char = morse[charIndex];
    const currentMapping = { charIndex, timingIndices: [] as number[] };
    
    if (char === '.') {
      currentMapping.timingIndices.push(timingIndex++);
      // Add pause timing if not at end and next char is not space
      if (charIndex < morse.length - 1 && morse[charIndex + 1] !== ' ') {
        currentMapping.timingIndices.push(timingIndex++);
      }
    } else if (char === '-') {
      currentMapping.timingIndices.push(timingIndex++);
      // Add pause timing if not at end and next char is not space
      if (charIndex < morse.length - 1 && morse[charIndex + 1] !== ' ') {
        currentMapping.timingIndices.push(timingIndex++);
      }
    } else if (char === ' ') {
      currentMapping.timingIndices.push(timingIndex++);
    }
    
    mapping.push(currentMapping);
  }
  
  return mapping;
}

export function getCurrentPlayingCharIndex(
  morse: string, 
  currentTimingIndex: number
): number {
  const mapping = getMorseCharacterMapping(morse);
  
  for (let i = mapping.length - 1; i >= 0; i--) {
    const { charIndex, timingIndices } = mapping[i];
    if (timingIndices.some(idx => idx <= currentTimingIndex)) {
      return charIndex;
    }
  }
  
  return -1;
}