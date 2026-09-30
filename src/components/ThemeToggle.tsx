import React from 'react';
import { useTheme, Theme } from '../context/ThemeContext';
import { Moon, Scroll, Sun, Sparkles, BookOpen } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'footer' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'footer' }) => {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        title={`Switch to ${theme === 'deep-space' ? 'Archival Parchment (High-Contrast)' : 'Deep Space'} theme`}
        aria-label="Toggle visual theme"
        className="p-2 rounded-xl border border-stone-800 hover:border-amber-500/50 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 transition-all flex items-center justify-center shadow-sm"
      >
        {theme === 'deep-space' ? (
          <Scroll className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-amber-500" />
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-lg max-w-xl mx-auto w-full">
      <div className="flex items-center gap-3 text-left">
        <div className={`p-2.5 rounded-xl border ${
          theme === 'parchment'
            ? 'bg-amber-100 border-amber-300 text-amber-900'
            : 'bg-stone-950 border-stone-800 text-amber-400'
        }`}>
          {theme === 'parchment' ? (
            <Scroll className="w-5 h-5 text-amber-800" />
          ) : (
            <Moon className="w-5 h-5 text-amber-400" />
          )}
        </div>
        <div>
          <div className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
            <span>Visual Theme &amp; Legibility</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
              {theme === 'deep-space' ? 'Deep Space (Default)' : 'Archival Parchment (High Contrast)'}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Switch between the cosmic dark aesthetic and high-contrast illuminated vellum for optimal reading comfort.
          </p>
        </div>
      </div>

      {/* Segmented Switcher */}
      <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0">
        <button
          onClick={() => setTheme('deep-space')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'deep-space'
              ? 'bg-stone-800 text-stone-100 shadow-sm border border-stone-700'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-pressed={theme === 'deep-space'}
        >
          <Moon className="w-3.5 h-3.5 text-amber-400" />
          <span>Deep Space</span>
        </button>

        <button
          onClick={() => setTheme('parchment')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'parchment'
              ? 'bg-amber-600 text-amber-50 shadow-sm border border-amber-500'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-pressed={theme === 'parchment'}
        >
          <Scroll className="w-3.5 h-3.5" />
          <span>Parchment</span>
        </button>
      </div>
    </div>
  );
};
