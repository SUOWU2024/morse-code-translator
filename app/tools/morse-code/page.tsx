import MorseTranslator from '@/components/morse-translator';
import { ToolLayout } from '@/components/tool-layout';
import { Toaster } from '@/components/ui/sonner';

export default function MorseCodePage() {
  return (
    <ToolLayout
      title="Morse Code Translator"
      description="Convert text to Morse code and vice versa with audio playback and visual feedback"
      category="Communication"
      relatedTools={[
        { name: "Binary Translator", href: "/tools/binary", description: "Convert text to binary" },
        { name: "Hex Converter", href: "/tools/hex", description: "Convert text to hexadecimal" },
        { name: "Base64 Encoder", href: "/tools/base64", description: "Encode/decode Base64" }
      ]}
      articles={[
        { 
          title: "History of Morse Code", 
          href: "/articles/morse-code-history",
          excerpt: "Learn about Samuel Morse and the development of this revolutionary communication system.",
          readTime: "5 min read"
        },
        { 
          title: "Learning Morse Code: A Beginner's Guide", 
          href: "/articles/learning-morse-code",
          excerpt: "Step-by-step guide to mastering Morse code for amateur radio and emergency communication.",
          readTime: "8 min read"
        },
        { 
          title: "Morse Code in Modern Times", 
          href: "/articles/morse-code-modern",
          excerpt: "How Morse code is still used today in aviation, maritime, and emergency services.",
          readTime: "6 min read"
        }
      ]}
    >
      <MorseTranslator />
      <Toaster />
    </ToolLayout>
  );
}