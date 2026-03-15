import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const CommandCard = ({ command, viewMode = 'grid' }) => {
  const { id, category, command: cmdText, snippet, description } = command;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (viewMode === 'list') {
    return (
      <div className="command-card glass p-4 rounded-xl flex items-center gap-6 hover:translate-x-1 transition-all duration-300 relative group">
        <div className="flex-none w-24">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold">{category}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-sm truncate">{cmdText}</h3>
          <p className="text-secondary text-[11px] truncate">{description}</p>
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

        {copied && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce z-10">
            Copied!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="command-card glass p-5 rounded-2xl flex flex-col gap-4 hover:translate-y-[-4px] transition-all duration-300 relative">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-wider text-blue-400 font-bold">{category}</span>
          <h3 className="font-semibold text-text-primary leading-tight">{cmdText}</h3>
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
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <ExternalLink size={12} className="text-dim" />
        </div>
      </div>

      {copied && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default CommandCard;
