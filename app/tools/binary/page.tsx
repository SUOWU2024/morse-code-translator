import { ToolLayout } from '@/components/tool-layout';
import { BinaryTranslator } from '@/components/binary-translator';
import { Toaster } from '@/components/ui/sonner';

export default function BinaryPage() {
  return (
    <ToolLayout
      title="Binary Translator"
      description="Convert text to binary code and vice versa with real-time conversion"
      category="Programming"
      relatedTools={[
        { name: "Morse Code", href: "/tools/morse-code", description: "Convert to Morse code" },
        { name: "Hex Converter", href: "/tools/hex", description: "Convert to hexadecimal" },
        { name: "ASCII Table", href: "/tools/ascii", description: "ASCII reference table" }
      ]}
      articles={[
        { 
          title: "Understanding Binary Numbers", 
          href: "/articles/binary-basics",
          excerpt: "Learn the fundamentals of binary number system and how computers use it.",
          readTime: "7 min read"
        },
        { 
          title: "Binary in Computer Science", 
          href: "/articles/binary-computer-science",
          excerpt: "Explore how binary forms the foundation of all digital computing.",
          readTime: "10 min read"
        }
      ]}
    >
      <BinaryTranslator />
      <Toaster />
    </ToolLayout>
  );
}