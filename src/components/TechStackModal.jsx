import React from 'react';
import { X, Layers, Palette, Zap, Github, Code, Type } from 'lucide-react';

// Bento layout: each tile's `size` sets how much of the grid it takes.
//   hero = 2 columns x 2 rows, wide = 2 columns, small = 1 column
const techStack = [
  {
    name: 'React 19',
    description: 'The latest core framework for high-performance UI components.',
    icon: Layers,
    size: 'hero',
  },
  {
    name: 'Vite 8',
    description: 'Ultra-fast build engine providing instant HMR and speed.',
    icon: Zap,
    size: 'wide',
  },
  {
    name: 'Lucide React',
    description: 'Comprehensive icon library for pixel-perfect aesthetics.',
    icon: Palette,
    size: 'small',
  },
  {
    name: 'GitHub Pages',
    description: 'Deployed automatically by GitHub Actions on every push to main.',
    icon: Github,
    size: 'small',
  },
  {
    name: 'Vanilla CSS',
    description: 'Hand-drawn pencil theme with paper texture, built in plain CSS.',
    icon: Code,
    size: 'wide',
    preview: <div className='bento-hatch' aria-hidden='true' />,
  },
  {
    name: 'Google Fonts',
    description: 'Caveat for titles, Patrick Hand for text and JetBrains Mono for commands.',
    icon: Type,
    size: 'wide',
    preview: (
      <div className='bento-fonts' aria-hidden='true'>
        <span style={{ fontFamily: 'var(--font-title)' }}>Aa</span>
        <span style={{ fontFamily: 'var(--font-hand)' }}>Aa</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>Aa</span>
      </div>
    ),
  },
];

const TechStackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content tech-modal p-6 relative'
        role='dialog'
        aria-label='Technology stack'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='bento-close absolute top-4 right-4 p-2 rounded-full transition-colors z-50'
          title='Close'
        >
          <X size={20} />
        </button>

        <h2 className='bento-title'>Built with</h2>

        <div className='bento'>
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.name} className={`bento-tile bento-${tech.size}`}>
                <Icon size={tech.size === 'hero' ? 34 : 20} strokeWidth={1.6} />
                <div className='bento-body'>
                  <h3>{tech.name}</h3>
                  <p>{tech.description}</p>
                </div>
                {tech.preview}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;
