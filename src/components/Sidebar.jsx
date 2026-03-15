import React from 'react';
import { Terminal, Box, Globe, Github, Package, Cpu, Layers, Bookmark, X } from 'lucide-react';

const Sidebar = ({ activeCategory, setActiveCategory, setSearchQuery, isOpen, onClose }) => {
  const categories = [
    { id: 'all', label: 'All Commands', icon: <Box size={18} /> },
    { id: 'linux', label: 'Linux/Bash', icon: <Terminal size={18} /> },
    { id: 'git', label: 'GitHub/Git', icon: <Github size={18} /> },
    { id: 'npm', label: 'npm/Node', icon: <Package size={18} /> },
    { id: 'cloud', label: 'Cloud & CLI', icon: <Globe size={18} /> },
    { id: 'build', label: 'Build & CI', icon: <Cpu size={18} /> },
    { id: 'claude', label: 'Claude Code', icon: <Layers size={18} /> },
  ];

  return (
    <aside className={`sidebar overflow-y-auto ${isOpen ? 'open' : ''}`}>
      <div className="flex items-center justify-between px-6 py-8">
        <button 
          className="cursor-pointer group border-none bg-transparent flex items-center"
          onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
            if (window.innerWidth <= 768) onClose();
          }}
          title="Go to Home"
        >
          <div className="flex items-center gap-2 group-hover:translate-x-0.5 transition-transform duration-300">
            <Bookmark className="text-blue-500 flex-shrink-0" size={24} strokeWidth={2.5} />
            <span className="gradient-text text-xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300">CommandCentral</span>
          </div>
        </button>
        

      </div>
      
      <nav className="sidebar-nav px-4">
        <p className="text-[10px] uppercase tracking-widest text-dim font-bold mb-4 px-2">Library</p>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-blue-500/10 text-white font-medium' 
                    : 'text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={activeCategory === cat.id ? 'text-blue-400' : 'text-dim'}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
