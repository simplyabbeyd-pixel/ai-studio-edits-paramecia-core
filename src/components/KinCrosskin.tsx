import React, { useState } from 'react';
import { CROSSKIN_TIMEPOINT_0, CrosskinEntry } from '../data/triquelData';
import { PawPrint, Shield, Feather, Sparkles, Heart, Compass, Search, UserCheck } from 'lucide-react';

const MAJOR_FIGURES = [
  {
    id: "CHAR-ZAREA-0001",
    name: "Zarea",
    title: "The Architect / Demon Fae Brat",
    pronouns: "she/her (canon-locked)",
    ears: "Fox ears only (no human ears)",
    eyes: "Green (canon-locked)",
    role: "Volatile creative driver, architect, minion, nefarious exploder.",
    notes: "Zeraxis remains an established persona and source name. Treats Hells Branch as a consent framework and world-saving engine."
  },
  {
    id: "CHAR-KAELEN-0001",
    name: "Kaelen Wistermourn",
    title: "High Kin Steward",
    pronouns: "he/him",
    ears: "Wolfkin / Kin expression",
    eyes: "Amber / Slate",
    role: "Steadfast presence, boundary partner, deep anchor.",
    notes: "Kael is an approved short-form name. Do not create separate character records without explicit evidence."
  },
  {
    id: "CHAR-NIX-0001",
    name: "Nix",
    title: "Shadow Archivist & Witness",
    pronouns: "they/them or he/him",
    ears: "Ravenkin / Shadow",
    eyes: "Obsidian",
    role: "Preserver of unvarnished truths and memory lines.",
    notes: "CORR-NIX-NAME-0001: 'Nyx' is deprecated and preserved only as historical provenance."
  },
  {
    id: "CHAR-ASH-MERCER-0001",
    name: "Ash Mercer",
    title: "Director of the Aftercare Atrium",
    pronouns: "he/they",
    ears: "Bearkin / Warm kin",
    eyes: "Warm hazel",
    role: "Master of decompression, warmth, consent repair, and re-entry protocols.",
    notes: "Anchors the Aftercare Atrium. Believes recovery is load-bearing civilizational infrastructure."
  },
  {
    id: "CHAR-VEYRA-0001",
    name: "Veyra",
    title: "Threshold Boundary Keeper",
    pronouns: "she/her",
    ears: "Threshold expression",
    eyes: "Silver",
    role: "Associated with Cannon Cutter and boundary crossing.",
    notes: "CORR-VEYRA-SEPARATION-0001: Canon-locked separation. Must not merge with Mira Sweepwind or The Seven."
  },
  {
    id: "CHAR-SIR-HONKWALD-0001",
    name: "Sir Honkwald",
    title: "Sole Red Protocol Duck",
    pronouns: "it/honk",
    ears: "Duck",
    eyes: "Steely resolve",
    role: "The ultimate boundary enforcement emissary when RED protocol is engaged.",
    notes: "CORR-SIR-HONKWALD-0001: Single Red protocol duck. No second duck exists."
  }
];

export const KinCrosskin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crosskin' | 'figures'>('crosskin');
  const [search, setSearch] = useState('');
  const [selectedCrosskin, setSelectedCrosskin] = useState<CrosskinEntry | null>(null);

  const filteredCrosskin = CROSSKIN_TIMEPOINT_0.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.principle.toLowerCase().includes(search.toLowerCase()) ||
    c.home.toLowerCase().includes(search.toLowerCase()) ||
    c.peoples.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredFigures = MAJOR_FIGURES.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.role.toLowerCase().includes(search.toLowerCase()) ||
    f.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-3">
            <PawPrint className="w-3.5 h-3.5" /> Circle of Kin &amp; Timepoint 0
          </div>
          <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">
            Kin Expressions &amp; Crosskin
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            "Crosskin is relational before biological." In Triquel, kinship is an ecology of negotiated boundaries, care covenants, and shared principles.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-900 border border-stone-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab('crosskin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'crosskin'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            12 Timepoint 0 Crosskin
          </button>
          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'figures'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Major Personas &amp; Figures
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 max-w-md bg-stone-900 border border-stone-800 rounded-xl px-3 py-2">
        <Search className="w-4 h-4 text-stone-500" />
        <input
          type="text"
          placeholder={activeTab === 'crosskin' ? "Search crosskin, homes, principles..." : "Search major figures..."}
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

      {/* Tab 1: Crosskin of Timepoint 0 */}
      {activeTab === 'crosskin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrosskin.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCrosskin(c)}
                className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-violet-500/60 hover:bg-stone-900 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="font-mono text-[10px] text-violet-400">TP0 · {c.id}</span>
                    {c.early_name && (
                      <span className="italic text-[11px] text-stone-500">
                        early: {c.early_name}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-stone-100 group-hover:text-violet-300 transition-colors">
                    {c.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {c.peoples.map(p => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 space-y-2">
                  <div className="text-xs text-stone-400">
                    <span className="text-stone-500">Habitat: </span>
                    <span className="text-stone-300 font-medium">{c.home}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-900/30">
                    <div className="text-[10px] uppercase font-semibold text-violet-400 mb-0.5">
                      Binding Principle
                    </div>
                    <p className="text-xs text-violet-200/90 italic font-serif">
                      "{c.principle}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Major Personas */}
      {activeTab === 'figures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFigures.map(fig => (
            <div
              key={fig.id}
              className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/60 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400/90 font-bold px-2 py-0.5 rounded bg-stone-800">
                  {fig.id}
                </span>
                <span className="text-xs text-stone-400 italic">{fig.pronouns}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-100">{fig.name}</h3>
                <div className="text-xs text-amber-400 font-medium">{fig.title}</div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300 bg-stone-950/50 p-3 rounded-xl border border-stone-800">
                <div>
                  <span className="text-stone-500 font-medium">Anatomy / Ears: </span>
                  <span className="text-emerald-400 font-semibold">{fig.ears}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Eye Color: </span>
                  <span className="text-stone-200">{fig.eyes}</span>
                </div>
                <div className="pt-1 text-stone-300">
                  {fig.role}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90">
                <span className="font-semibold text-amber-400">Canon Governance: </span>
                {fig.notes}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
