import React from 'react';

const SyntaxHighlighter = ({ code, className = '' }) => {
  return (
    <code 
      className={`font-mono select-all ${className}`}
      style={{ color: 'var(--text-code)', fontWeight: 400 }}
    >
      {code}
    </code>
  );
};

export default SyntaxHighlighter;
