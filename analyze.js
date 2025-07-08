const fs = require('fs');

// Read the SEO content file
const content = fs.readFileSync('./components/seo-content.tsx', 'utf8');

// Extract English text content
let englishText = '';

// Extract content from the en section
const enMatch = content.match(/en:\s*{[\s\S]*?},\s*cn:/);
if (enMatch) {
  const enSection = enMatch[0];
  
  // Extract all quoted strings (titles, content, etc.)
  const quotedStrings = enSection.match(/['"`]([^'"`]*?)['"`]/g) || [];
  
  quotedStrings.forEach(str => {
    // Remove quotes and clean up
    const cleaned = str.replace(/['"`]/g, '').replace(/\\n/g, ' ');
    englishText += ' ' + cleaned;
  });
}

// Clean up the text
englishText = englishText
  .replace(/\s+/g, ' ')
  .trim();

// Count words
const words = englishText.split(' ').filter(word => word.length > 1);
const totalWords = words.length;

// Count "morse code translator" occurrences
const keywordMatches = englishText.toLowerCase().match(/morse code translator/g) || [];
const keywordCount = keywordMatches.length;

// Calculate keyword density
const keywordDensity = ((keywordCount / totalWords) * 100).toFixed(2);

console.log('=== SEO Content Analysis ===');
console.log('Total words:', totalWords);
console.log('"morse code translator" occurrences:', keywordCount);
console.log('Keyword density:', keywordDensity + '%');
console.log('');

if (totalWords < 1500) {
  console.log('⚠️  Word count is below target (1500 words)');
  console.log('   Need to add approximately', 1500 - totalWords, 'more words');
}

if (parseFloat(keywordDensity) < 3.0 || parseFloat(keywordDensity) > 4.0) {
  console.log('⚠️  Keyword density is outside target range (3-4%)');
  if (parseFloat(keywordDensity) < 3.0) {
    const neededOccurrences = Math.ceil((totalWords * 0.03) - keywordCount);
    console.log('   Need approximately', neededOccurrences, 'more "morse code translator" mentions');
  } else {
    const excessOccurrences = keywordCount - Math.floor(totalWords * 0.04);
    console.log('   Need to reduce "morse code translator" mentions by approximately', excessOccurrences);
  }
}

console.log('');
console.log('Sample text (first 200 chars):');
console.log(englishText.substring(0, 200) + '...');
