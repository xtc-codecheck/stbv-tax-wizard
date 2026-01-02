/**
 * Artikel-Inhalt Komponente
 * @module components/blog/ArticleContent
 */

import type { ArticleContentProps } from '@/types/blog';

/**
 * Konvertiert einfaches Markdown zu HTML
 */
const parseMarkdown = (content: string): string => {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // Line breaks
    .replace(/\n/g, '<br />')
    // Wrap lists
    .replace(/(<li.*<\/li>)+/g, '<ul class="list-disc list-inside space-y-1 mb-4">$&</ul>');
};

export const ArticleContent = ({ content }: ArticleContentProps) => {
  const htmlContent = parseMarkdown(content);

  return (
    <article 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${htmlContent}</p>` }}
    />
  );
};
