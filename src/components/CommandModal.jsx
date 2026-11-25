import React, { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

// Enlarged view of one command card, opened by clicking the card
const CommandModal = ({ command, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!command) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [command, onClose]);

  if (!command) return null;

  const { category, command: cmdText, snippet, description, link } = command;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content command-modal p-8 relative'
        role='dialog'
        aria-modal='true'
        aria-label={cmdText}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='bento-close absolute top-4 right-4 p-2 rounded-full transition-colors z-50'
          title='Close'
          aria-label='Close'
          autoFocus
        >
          <X size={20} />
        </button>

        <span className='category-tag' data-cat={category}>
          {category}
        </span>

        <h2 className='command-modal-title'>{cmdText}</h2>

        <p className='command-modal-desc'>{description}</p>

        <div
          className={`snippet-block code-box ${copied ? 'just-copied' : ''} command-modal-code`}
        >
          <SyntaxHighlighter code={snippet} className='break-all flex-1 min-w-0' />
          <button
            onClick={handleCopy}
            className={`copy-btn p-2 transition-colors cursor-pointer flex-none ${copied ? 'is-copied' : 'text-dim'}`}
            title={copied ? 'Copied!' : 'Copy snippet'}
            aria-label={copied ? 'Copied' : 'Copy snippet'}
          >
            {copied ? <Check size={22} /> : <Copy size={22} />}
          </button>
          {copied && (
            <span className='copied-note' aria-hidden='true'>
              copied!
            </span>
          )}
        </div>

        {link && (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='cmd-link command-modal-link'
            style={{ textDecoration: 'none' }}
          >
            Open docs <ExternalLink size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default CommandModal;
