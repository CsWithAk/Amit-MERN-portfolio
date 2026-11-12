import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Render admin-authored Markdown without allowing raw HTML injection. */
export default function MarkdownContent({ children, className = '' }) {
  if (!children) return null;

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {String(children)}
      </ReactMarkdown>
    </div>
  );
}
