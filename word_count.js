
const fs = require('fs');
const content = fs.readFileSync('./components/seo-content.tsx', 'utf8');

// Extract text content manually
const lines = content.split('
');
let extractedText = '';
let inEnglishSection = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('en: {')) {
    inEnglishSection = true;
    continue;
  }
  
  if (inEnglishSection && line.includes('cn: {')) {
    break;
  }
  
  if (inEnglishSection) {
    // Extract text content from title, content fields
    if (line.includes('title:') || line.includes('content:') || line.includes('mainTitle:') || line.includes('subtitle:') || line.includes('description:')) {
      const textMatch = line.match(/['\`]([^'\`]*)['\`]/);
      if (textMatch) {
        extractedText += ' ' + textMatch[1];
      }
    }
  }
}

// Clean up the text
extractedText = extractedText
  .replace(/\n/g, ' ')
  .replace(/[^a-zA-Z\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// Count words
const words = extractedText.split(' ').filter(word => word.length > 2);
const totalWords = words.length;

// Count keyword
const keywordMatches = extractedText.toLowerCase().match(/morse code translator/g) || [];
const keywordCount = keywordMatches.length;

// Calculate density
const keywordDensity = ((keywordCount / totalWords) * 100).toFixed(2);

console.log('=== Content Analysis ===');
console.log('Total words:', totalWords);
console.log('Morse code translator occurrences:', keywordCount);
console.log('Keyword density:', keywordDensity + '%');
console.log('Sample text:', extractedText.substring(0, 200) + '...');

