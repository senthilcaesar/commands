import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CommandCard = ({ command, viewMode = 'grid' }) => {
  const { id, category, command: cmdText, snippet, description, link } = command;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (viewMode === 'list') {
    return (
      <div className="command-card glass list-card-hover p-4 rounded-xl flex items-center gap-6 relative group">
        <div className="flex-none w-24">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold">{category}</span>
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange hover:text-orange-dark text-sm truncate block transition-colors w-fit" style={{ textDecoration: 'none' }}>{cmdText}</a>
          ) : (
            <h3 className="font-semibold text-text-primary text-sm truncate">{cmdText}</h3>
          )}
          <p className="text-secondary text-[11px] truncate mt-0.5">{description}</p>
        </div>

        <div className="flex-none bg-code rounded-lg px-3 py-1.5 border border-white/5 max-w-[30%] overflow-hidden">
          <code className="text-[10px] text-code break-all select-all font-mono italic">{snippet}</code>
        </div>

        <button 
          onClick={handleCopy}
          className={`flex-none p-2 rounded-lg transition-all ${copied ? 'bg-green-500/10 text-green-400' : 'text-dim hover:text-white hover:bg-white/5'}`}
          title="Copy snippet"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>


      </div>
    );
  }

  return (
    <div className="command-card glass p-5 rounded-2xl flex flex-col gap-4 hover:translate-y-[-4px] transition-all duration-300 relative">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold">{category}</span>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange hover:text-orange-dark leading-tight transition-colors block w-fit" style={{ textDecoration: 'none' }}>{cmdText}</a>
          ) : (
            <h3 className="font-semibold text-text-primary leading-tight">{cmdText}</h3>
          )}
        </div>
        <button 
          onClick={handleCopy}
          className={`p-2 rounded-lg ${copied ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-dim hover:text-white hover:bg-white/10'}`}
          title="Copy snippet"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <p className="text-secondary text-xs leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="snippet-block bg-code rounded-xl p-4 border border-white/5 relative group">
        <code className="text-xs text-code break-all select-all">{snippet}</code>
      </div>


    </div>
  );
};

export default CommandCard;
