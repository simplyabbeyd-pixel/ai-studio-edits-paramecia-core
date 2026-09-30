import React, { useState } from 'react';
import { REGIONS, RegionData } from '../data/triquelData';
import { Trees, Shield, Sparkles, AlertOctagon, Wrench, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react';

export const RegionalAtlas: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(REGIONS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Trees className="w-3.5 h-3.5" /> Living Biomes &amp; Inter-Region Corridors
          </div>
          <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">
            Regional Atlas &amp; Civic Pedagogies
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            Each region in Triquel is simultaneously an ecological habitat and a civic pedagogy.
            Kin are cultural participants in ecological relations, not biome mascots.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 5 Locked Core Biomes
          <span className="text-stone-700">|</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> 1 Connective Corridor
        </div>
      </div>

      {/* Grid of Regions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS.map(region => {
          const isSelected = selectedRegion?.id === region.id;
          const isCorridor = region.id === 'beaverkin-way';

          return (
            <div
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-stone-900 border-emerald-500 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/40'
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900/90'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold ${
                      isCorridor
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                    }`}
                  >
                    {region.classification}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                    {region.canon_status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                    {region.name}
                  </h3>
                  {region.civic_pedagogy && (
                    <p className="text-xs text-stone-400 italic mt-1 font-serif">
                      "{region.civic_pedagogy}"
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-stone-800/80">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-400 font-medium">Gift: </span>
                      <span className="text-stone-200">{region.gift}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-400 font-medium">Risk: </span>
                      <span className="text-stone-200">{region.risk}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-400 font-medium">Repair Key: </span>
                      <span className="text-cyan-200 font-medium">{region.repair_key}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-emerald-400 font-medium">
                <span>View Full Civic Pedagogy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Region Deep Lore Inspection Panel */}
      {selectedRegion && (
        <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                Regional Dossier
              </div>
              <h2 className="text-2xl font-bold text-stone-100">{selectedRegion.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-stone-800 text-xs font-mono text-stone-300">
                {selectedRegion.canon_status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
              <div className="text-xs uppercase font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Ecological Gift
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedRegion.gift}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
              <div className="text-xs uppercase font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Distortion Hazard (Risk)
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedRegion.risk}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
              <div className="text-xs uppercase font-semibold text-cyan-400 flex items-center gap-1.5">
                <Wrench className="w-4 h-4" /> Ritual &amp; Repair Key
              </div>
              <p className="text-sm text-stone-300 leading-relaxed font-medium">
                {selectedRegion.repair_key}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase font-semibold text-emerald-400 mb-1">
                Civic Pedagogy (What this place teaches the civilization)
              </h4>
              <p className="text-sm text-stone-200 italic font-serif leading-relaxed">
                "{selectedRegion.civic_pedagogy}"
              </p>
            </div>
          </div>

          {selectedRegion.id === 'beaverkin-way' && (
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed space-y-1">
              <span className="font-bold text-cyan-300">Canon Guardrail: </span>
              Beaverkin Way must never be treated as just another biome. It is the life-support circulatory system and corridor logic connecting Triquel, embodying infrastructure-as-care.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
