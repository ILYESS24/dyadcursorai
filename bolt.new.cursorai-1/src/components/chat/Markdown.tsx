import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import CodeBlock from './CodeBlock';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        // @ts-expect-error react-markdown types are permissive
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          ) : (
            <code className="bg-bolt-elements-background-depth-1 px-1 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <div className="my-4">{children}</div>;
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-2">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-2">{children}</ol>;
        },
        li({ children }) {
          return <li className="mb-1">{children}</li>;
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mb-3">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mb-2">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-bold mb-2">{children}</h3>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-bolt-elements-borderColor pl-4 italic mb-2">
              {children}
            </blockquote>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bolt-elements-item-contentAccent hover:underline"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
