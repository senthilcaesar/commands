import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

const CommandCard = ({ command, viewMode = 'grid', onOpen }) => {
  const { category, command: cmdText, snippet, description, link } = command;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clicking anywhere on the card (except its link or copy button) opens it large
  const openProps = {
    role: 'button',
    tabIndex: 0,
    'aria-label': `Open ${cmdText}`,
    onClick: () => onOpen?.(command),
    onKeyDown: (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpen?.(command);
      }
    },
  };
  const stop = (e) => e.stopPropagation();

  // Sits inside the code box, to the right of the snippet
  const copyButton = (
    <button
      onClick={handleCopy}
      className={`copy-btn p-1.5 transition-colors cursor-pointer flex-none ${copied ? 'is-copied' : 'text-dim'}`}
      title={copied ? 'Copied!' : 'Copy snippet'}
      aria-label={copied ? 'Copied' : 'Copy snippet'}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );

  // --- List View Layout ---
  if (viewMode === 'list') {
    return (
      <div {...openProps} className="command-card command-card-list cursor-pointer glass p-4 rounded-xl flex items-center gap-6 relative group border border-[var(--border-subtle)]">
        <div className="flex-none w-24">
          <span className="category-tag" data-cat={category}>{category}</span>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={stop}
              className="cmd-link font-semibold text-orange hover:text-orange-dark text-sm truncate block transition-colors w-fit" 
              style={{ textDecoration: 'none' }}
            >
              {cmdText}
            </a>
          ) : (
            <h3 className="font-semibold text-text-primary text-sm truncate">{cmdText}</h3>
          )}
          <p className="text-secondary text-[11px] truncate mt-0.5">{description}</p>
        </div>

        <div 
          className={`code-box ${copied ? 'just-copied' : ''} flex items-center gap-2 rounded-lg pl-3 pr-1 py-1 border border-[var(--border-subtle)] bg-code`}
          style={{ backgroundColor: 'var(--bg-code)' }}
        >
          <SyntaxHighlighter code={snippet} className="text-[11px] min-w-0" />
          {copyButton}
          {copied && <span className='copied-note' aria-hidden='true'>copied!</span>}
        </div>
      </div>
    );
  }

  // --- Grid View Layout ---
  return (
    <div {...openProps} className="command-card cursor-pointer glass p-5 rounded-2xl flex flex-col gap-4 hover:translate-y-[-2px] transition-all duration-300 relative border border-[var(--border-subtle)] hover:border-blue-500/30 shadow-md hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1 flex-1 min-w-0 pr-2">
          <span className="category-tag" data-cat={category}>{category}</span>
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={stop}
              className="cmd-link font-semibold text-orange hover:text-orange-dark leading-tight transition-colors block w-fit" 
              style={{ textDecoration: 'none' }}
            >
              {cmdText}
            </a>
          ) : (
            <h3 className="font-semibold text-text-primary leading-tight">{cmdText}</h3>
          )}
        </div>
      </div>

      <p className="text-secondary text-xs leading-relaxed line-clamp-2">
        {description}
      </p>

      <div 
        className={`snippet-block code-box ${copied ? 'just-copied' : ''} flex items-start gap-2 rounded-xl py-3 pl-4 pr-2 border border-[var(--border-subtle)] relative bg-code`}
        style={{ backgroundColor: 'var(--bg-code)' }}
      >
        <SyntaxHighlighter code={snippet} className="text-xs break-all flex-1 min-w-0 pt-1" />
        {copyButton}
          {copied && <span className='copied-note' aria-hidden='true'>copied!</span>}
      </div>
    </div>
  );
};

export default CommandCard;
