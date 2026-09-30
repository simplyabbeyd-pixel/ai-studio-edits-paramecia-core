import React, { useState } from 'react';
import { CANON_CORRECTIONS, ALIAS_ENTRIES, CanonCorrection, AliasEntry } from '../data/triquelData';
import { FileText, ShieldAlert, GitBranch, Search, Filter, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export const CanonRegistries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'corrections' | 'aliases' | 'governance'>('corrections');
  const [search, setSearch] = useState('');

  const filteredCorrections = CANON_CORRECTIONS.filter(c =>
    c.correction_id.toLowerCase().includes(search.toLowerCase()) ||
    c.entity_id.toLowerCase().includes(search.toLowerCase()) ||
    c.field.toLowerCase().includes(search.toLowerCase()) ||
    c.corrected_value.toLowerCase().includes(search.toLowerCase()) ||
    c.superseded_value.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAliases = ALIAS_ENTRIES.filter(a =>
    a.canonical_id.toLowerCase().includes(search.toLowerCase()) ||
    (a.canonical_name && a.canonical_name.toLowerCase().includes(search.toLowerCase())) ||
    a.aliases.some(al => al.toLowerCase().includes(search.toLowerCase())) ||
    a.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" /> Authoritative Governance Ledgers
          </div>
          <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">
            Canon Registries &amp; Guardrails
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            "Corrections are first-class events." Downstream prose, exports, visual prompts, and scenario modules must apply active corrections.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-900 border border-stone-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab('corrections')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'corrections'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Corrections Ledger ({CANON_CORRECTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('aliases')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'aliases'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Naming Crosswalk ({ALIAS_ENTRIES.length})
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'governance'
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Governance &amp; Scope
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-md bg-stone-900 border border-stone-800 rounded-xl px-3 py-2">
        <Search className="w-4 h-4 text-stone-500" />
        <input
          type="text"
          placeholder="Filter by ID, entity, keyword, or note..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-stone-200 placeholder-stone-500 focus:outline-none"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-stone-400 hover:text-stone-200">
            Clear
          </button>
        )}
      </div>

      {/* Tab 1: Corrections Ledger */}
      {activeTab === 'corrections' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Authority Rule:</strong> Corrections are canon-locked. Superseded values are permanently archived for provenance and must never be restored in new artifacts.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCorrections.map(corr => (
              <div
                key={corr.correction_id}
                className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-stone-950 border border-stone-800">
                    {corr.correction_id}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-800">
                    {corr.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-400">Entity:</span>
                  <span className="font-mono text-stone-200 font-semibold">{corr.entity_id}</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">Field:</span>
                  <span className="font-mono text-amber-300">{corr.field}</span>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-stone-800">
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-rose-200/90">
                    <span className="font-semibold text-rose-400">Superseded Value: </span>
                    <span className="line-through">{corr.superseded_value}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-emerald-200/90">
                    <span className="font-semibold text-emerald-400">Corrected Value: </span>
                    <span>{corr.corrected_value}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1">
                  {corr.scope.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Naming Crosswalk */}
      {activeTab === 'aliases' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 leading-relaxed">
            <span className="font-bold text-amber-400">Crosswalk Principle: </span>
            Name similarity is evidence for review, never authority to merge. Deprecated names remain visible for provenance. Unresolved entries must not be silently normalized.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAliases.map(alias => (
              <div
                key={alias.canonical_id}
                className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-stone-950 border border-stone-800">
                    {alias.canonical_id}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    alias.status === 'canon-locked' || alias.status === 'canon-locked-separation'
                      ? 'bg-emerald-950 text-emerald-400'
                      : alias.status === 'review-required'
                      ? 'bg-rose-950 text-rose-400'
                      : 'bg-stone-800 text-stone-300'
                  }`}>
                    {alias.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-100">
                    {alias.canonical_name || <span className="text-stone-500 italic">Unresolved Canonical Name</span>}
                  </h3>
                  <div className="text-xs text-amber-300/90 font-medium mt-0.5">
                    {alias.relationship}
                  </div>
                </div>

                {alias.aliases.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap text-xs">
                    <span className="text-stone-400 text-[11px]">Aliases:</span>
                    {alias.aliases.map(al => (
                      <span key={al} className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 text-xs">
                        {al}
                      </span>
                    ))}
                  </div>
                )}

                {alias.deprecated_aliases && alias.deprecated_aliases.length > 0 && (
                  <div className="text-xs text-rose-300/80">
                    <span className="text-stone-500">Deprecated: </span>
                    {alias.deprecated_aliases.join(', ')}
                  </div>
                )}

                {alias.must_not_merge_with && (
                  <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300">
                    <span className="font-semibold text-rose-400">Must Not Merge With: </span>
                    {alias.must_not_merge_with.join(', ')}
                  </div>
                )}

                <p className="text-xs text-stone-300 pt-2 border-t border-stone-800 leading-relaxed">
                  {alias.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Governance & Scope */}
      {activeTab === 'governance' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-amber-400" /> Branch Boundaries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-amber-400">PARAMECIA</span>
                <p className="text-stone-400">Shared-universe foundations only. Universal container.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-emerald-400">TRIQUEL</span>
                <p className="text-stone-400">Primary living-world canon. Local facts remain local unless explicitly promoted.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-violet-400">HELLS_BRANCH</span>
                <p className="text-stone-400">Experimental / alternate branch. Mechanics, consent architecture, characters, and events remain branch-local unless explicitly promoted.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-bold text-rose-400">CROSS_BRANCH_HOLDING</span>
                <p className="text-stone-400">Uncertain overlaps, mirrored concepts, shared names, variants, and unclear source assignments wait here.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-lg font-bold text-stone-100">
              Resolved Claim: Paramecia vs Triquel Scale
            </h3>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs space-y-2">
              <div className="font-bold text-emerald-400">CANON-COSMOLOGY-PARAMECIA-TRIQUEL-SCALE (LOCKED)</div>
              <p className="text-stone-200">
                <strong>Claim:</strong> Paramecia is the universe; Triquel is a world (planet) within Paramecia.
              </p>
              <p className="text-stone-400 italic">
                Creator statement (2026-06-12): "Paramecia is the universe, triquel is a world in it... Triquel created/modelled as a planet".
                Any derived description of Triquel as a galaxy conflicts with creator-level provenance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
