import React from 'react';
import { X, Cpu, Layers, Palette, Terminal, Zap, Search, Github, Code } from 'lucide-react';

const TechStackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const techStack = [
    {
      name: 'React 19',
      description: 'The latest core framework for high-performance UI components.',
      icon: <Layers size={20} className="text-blue-500" />
    },
    {
      name: 'Vite 8',
      description: 'Ultra-fast build engine providing instant HMR and speed.',
      icon: <Zap size={20} className="text-yellow-500" />
    },
    {
      name: 'Lucide React',
      description: 'Comprehensive icon library for pixel-perfect aesthetics.',
      icon: <Palette size={20} className="text-pink-500" />
    },
    {
      name: 'Vanilla CSS',
      description: 'Custom design system built with performance in mind.',
      icon: <Code size={20} className="text-green-500" />
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content p-6 rounded-2xl relative shadow-2xl border border-white/10" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors theme-text z-50"
          title="Close"
        >
          <X size={20} />
        </button>

        <p className="text-secondary text-sm mb-6 font-medium tracking-wide">
          This app is built using the following technologies:
        </p>
 
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-item group bg-white/5 border border-white/10 hover:border-accent-primary/50">
              <div className="p-3 rounded-lg bg-main border border-white/5 group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-0.5 theme-text">{tech.name}</h3>
                <p className="text-dim text-[11px] leading-relaxed">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;
