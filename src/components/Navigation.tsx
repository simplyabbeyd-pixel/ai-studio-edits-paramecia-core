import React from 'react';
import { Compass, Globe, Trees, PawPrint, Heart, FileText, Terminal, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export type ActiveTab = 'atlas' | 'accords' | 'regions' | 'kin' | 'recovery' | 'registries' | 'codex';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDropPoint?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'atlas', label: 'Living Atlas', icon: <Globe className="w-4 h-4" /> },
    { id: 'accords', label: 'The Three Accords', icon: <Compass className="w-4 h-4" /> },
    { id: 'regions', label: 'Regional Atlas', icon: <Trees className="w-4 h-4" /> },
    { id: 'kin', label: 'Kin & Crosskin', icon: <PawPrint className="w-4 h-4" /> },
    { id: 'recovery', label: 'Recovery Engine', icon: <Heart className="w-4 h-4" /> },
    { id: 'registries', label: 'Canon Registries', icon: <FileText className="w-4 h-4" /> },
    { id: 'codex', label: 'Codex Hub', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Universe context */}
          <div
            onClick={() => setActiveTab('atlas')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-extrabold shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-stone-100 tracking-tight flex items-center gap-2">
                PARAMECIA <span className="text-xs font-normal text-stone-500">/</span> <span className="text-amber-400">TRIQUEL</span>
              </div>
              <div className="text-[10px] text-stone-400 font-mono tracking-wider uppercase">
                Living World Engine &amp; Atlas
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Care & Theme Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle variant="compact" />
            <button
              onClick={() => setActiveTab('recovery')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-medium text-stone-300 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Recovery Care</span>
            </button>
            <button
              onClick={() => setActiveTab('codex')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-semibold text-stone-950 transition-colors shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Codex Hub</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Scroller */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-stone-800/80 scrollbar-none">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeTab === item.id
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
