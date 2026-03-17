import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TechStackModal from './components/TechStackModal';
import CommandCard from './components/CommandCard';
import { Terminal as TerminalIcon } from 'lucide-react';

const DATA = [
  { id: 1, category: 'claude', link: 'https://code.claude.com/docs/en/mcp', command: 'List mcp servers', snippet: 'claude mcp list', description: 'Displays all MCP (Model Context Protocol) servers currently configured (~/.claude.json) in Claude Code.' },
  { id: 9, category: 'claude', link: 'https://ollama.com/library/glm-4.7', command: 'GLM-4.7', snippet: 'ollama launch claude --model glm-4.7:cloud', description: 'Launch Claude Code using GLM-4.7 model hosted in the cloud via Ollama.' },
  { id: 13, category: 'claude', link: 'https://ollama.com/library/qwen3-coder', command: 'qwen3-coder', snippet: 'ollama launch claude --model qwen3-coder:480b-cloud', description: 'Launch Claude Code using qwen3-coder model hosted in the cloud via Ollama.' },
  { id: 2, category: 'linux', link: '', command: 'find and delete', snippet: 'find . -name "*.log" -type f -delete', description: 'Recursively search for and delete all .log files in the current directory and subdirectories.' },
  { id: 3, category: 'git', link: '', command: 'undo last commit', snippet: 'git reset --soft HEAD~1', description: 'Revert the most recent commit while keeping the changes staged in your local workspace.' },
  { id: 4, category: 'npm', link: '', command: 'clean install', snippet: 'rm -rf node_modules && npm install', description: 'Reliably refresh project dependencies by deleting the modules folder and reinstalling.' },
  { id: 5, category: 'cloud', link: '', command: 'gemini generate', snippet: 'gemini generate "Explain quantum computing"', description: 'Generate a text response using the Gemini AI CLI for a specific prompt.' },
  { id: 6, category: 'build', link: '', command: 'github action bypass', snippet: 'git commit -m "update [skip ci]"', description: 'Prevent a GitHub Action workflow from triggering for a specific commit.' },
  { id: 7, category: 'linux', link: '', command: 'search process by port', snippet: 'lsof -i :8080', description: 'Identity which process is currently listening on port 8080.' },
  { id: 8, category: 'git', link: '', command: 'squash commits', snippet: 'git rebase -i HEAD~3', description: 'Interactively combine the last three commits into a single, cleaner commit.' },
  { id: 10, category: 'npm', link: '', command: 'check for updates', snippet: 'npm outdated', description: 'List all locally installed packages that have newer versions available on the registry.' },
  { id: 11, category: 'build', link: '', command: 'docker prune', snippet: 'docker system prune -a --volumes', description: 'Remove all unused containers, networks, images, and volumes to free up disk space.' },
  { id: 12, category: 'linux', link: '', command: 'watch command', snippet: 'watch -n 1 "ls -lh"', description: 'Execute a command repeatedly at regular intervals and show the output in real-time.' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [theme, setTheme] = useState('light');
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => localStorage.getItem('sidebar') !== 'collapsed');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem('sidebar', isSidebarOpen ? 'open' : 'collapsed');
  }, [isSidebarOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const filteredCommands = useMemo(() => {
    return DATA.filter((cmd) => {
      const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
      const matchesSearch = cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cmd.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={`app-container flex min-h-screen ${!isSidebarOpen ? 'sidebar-collapsed' : 'sidebar-open'}`}>
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        setSearchQuery={setSearchQuery}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[150] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main 
        className="flex-1 min-h-screen bg-main relative flex flex-col"
        onClick={() => {
          if (isSidebarOpen && window.innerWidth <= 768) {
            setIsSidebarOpen(false);
          }
        }}
      >
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleTechStack={() => setIsTechStackOpen(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        
        <div className="content-area p-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeCategory === 'all' ? 'All Commands' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Commands`}
                </h2>
                <p className="text-dim text-sm">Showing {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} in your vault.</p>
              </div>
            </div>

            {filteredCommands.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-4"
              }>
                {filteredCommands.map((cmd) => (
                  <CommandCard 
                    key={cmd.id}
                    command={cmd}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state flex flex-col items-center justify-center py-32 text-center">
                <div className="p-6 rounded-full bg-white/5 border border-white/5 mb-6">
                  <TerminalIcon size={48} className="text-dim opacity-20" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No commands found</h3>
                <p className="text-dim max-w-xs mx-auto text-sm leading-relaxed">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                  className="mt-6 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        <TechStackModal 
          isOpen={isTechStackOpen} 
          onClose={() => setIsTechStackOpen(false)} 
        />
      </main>
    </div>
  );
}

export default App;
