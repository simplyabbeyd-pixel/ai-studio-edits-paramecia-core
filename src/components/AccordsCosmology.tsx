import React, { useState } from 'react';
import { ACCORDS, CIVILIZATIONAL_STACK, QUARANTINED_NON_CANON } from '../data/triquelData';
import { Compass, ShieldCheck, AlertTriangle, CheckCircle2, Sparkles, Scale, BookOpen, Layers } from 'lucide-react';

export const AccordsCosmology: React.FC = () => {
  const [testText, setTestText] = useState('');
  const [activeAccordIndex, setActiveAccordIndex] = useState(0);

  // Analyze text for quarantined non-canon terms
  const detectionResults = QUARANTINED_NON_CANON.filter(item => {
    if (!testText.trim()) return false;
    const regex = new RegExp(`\\b${item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(testText) || testText.toLowerCase().includes(item.term.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" /> Foundational Cosmology &amp; Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            The Three Accords &amp; Civilizational Stack
          </h1>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-3xl">
            Triquel is governed by three non-negotiable questions that test every addition to canon.
            Nothing flourishes alone; observation does not create authority.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 p-4 rounded-xl bg-stone-900/80 border border-stone-800 shrink-0 text-right">
          <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Cosmological Hierarchy</div>
          <div className="text-sm font-bold text-amber-300">Paramecia <span className="text-stone-500">→</span> Triquel</div>
          <div className="text-[11px] text-stone-400 mt-0.5">Universe <span className="text-stone-600">/</span> World (Planet)</div>
        </div>
      </div>

      {/* The Three Accords Interactive Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" /> The Three Accord Gates
          </h2>
          <span className="text-xs text-stone-400">All canon, design, and roleplay pass through these gates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACCORDS.map((accord, idx) => (
            <div
              key={accord.name}
              onClick={() => setActiveAccordIndex(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                activeAccordIndex === idx
                  ? 'bg-stone-900 border-amber-500 shadow-xl shadow-amber-950/20 ring-1 ring-amber-500/50'
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900/90'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-wider uppercase text-amber-400/90 font-semibold">
                    Accord 0{idx + 1}
                  </span>
                  {activeAccordIndex === idx && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-100 mb-1">{accord.name}</h3>
                  <div className="text-base font-serif italic text-amber-200">
                    "{accord.question}"
                  </div>
                </div>

                <div className="text-xs text-stone-400 font-medium">
                  {accord.theme}
                </div>

                <p className="text-sm text-stone-300 leading-relaxed pt-2 border-t border-stone-800">
                  {accord.role}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Gate Rule
                </div>
                <div className="text-xs text-emerald-200/90 font-medium">
                  {accord.gate_rule}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Point 0 & Veyr Architecture */}
      <section className="p-8 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Central Relational Coordinate
          </div>
          <h2 className="text-2xl font-bold text-stone-100">
            Point 0 and Veyr (Threshold Witness)
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            In Paramecia / Triquel cosmology, <strong>Point 0</strong> is the coordinate of Attention before specialization.
            It anchors relationality without enclosing or owning it.
          </p>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 space-y-2">
            <div className="font-semibold text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Canon-Locked Separation (CORR-VEYR-POINT0-0001)
            </div>
            <p>
              <strong>Veyr</strong> is the threshold witness associated with Point 0.
              Veyr is the <em>center coordinate</em>, not a peripheral kin member positioned inside the Circle of Kin.
              Diagrams, maps, and lore entries must never depict Veyr as an enclosed species in the circle.
            </p>
          </div>
        </div>
      </section>

      {/* Civilizational Stack */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" /> The 9-Layer Civilizational Stack
          </h2>
          <span className="text-xs text-stone-400">From Layer 0 Care Ecology to Layer 9 Production</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CIVILIZATIONAL_STACK.map(layer => (
            <div
              key={layer.level}
              className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/80 hover:border-stone-700 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-400">
                  L{layer.level}
                </span>
                <span className="text-sm font-semibold text-stone-200">{layer.name}</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quarantined Non-Canon Detector Tool */}
      <section className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-800/50 text-red-300 text-xs font-semibold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Canon Quarantine System
            </div>
            <h2 className="text-xl font-bold text-stone-100">
              Quarantined Non-Canon Validator &amp; Checker
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              Type or paste proposed lore, character dialogues, or world notes below to test for spurious inventions, deprecated spellings, or false accord names.
            </p>
          </div>

          <button
            onClick={() => setTestText("Zarea with human ears invoked the Accord of Consent in Nyx's chamber with two protocol ducks.")}
            className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            Load Sample Non-Canon Test Text
          </button>
        </div>

        <div className="space-y-3">
          <textarea
            value={testText}
            onChange={e => setTestText(e.target.value)}
            placeholder="Type or paste draft lore to validate against canonical governance..."
            className="w-full h-28 bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl p-3.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none transition-colors"
          />

          {testText && (
            <div>
              {detectionResults.length > 0 ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Quarantined Elements Detected ({detectionResults.length})
                  </div>
                  <div className="space-y-2">
                    {detectionResults.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-stone-900/80 border border-red-900/40 text-xs">
                        <span className="font-bold text-red-400">"{item.term}"</span>: <span className="text-stone-300">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No quarantined non-canon phrases detected. Passes baseline Accord screening.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Known Quarantined Ledger */}
        <div className="pt-4 border-t border-stone-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Authoritative Quarantined Concepts Ledger
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUARANTINED_NON_CANON.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-stone-950/70 border border-stone-800/80 text-xs">
                <div className="font-semibold text-red-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {item.term}
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
