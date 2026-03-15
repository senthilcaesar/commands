import React, { useEffect } from 'react';
import { Search, Command, Cpu, LayoutGrid, List, Layers, X } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, theme, toggleTheme, onToggleTechStack, viewMode, setViewMode }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search').focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-header border-b px-8 flex items-center justify-between sticky top-0 bg-sidebar/80 backdrop-blur-md z-50">
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
        <input 
          id="global-search"
          type="text"
          placeholder="Search commands (Cmd+K)..."
          className="w-full bg-white/5 border rounded-xl py-2.5 pl-12 pr-12 text-sm text-white placeholder-dim focus:outline-none focus:border-accent-primary/50 transition-all theme-text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors group z-10"
            title="Clear search"
          >
            <X size={14} className="text-dim group-hover:text-primary transition-colors" />
          </button>
        ) : (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border pointer-events-none">
            <Command size={10} className="text-dim" />
            <span className="text-[10px] font-medium text-dim uppercase">K</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Industry Standard View Toggle */}
        <div className="flex items-center glass rounded-xl p-1 relative bg-black/5 dark:bg-white/5 border border-white/5">
          <div 
            className="absolute h-[calc(100%-8px)] rounded-lg bg-accent-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm"
            style={{ 
              left: viewMode === 'grid' ? '4px' : 'calc(50% + 2px)',
              width: 'calc(50% - 6px)',
              zIndex: 0
            }}
          />
          <button 
            onClick={() => setViewMode('grid')}
            className={`relative z-10 p-2 px-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${viewMode === 'grid' ? 'text-white' : 'text-dim hover:text-white'}`}
            title="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`relative z-10 p-2 px-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${viewMode === 'list' ? 'text-white' : 'text-dim hover:text-white'}`}
            title="List View"
          >
            <List size={16} />
          </button>
        </div>

        <button 
          onClick={onToggleTechStack}
          className="group relative flex items-center px-4 h-9 rounded-full glass border border-white/10 btn-hover-premium theme-text"
          title="Technology Stack"
        >
          <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          <span className="text-[10px] font-bold tracking-tight text-secondary group-hover:text-accent-primary transition-colors duration-300 relative z-10">
            Tech Stack
          </span>
        </button>
 
        <button 
          onClick={toggleTheme}
          className="p-2.5 glass rounded-xl text-xl toggle-hover-premium"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="inline-block transition-transform duration-300">
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
