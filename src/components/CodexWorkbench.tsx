import React, { useState } from 'react';
import { REGIONS, ACCORDS, CIVILIZATIONAL_STACK } from '../data/triquelData';
import { Terminal, Sparkles, Copy, Check, Download, BookOpen, User, Flame, CheckSquare, Layers, FileCode } from 'lucide-react';

type DeliverableType = 'lore-note' | 'system-note' | 'character-card' | 'scene-seed' | 'canon-crosswalk' | 'runtime-pack' | 'next-step-checklist';

export const CodexWorkbench: React.FC = () => {
  const [deliverableType, setDeliverableType] = useState<DeliverableType>('character-card');
  const [title, setTitle] = useState('Zarea — The Architect');
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0].id);
  const [notes, setNotes] = useState('Rein in chaos when needed, but do not flatten the weirdness. The weirdness is load-bearing.');
  const [copied, setCopied] = useState(false);

  // Deliverable options
  const deliverableOptions: { id: DeliverableType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'character-card', label: 'Character Card', icon: <User className="w-4 h-4" />, desc: 'Canon-governed card with pronouns, ears, eye color, and persona' },
    { id: 'lore-note', label: 'Lore Note', icon: <BookOpen className="w-4 h-4" />, desc: 'Ecological or civilizational observation tested against Three Accords' },
    { id: 'system-note', label: 'System Note', icon: <Layers className="w-4 h-4" />, desc: 'Accord gate evaluation & structural constraint check' },
    { id: 'scene-seed', label: 'Scene Seed', icon: <Flame className="w-4 h-4" />, desc: 'Brat contract, threshold negotiation, or aftercare encounter' },
    { id: 'canon-crosswalk', label: 'Canon Crosswalk', icon: <FileCode className="w-4 h-4" />, desc: 'Name relationship, deprecated alias, & hazard separation entry' },
    { id: 'runtime-pack', label: 'Runtime Pack', icon: <Sparkles className="w-4 h-4" />, desc: 'Executable behavioral directives & Drop Point triggers' },
    { id: 'next-step-checklist', label: 'Next-Step Checklist', icon: <CheckSquare className="w-4 h-4" />, desc: 'Smallest concrete useful next build for Codex Hub' },
  ];

  // Generate the markdown output
  const generateOutput = (): string => {
    const regionObj = REGIONS.find(r => r.id === selectedRegion) || REGIONS[0];
    const layerObj = CIVILIZATIONAL_STACK.find(l => l.level === selectedLayer) || CIVILIZATIONAL_STACK[0];
    const timestamp = new Date().toISOString().split('T')[0];

    switch (deliverableType) {
      case 'character-card':
        return `# Character Card: ${title}

**Canonical ID:** CHAR-ZAREA-0001
**Universe Container:** Paramecia
**Active World:** Triquel
**Pronouns:** she/her (canon-locked via CORR-ZERAXIS-PRONOUNS-0001)
**Anatomy / Ears:** Fox ears only; no human ears (CORR-ZAREA-EARS-0001)
**Eye Color:** Green (CORR-ZAREA-EYES-0001)
**Civilizational Layer:** Layer ${selectedLayer} (${layerObj.name})
**Primary Region Affiliation:** ${regionObj.name}

## Persona & Archetype
- **Title:** Demon fae faeling brat, architect, minion, nefarious exploder
- **Role:** Volatile creative driver and consent systems engine
- **Consent Framework:** Hells Branch (how to save the world.exe)

## Load-Bearing Constraints
> "${notes}"

## Relational Anchors
- **Threshold Partner:** Kaelen Wistermourn
- **Shadow Witness:** Nix
- **Care Steward:** Ash Mercer (Aftercare Atrium)
- **Red Protocol Emissary:** Sir Honkwald (Single protocol duck)

---
*Created via Paramecia Core Codex Hub. Authority: Versioned Canon Ledger.*
`;

      case 'lore-note':
        return `# Lore Note: ${title}

**Date:** ${timestamp}
**Target World:** Triquel
**Ecological Region:** ${regionObj.name}
**Civilizational Layer:** Layer ${selectedLayer} — ${layerObj.name}

## Observation & Grounding (Recognition Accord)
What is actually here before interpretation:
${notes}

## Ecological Gift & Reciprocity (Harmony Accord)
- **Regional Gift:** ${regionObj.gift}
- **Condition for Flourishing:** Flourishing requires care infrastructure, not unexamined expansion.

## Protected Limits & Memory (Midnight Accord)
- **Regional Risk:** ${regionObj.risk}
- **Repair Ritual:** ${regionObj.repair_key}
- **Civic Pedagogy:** "${regionObj.civic_pedagogy}"

---
*Nothing flourishes alone. Observation does not create authority.*
`;

      case 'system-note':
        return `# System Note: Accord Gate Review

**Deliverable Title:** ${title}
**Layer Tested:** Layer ${selectedLayer} (${layerObj.name})
**Status:** PROVISIONAL — Pending Creator Declaration

## Accord 1 — Recognition Gate
- **Question:** *What is actually here?*
- **Assessment:** Grounds claims in explicit evidence. Bypasses no emotional or somatic reality.

## Accord 2 — Harmony Gate
- **Question:** *What wants to flourish?*
- **Assessment:** Ensures new mechanics support mutual flourishing rather than decorative friction.

## Accord 3 — Midnight Gate
- **Question:** *What must be honored?*
- **Assessment:** Limits, grief, and prior corrections are preserved without smoothing over load-bearing weirdness.

## Structural Notes
${notes}

---
*Authority Order: Creator Explicit Declaration > Versioned Canon Registry > Approved Correction.*
`;

      case 'scene-seed':
        return `# Scene Seed: ${title}

**Setting:** ${regionObj.name} (${regionObj.classification})
**Tension Level:** High-voltage Embercurrent
**Consent Tone:** Hells Branch Negotiated Boundaries

## Atmosphere & Context
The air carries the distinctive resonance of ${regionObj.name}.
Civic Pedagogy in effect: "${regionObj.civic_pedagogy}"

## Scene Core
${notes}

## Safety & Drop Point Mechanisms
- **Green:** Affirmative play and brat negotiation flow freely.
- **Amber:** Immediate 20-minute sensory pause; step back into the Quiet Room or Aftercare Atrium.
- **Red:** Hard stop. Monitored by Sir Honkwald. No exceptions.

---
*Paramecia Living World Engine Scenario Runtime.*
`;

      case 'canon-crosswalk':
        return `{
  "canonical_id": "CHAR-${title.toUpperCase().replace(/\\s+/g, '-')}-0001",
  "canonical_name": "${title}",
  "aliases": ["${title.split(' ')[0]}"],
  "relationship": "same-person identity relationship",
  "status": "provisional-review",
  "region_scope": "${regionObj.name}",
  "layer": ${selectedLayer},
  "rules": [
    "Name similarity is evidence for review, never authority to merge.",
    "Deprecated names remain visible for provenance."
  ],
  "notes": "${notes}"
}`;

      case 'runtime-pack':
        return `# Runtime Pack: ${title}

**Package Target:** Project 0 Behavioral Core
**Layer:** Layer ${selectedLayer} (${layerObj.name})
**State Trigger:** Embercurrent → Drop Point

## Operational Directives
1. **Verbatim Capture:** Record exact words before paraphrasing.
2. **Shiny Vortex Containment:** Park competing branches in a one-sentence queue.
3. **Drop Point Enforcement:** Never exceed energetic capacity.

## Field Notes
${notes}

## Recovery Hand-off
Upon signal Amber, route directly to Recovery Amber (20 min) and Aftercare Atrium with Ash Mercer.
`;

      case 'next-step-checklist':
        return `# Codex Hub Next-Step Checklist

**Deliverable Focus:** ${title}
**Date:** ${timestamp}

- [ ] 1. Identify the affected layer (Layer ${selectedLayer}: ${layerObj.name})
- [ ] 2. Check for active corrections in corrections ledger
- [ ] 3. Screen for quarantined non-canon terms (Accord of Relation/Consent/Regeneration, etc.)
- [ ] 4. Link relationships in Triquel Relational Network
- [ ] 5. Declare Drop Point before opening secondary branches

## Task Notes
${notes}

---
*Default Output Bias: Produce one concrete useful thing.*
`;
      default:
        return '';
    }
  };

  const outputMarkdown = generateOutput();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([outputMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${deliverableType}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5" /> Codex Backbone Engine
          </div>
          <h1 className="text-3xl font-extrabold text-stone-100 tracking-tight">
            Codex Deliverable Generator
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            "When in doubt, produce one concrete useful thing: a lore note, system note, character card, scene seed, canon crosswalk, runtime pack, or next-step checklist."
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Markdown'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Download .md
          </button>
        </div>
      </div>

      {/* Deliverable Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {deliverableOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => {
              setDeliverableType(opt.id);
              if (opt.id === 'character-card') setTitle('Zarea — The Architect');
              else if (opt.id === 'scene-seed') setTitle('Moonlit Negotiations at High Branch');
              else if (opt.id === 'lore-note') setTitle('Memory Filtration in Marsh Spores');
              else if (opt.id === 'system-note') setTitle('Three Accord Integrity Audit');
              else if (opt.id === 'canon-crosswalk') setTitle('Zarea / Zeraxis Crosswalk');
              else if (opt.id === 'runtime-pack') setTitle('Project 0 Recovery Amber Module');
              else setTitle('Next Deliverable Sprint');
            }}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              deliverableType === opt.id
                ? 'bg-amber-500/20 border-amber-500 ring-1 ring-amber-500/40 text-stone-100 shadow-sm'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={deliverableType === opt.id ? 'text-amber-400' : 'text-stone-500'}>
                {opt.icon}
              </span>
            </div>
            <div className="text-xs font-bold truncate">{opt.label}</div>
          </button>
        ))}
      </div>

      {/* Configuration & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (4 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-stone-900/80 p-6 rounded-2xl border border-stone-800">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-4">
            Artifact Parameters
          </h2>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Deliverable Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Civilizational Layer</label>
            <select
              value={selectedLayer}
              onChange={e => setSelectedLayer(Number(e.target.value))}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              {CIVILIZATIONAL_STACK.map(l => (
                <option key={l.level} value={l.level}>
                  Layer {l.level}: {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Associated Region / System</label>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.classification})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Core Notes &amp; Specifics</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={5}
              placeholder="Enter specific facts, scene seeds, or constraints..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-200/90 leading-relaxed">
            <span className="font-semibold text-amber-400">Codex Governance: </span>
            Rein in chaos when needed, but do not flatten the weirdness. All generated artifacts preserve canon corrections automatically.
          </div>
        </div>

        {/* Right Output Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Live Markdown Artifact Preview
            </span>
            <span className="text-[11px] font-mono text-stone-500">
              {deliverableType}.md
            </span>
          </div>

          <div className="flex-1 bg-stone-950 border border-stone-800 rounded-2xl p-6 font-mono text-xs text-stone-200 whitespace-pre-wrap overflow-y-auto max-h-[560px] shadow-inner selection:bg-amber-500/30">
            {outputMarkdown}
          </div>
        </div>
      </div>
    </div>
  );
};
