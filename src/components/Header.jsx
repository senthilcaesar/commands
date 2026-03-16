import React, { useEffect } from 'react';
import { Search, Command, LayoutGrid, List, Layers, X, Menu } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, theme, toggleTheme, onToggleTechStack, viewMode, setViewMode, onToggleSidebar, isSidebarOpen }) => {
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
    <header className="h-header border-b px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-sidebar/80 backdrop-blur-md z-50 gap-3 sm:gap-4">
      <button 
        onClick={onToggleSidebar}
        className="sidebar-toggle-btn"
        title="Toggle Sidebar"
      >
        <span className={`toggle-icon ${!isSidebarOpen ? 'rotate-180' : ''}`}>‹</span>
      </button>

      <div className="flex-1 min-w-0 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none" size={18} />
        <input 
          id="global-search"
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 border rounded-xl py-2.5 pl-10 pr-12 text-sm text-primary placeholder-dim focus:outline-none focus:border-accent-primary/50 transition-all theme-text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors group z-10 flex items-center justify-center text-dim hover:text-primary"
            title="Clear search"
          >
            <X size={14} className="transition-colors" />
          </button>
        ) : (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border pointer-events-none border-white/10">
            <Command size={10} className="text-dim" />
            <span className="text-[10px] font-medium text-dim uppercase">K</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
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
            className={`relative z-10 p-2 px-2.5 sm:px-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${viewMode === 'grid' ? 'text-white' : 'text-dim hover:text-white'}`}
            title="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`relative z-10 p-2 px-2.5 sm:px-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${viewMode === 'list' ? 'text-white' : 'text-dim hover:text-white'}`}
            title="List View"
          >
            <List size={16} />
          </button>
        </div>

        <button 
          onClick={onToggleTechStack}
          className="group relative flex items-center justify-center px-3 sm:px-4 h-10 rounded-xl glass border border-white/10 btn-hover-premium theme-text"
          title="Technology Stack"
        >
          <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          <span className="text-[10px] font-bold tracking-tight text-secondary group-hover:text-accent-primary transition-colors duration-300 relative z-10">
            Tech Stack
          </span>
        </button>
 
        <button 
          onClick={toggleTheme}
          className="p-2.5 glass rounded-xl text-lg sm:text-xl toggle-hover-premium flex-shrink-0"
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
