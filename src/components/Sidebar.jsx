import React from 'react';
import { Terminal, Box, Globe, Github, Package, Cpu, Layers, Info } from 'lucide-react';

const Sidebar = ({ activeCategory, setActiveCategory, onGoHome, isOpen, onClose, onToggle, onOpenTechStack, categoryCounts = {} }) => {
  const categories = [
    { id: 'all', label: 'All Commands', icon: <Box size={18} /> },
    { id: 'claude', label: 'Claude Code', icon: <Layers size={18} /> },
    { id: 'build', label: 'Build & CI', icon: <Cpu size={18} /> },
    { id: 'cloud', label: 'Cloud & CLI', icon: <Globe size={18} /> },
    { id: 'git', label: 'GitHub/Git', icon: <Github size={18} /> },
    { id: 'linux', label: 'Linux/Bash', icon: <Terminal size={18} /> },
    { id: 'npm', label: 'npm/Node', icon: <Package size={18} /> },
  ];

  return (
    <aside className={`sidebar overflow-y-auto ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-top flex items-center justify-between gap-2 px-6 py-8">
        <button 
          className="sidebar-brand cursor-pointer group border-none bg-transparent flex items-center"
          onClick={() => {
            onGoHome();
            if (window.innerWidth <= 768) onClose();
          }}
          title="Go to Home"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 group-hover:translate-x-0.5 transition-transform duration-300">
            <div className="flex flex-col items-start leading-none gap-0">
              <span className="brand-title whitespace-nowrap overflow-hidden transition-all duration-300 tracking-tight">Commands</span>
            </div>
          </div>
        </button>
        <button
          onClick={onToggle}
          className="sidebar-toggle-btn"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className={`toggle-icon ${!isOpen ? 'rotate-180' : ''}`}>‹</span>
        </button>
      </div>
      
      <nav className="sidebar-nav px-4">
        <p className="sidebar-label px-2">Library</p>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <li key={cat.id}>
                <button
                  title={cat.label}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (window.innerWidth <= 768) onClose();
                  }}
                  className={`sidebar-item ${activeCategory === cat.id ? 'is-active' : ''} w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-blue-500/10 text-white font-medium' 
                      : 'text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeCategory === cat.id ? 'text-blue-400' : 'text-dim'}>
                      {cat.icon}
                    </span>
                    <span className="sidebar-text">{cat.label}</span>
                  </div>
                  <span
                    className={`count-badge text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-white/5 text-dim border border-white/5'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Phones only: the header has no room for the Tech Stack button there */}
        <div className="sidebar-extra">
          <button
            className="sidebar-item w-full flex items-center gap-3 px-3 py-2.5 text-secondary"
            onClick={() => {
              onClose();
              onOpenTechStack();
            }}
          >
            <span className="text-dim"><Info size={18} /></span>
            <span className="sidebar-text">Tech Stack</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
