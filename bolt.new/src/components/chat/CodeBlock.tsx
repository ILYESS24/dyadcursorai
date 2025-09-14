import { useState } from 'react';
// @ts-expect-error types missing
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-expect-error types missing
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../lib/stores/theme';

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const theme = useStore(themeStore);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const style = theme === 'dark' ? vscDarkPlus : vs;

  return (
    <div className="relative group">
      <div className="flex justify-between items-center bg-bolt-elements-background-depth-1 px-3 py-2 border-b border-bolt-elements-borderColor">
        <span className="text-sm text-bolt-elements-textSecondary">{language}</span>
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary"
        >
          {copied ? (
            <div className="i-ph:check text-sm" />
          ) : (
            <div className="i-ph:copy text-sm" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={{
          margin: 0,
          background: 'transparent',
          fontSize: '14px',
        }}
        showLineNumbers
        wrapLines
        wrapLongLines
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
