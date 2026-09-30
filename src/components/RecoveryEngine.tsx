import React, { useState, useEffect } from 'react';
import { RECOVERY_STATES } from '../data/triquelData';
import { Heart, Timer, ShieldAlert, Sparkles, CheckCircle2, XCircle, AlertCircle, Copy, Check, Download, Coffee, Eye } from 'lucide-react';

export const RecoveryEngine: React.FC = () => {
  // Timer state for 20-minute Recovery Amber
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedState, setSelectedState] = useState(RECOVERY_STATES[5]); // Default to Recovery Amber

  // Drop Point Form State
  const [activeProject, setActiveProject] = useState('Paramecia / Triquel Living Canon');
  const [capacityColor, setCapacityColor] = useState<'Green' | 'Amber' | 'Red'>('Amber');
  const [capturedLore, setCapturedLore] = useState('Living Atlas graph connections and canon corrections applied.');
  const [unresolvedThreads, setUnresolvedThreads] = useState('Scope of universal sentience in Triquel vs Paramecia.');
  const [parkedBranches, setParkedBranches] = useState('1. Whispering marsh lantern species. 2. Beaverkin dam structural schematics.');
  const [nextSafeStep, setNextSafeStep] = useState('Review alias registry entries for Vesper before export.');
  const [careAction, setCareAction] = useState('Drink a glass of water and rest eyes for 20 minutes without screens.');
  const [copied, setCopied] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const generateDropPointMarkdown = () => {
    const timestamp = new Date().toISOString();
    return `# Drop Point Record — ${timestamp.split('T')[0]}

**Active Project:** ${activeProject}
**Capacity Color:** ${capacityColor} ${capacityColor === 'Green' ? '🟢' : capacityColor === 'Amber' ? '🟡' : '🔴'}
**Timestamp:** ${timestamp}

## What Was Captured
${capturedLore}

## Unresolved Threads
${unresolvedThreads}

## Parked Vortex Branches (Shiny Vortex Containment)
${parkedBranches}

## Next Safe Step
${nextSafeStep}

## Concrete Care Action
${careAction}

---
*Generated via Paramecia Core Living Recovery Engine. Recovery is part of the world engine.*
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDropPointMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateDropPointMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `drop-point-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-900/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" /> Hells Branch Recovery Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Recovery Is Part of the World Engine
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            "Recovery is not a detour from the work. Recovery is part of the world engine.
            Observation, silence, curiosity, compliance, or prior consent do not create current authority."
          </p>
        </div>
      </div>

      {/* Consent Colors Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Consent &amp; Capacity Protocols
          </h2>
          <span className="text-xs text-stone-400">Hells Branch Legibility Law</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Green */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-emerald-900/40 hover:border-emerald-500/60 transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                GREEN
              </span>
              <span className="text-lg">🟢</span>
            </div>
            <h3 className="text-lg font-bold text-stone-100">Affirmative Flow</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Energy is clear, consent is present, creation is stable. Proceed with active focus on the single active artifact.
            </p>
          </div>

          {/* Amber */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-amber-900/40 hover:border-amber-500/60 transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/40">
                AMBER
              </span>
              <span className="text-lg">🟡</span>
            </div>
            <h3 className="text-lg font-bold text-stone-100">Recovery Standstill</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Caution, boundary assessment, or sensory saturation. Trigger 20-minute Recovery Amber. Zero disguised planning allowed.
            </p>
          </div>

          {/* Red */}
          <div className="p-6 rounded-2xl bg-stone-900/70 border border-red-900/40 hover:border-red-500/60 transition-colors space-y-3 ring-1 ring-red-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/40">
                RED — STOP
              </span>
              <span className="text-lg">🔴</span>
            </div>
            <h3 className="text-lg font-bold text-stone-100">Absolute Stop</h3>
            <p className="text-xs text-red-200/90 leading-relaxed">
              <strong>CORR-RED-PROTOCOL-0001:</strong> Red is strictly reserved for STOP. Never used for playful escalation.
              Emissary: Sir Honkwald (Single protocol duck).
            </p>
          </div>
        </div>
      </section>

      {/* 20-Minute Recovery Amber Timer & Rules */}
      <section className="p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Timer className="w-3.5 h-3.5" /> Sanctuary Clock
            </div>
            <h2 className="text-2xl font-bold text-stone-100">Recovery Amber Protocol (20 Minutes)</h2>
            <p className="text-xs text-stone-400 mt-1">
              When intensity or the Shiny Vortex threatens overload, take a mandatory twenty-minute pause.
            </p>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-4 bg-stone-950 border border-stone-800 rounded-2xl p-4 shrink-0 shadow-inner">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-wider">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isTimerRunning
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                }`}
              >
                {isTimerRunning ? 'Pause' : secondsLeft === 0 ? 'Restart' : 'Begin Amber'}
              </button>
              <button
                onClick={() => { setIsTimerRunning(false); setSecondsLeft(20 * 60); }}
                className="text-[11px] text-stone-400 hover:text-stone-200 text-center"
              >
                Reset to 20m
              </button>
            </div>
          </div>
        </div>

        {/* Allowed vs Prohibited During Recovery Amber */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Strictly Allowed During Recovery Amber
            </h3>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span> Hydration (water, tea, broth)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span> Nourishment &amp; necessary medication
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span> Sensory regulation, warmth, soft blankets, dimmed lights
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span> Somatic grounding, stretching, breathing, resting eyes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span> Sleep or contained quiet comfort
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Strictly Prohibited During Recovery Amber
            </h3>
            <ul className="text-xs text-stone-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✗</span> Disguised planning ("I'm just thinking about the plot")
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✗</span> "Just one more quick edit" to code, lore, or notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✗</span> Opening parked branches from the Shiny Vortex
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✗</span> Research detours, wiki rabbit holes, or new character cards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✗</span> Optimization or reorganizing files
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The 7 Creative & Recovery States Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> The 7 Operational Recovery States
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {RECOVERY_STATES.map(st => (
            <button
              key={st.name}
              onClick={() => setSelectedState(st)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedState.name === st.name
                  ? 'bg-amber-500/20 border-amber-500 ring-1 ring-amber-500/40 text-stone-100'
                  : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-stone-200'
              }`}
            >
              <div className="text-xs font-bold truncate">{st.name}</div>
              <div className="text-[10px] text-stone-500 truncate mt-0.5">{st.tagline}</div>
            </button>
          ))}
        </div>

        {selectedState && (
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-100">{selectedState.name}</h3>
                <div className="text-xs text-amber-400 italic">{selectedState.tagline}</div>
              </div>
            </div>
            <p className="text-sm text-stone-300">{selectedState.definition}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-stone-800">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-emerald-400">Allowed Action / Response:</div>
                <ul className="text-xs text-stone-400 list-disc list-inside space-y-0.5">
                  {selectedState.allowed.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-400">Containment Rule:</div>
                <p className="text-xs text-stone-300 italic">{selectedState.containment}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Drop Point Generator */}
      <section className="p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-100">Drop Point Generator &amp; Record</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Declare an explicit Drop Point before energetic depletion. Generates an exportable ledger note.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Markdown!' : 'Copy Record'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download .md
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Active Project</label>
              <input
                type="text"
                value={activeProject}
                onChange={e => setActiveProject(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Current Capacity Color</label>
              <div className="flex gap-2">
                {(['Green', 'Amber', 'Red'] as const).map(color => (
                  <button
                    key={color}
                    onClick={() => setCapacityColor(color)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      capacityColor === color
                        ? color === 'Green'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : color === 'Amber'
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-red-950 border-red-500 text-red-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">What Was Captured</label>
              <textarea
                value={capturedLore}
                onChange={e => setCapturedLore(e.target.value)}
                rows={2}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Unresolved Threads</label>
              <textarea
                value={unresolvedThreads}
                onChange={e => setUnresolvedThreads(e.target.value)}
                rows={2}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Parked Vortex Branches (Shiny Vortex Queue)</label>
              <textarea
                value={parkedBranches}
                onChange={e => setParkedBranches(e.target.value)}
                rows={2}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">Next Safe Step</label>
              <input
                type="text"
                value={nextSafeStep}
                onChange={e => setNextSafeStep(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1">One Concrete Care Action</label>
              <input
                type="text"
                value={careAction}
                onChange={e => setCareAction(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
              <span className="font-semibold text-amber-400">Rule of the Drop Point: </span>
              Once this card is filled, immediately step away and execute the Care Action. Do not open parked branches.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
