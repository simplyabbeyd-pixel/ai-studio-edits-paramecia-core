import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navigation, ActiveTab } from './components/Navigation';
import { LivingAtlasGraph } from './components/LivingAtlasGraph';
import { AccordsCosmology } from './components/AccordsCosmology';
import { RegionalAtlas } from './components/RegionalAtlas';
import { KinCrosskin } from './components/KinCrosskin';
import { RecoveryEngine } from './components/RecoveryEngine';
import { CanonRegistries } from './components/CanonRegistries';
import { CodexWorkbench } from './components/CodexWorkbench';
import { ThemeToggle } from './components/ThemeToggle';
import { Sparkles, Heart } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('atlas');
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans transition-colors duration-200">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'atlas' && <LivingAtlasGraph />}
        {activeTab === 'accords' && <AccordsCosmology />}
        {activeTab === 'regions' && <RegionalAtlas />}
        {activeTab === 'kin' && <KinCrosskin />}
        {activeTab === 'recovery' && <RecoveryEngine />}
        {activeTab === 'registries' && <CanonRegistries />}
        {activeTab === 'codex' && <CodexWorkbench />}
      </main>

      <footer className="border-t border-stone-800/80 bg-stone-950 py-10 px-4 text-center text-xs text-stone-500 transition-colors duration-200 space-y-6">
        {/* Prominent Theme Toggle in Footer */}
        <div className="max-w-7xl mx-auto flex justify-center">
          <ThemeToggle variant="footer" />
        </div>

        {/* Footer Lore & Canon Metadata */}
        <div className="max-w-7xl mx-auto pt-4 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold">Paramecia Core</span>
            <span>·</span>
            <span>Triquel Living World Engine</span>
            <span>·</span>
            <span className="italic text-stone-400">"Nothing flourishes alone."</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Observation does not create authority</span>
            <span>·</span>
            <span className="text-amber-400/90 font-medium">Hells Branch Care Ecology</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
