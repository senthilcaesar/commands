import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

const CommandCard = ({ command, viewMode = 'grid' }) => {
  const { id, category, command: cmdText, snippet, description, link } = command;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- List View Layout ---
  if (viewMode === 'list') {
    return (
      <div className="command-card command-card-list glass p-4 rounded-xl flex items-center gap-6 relative group border border-[var(--border-subtle)]">
        <div className="flex-none w-24">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold uppercase">{category}</span>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-orange hover:text-orange-dark text-sm truncate block transition-colors w-fit" 
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
          className="flex-none rounded-lg px-3 py-1.5 border border-[var(--border-subtle)] max-w-[35%] overflow-hidden bg-code"
          style={{ backgroundColor: 'var(--bg-code)' }}
        >
          <SyntaxHighlighter code={snippet} className="text-[11px]" />
        </div>

        <button 
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all cursor-pointer flex-none ${copied ? 'bg-green-500/10 text-green-400' : 'text-dim hover:text-white hover:bg-white/5'}`}
          title="Copy snippet"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    );
  }

  // --- Grid View Layout ---
  return (
    <div className="command-card glass p-5 rounded-2xl flex flex-col gap-4 hover:translate-y-[-2px] transition-all duration-300 relative border border-[var(--border-subtle)] hover:border-blue-500/30 shadow-md hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1 flex-1 min-w-0 pr-2">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold uppercase">{category}</span>
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-orange hover:text-orange-dark leading-tight transition-colors block w-fit" 
              style={{ textDecoration: 'none' }}
            >
              {cmdText}
            </a>
          ) : (
            <h3 className="font-semibold text-text-primary leading-tight">{cmdText}</h3>
          )}
        </div>
        <button 
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-colors cursor-pointer flex-shrink-0 ${copied ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-dim hover:text-white hover:bg-white/10'}`}
          title="Copy snippet"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <p className="text-secondary text-xs leading-relaxed line-clamp-2">
        {description}
      </p>

      <div 
        className="snippet-block rounded-xl p-4 border border-[var(--border-subtle)] relative bg-code"
        style={{ backgroundColor: 'var(--bg-code)' }}
      >
        <SyntaxHighlighter code={snippet} className="text-xs break-all" />
      </div>
    </div>
  );
};

export default CommandCard;
