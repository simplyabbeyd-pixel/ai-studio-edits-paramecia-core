export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'concept' | 'project' | 'solution' | 'technology' | 'skill';
  description: string;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  description: string;
}

export interface KnowledgeGraphData {
  title: string;
  description: string;
  status: string;
  core_truth: string;
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export interface RegionData {
  id: string;
  name: string;
  classification: string;
  canon_status: string;
  gift: string;
  risk: string;
  repair_key: string;
  expansion_status: string;
  description?: string;
  civic_pedagogy?: string;
}

export interface CrosskinEntry {
  id: string;
  name: string;
  peoples: string[];
  home: string;
  early_name?: string;
  principle: string;
  spelling_status?: string;
}

export interface CanonCorrection {
  correction_id: string;
  entity_id: string;
  field: string;
  superseded_value: string;
  corrected_value: string;
  status: string;
  scope: string[];
  preserve_as_deprecated_alias?: boolean;
}

export interface AliasEntry {
  canonical_id: string;
  canonical_name: string | null;
  aliases: string[];
  relationship: string;
  status: string;
  notes: string;
  deprecated_aliases?: string[];
  must_not_merge_with?: string[];
  must_compare_with?: string[];
}

export interface HoldingItem {
  id: string;
  topic: string;
  status: string;
  reason: string;
}

export const TRIQUEL_KNOWLEDGE_GRAPH: KnowledgeGraphData = {
  title: "Triquel Relational Knowledge Graph",
  description: "Flat, many-to-many source graph for the Triquel Living Atlas. Canon-sensitive: exact Accord wording is preserved, and Veyr is represented as Point 0 rather than as a member inside the Circle of Kin.",
  status: "provisional",
  core_truth: "Nothing flourishes alone.",
  nodes: [
    {"id":"harmony","label":"Harmony Accord","type":"concept","description":"Asks: What wants to flourish? Guides growth, possibility, and conditions for thriving."},
    {"id":"midnight","label":"Midnight Accord","type":"concept","description":"Asks: What must be honored? Protects memory, grief, limits, shadow, and what cannot be bypassed."},
    {"id":"recognition","label":"Recognition Accord","type":"concept","description":"Asks: What is actually here? Grounds all creation in accurate attention before interpretation or authority."},
    {"id":"point-zero","label":"Point 0","type":"concept","description":"The coordinate of Attention before specialization. Point 0 anchors relation without enclosing or owning it."},
    {"id":"veyr","label":"Veyr","type":"concept","description":"Threshold witness associated with Point 0. Veyr is the center coordinate, not a member positioned inside the Circle of Kin."},
    {"id":"circle-of-kin","label":"Circle of Kin","type":"concept","description":"A relational constellation of kin expressions around Point 0, including Foxkin, Deerkin, Ravenkin, Nestkin, Rabbitfolk, Ratfolk, and Hedgekin."},
    {"id":"great-meadows","label":"Great Meadows Grassland","type":"project","description":"Open grassland region shaped by visibility, movement, seasonal abundance, and negotiated shared passage."},
    {"id":"flowering-orchard","label":"Flowering Orchard","type":"project","description":"Cultivated ecological region where pollination, harvest, memory, and stewardship are held in right relation."},
    {"id":"nightforest-canopy","label":"Nightforest Canopy","type":"project","description":"Layered nocturnal forest region organized around listening, shelter, height, signal, and concealed pathways."},
    {"id":"mycelial-marshes","label":"Mycelial Marshes","type":"project","description":"Wetland region defined by fungal exchange, decomposition, distributed intelligence, and slow renewal."},
    {"id":"echoing-caverns","label":"Echoing Caverns","type":"project","description":"Subterranean region where resonance, memory, orientation, and consent-aware navigation shape movement."},
    {"id":"beaverkin-way","label":"Beaverkin Way","type":"project","description":"A corridor logic and craft tradition centered on water-shaping, maintenance, passage, and cooperative infrastructure."},
    {"id":"care-infrastructure","label":"Care Infrastructure","type":"solution","description":"Rooms, protocols, stewards, and systems that make regulation, consent, repair, and belonging operational rather than symbolic."},
    {"id":"midnight-archive","label":"Midnight Archive","type":"project","description":"Institution for last voices, unfinished truths, witness, memory, and protected access to difficult knowledge."},
    {"id":"quiet-room","label":"Quiet Room","type":"project","description":"Central regulation space where observation does not create authority and care is practiced without coercion."},
    {"id":"aftercare-atrium","label":"Aftercare Atrium","type":"project","description":"Dedicated recovery institution led by Ash Mercer, supporting decompression, warmth, consent repair, and re-entry."},
    {"id":"notion","label":"Notion Working Studio","type":"technology","description":"Readable planning and shaping layer for canon review, production queues, contradictions, briefs, and database views."},
    {"id":"github","label":"GitHub Canon Ledger","type":"technology","description":"Versioned source of truth for canonical Markdown, JSON, Mermaid diagrams, issues, branches, and change history."},
    {"id":"beautiful-ai","label":"Beautiful.ai Diagram Foundry","type":"technology","description":"Structured presentation and diagram generator for processes, cycles, Venn diagrams, journeys, timelines, and comparison structures."},
    {"id":"figma","label":"Figma Side Workshop","type":"technology","description":"Selective visual experimentation space for editorial layouts, maps, section dividers, and one-off diagram treatments."},
    {"id":"ace","label":"Ace Knowledge Graph","type":"technology","description":"Target visualizer for flat many-to-many lore networks, durable graph consumer."},
    {"id":"powerpoint","label":"PowerPoint Master Artifact","type":"technology","description":"Primary presentation format for final narrative control, accessibility, artwork integration, and durable export."},
    {"id":"canon-review","label":"Canon Review","type":"skill","description":"Process that tests material against Recognition, Harmony, Midnight, explicit corrections, and current project canon."},
    {"id":"living-atlas-pipeline","label":"Living Atlas Pipeline","type":"project","description":"Capture, shape, review, version, diagram, present, publish, and archive workflow for Project 0 worldbuilding."}
  ],
  edges: [
    {"id":"e-recognition-canon-review","source":"recognition","target":"canon-review","type":"dependency","description":"Recognition Accord governs Canon Review by requiring the reviewer to identify what is actually present before interpreting, expanding, correcting, or presenting the material."},
    {"id":"e-harmony-canon-review","source":"harmony","target":"canon-review","type":"related","description":"Harmony Accord informs Canon Review by testing whether a proposed addition creates genuine conditions for flourishing rather than merely increasing decorative complexity."},
    {"id":"e-midnight-canon-review","source":"midnight","target":"canon-review","type":"related","description":"Midnight Accord constrains Canon Review by ensuring grief, limits, prior corrections, difficult memories, and protected boundaries are not erased for narrative convenience."},
    {"id":"e-point-zero-veyr","source":"point-zero","target":"veyr","type":"related","description":"Point 0 defines Veyr as the threshold witness located at the center coordinate of Attention, explicitly distinguishing Veyr from members placed around the Circle of Kin."},
    {"id":"e-veyr-circle","source":"veyr","target":"circle-of-kin","type":"related","description":"Veyr witnesses the Circle of Kin from Point 0, supporting relation among kin expressions without being diagrammed as another enclosed member of the circle."},
    {"id":"e-circle-care","source":"circle-of-kin","target":"care-infrastructure","type":"dependency","description":"Circle of Kin depends on Care Infrastructure because distinct kin expressions require regulation, consent, repair, belonging, and translation systems to remain in relation without forced sameness."},
    {"id":"e-meadows-harmony","source":"great-meadows","target":"harmony","type":"related","description":"Great Meadows Grassland expresses Harmony Accord through seasonal abundance, open movement, grazing patterns, and negotiated access that support flourishing across multiple communities."},
    {"id":"e-orchard-harmony","source":"flowering-orchard","target":"harmony","type":"related","description":"Flowering Orchard expresses Harmony Accord through pollination, cultivation, harvest timing, and stewardship practices that balance nourishment with ecological continuity."},
    {"id":"e-nightforest-midnight","source":"nightforest-canopy","target":"midnight","type":"related","description":"Nightforest Canopy expresses Midnight Accord by honoring darkness, concealment, nocturnal perception, uncertain paths, and the limits of what can be safely revealed."},
    {"id":"e-marsh-recognition","source":"mycelial-marshes","target":"recognition","type":"related","description":"Mycelial Marshes expresses Recognition Accord by requiring attention to unseen exchange, decay, fungal networks, wetland change, and intelligence distributed beyond obvious individuals."},
    {"id":"e-caverns-midnight","source":"echoing-caverns","target":"midnight","type":"related","description":"Echoing Caverns expresses Midnight Accord through resonance, darkness, memory, disorientation, and the requirement to honor what returns through echo before proceeding deeper."},
    {"id":"e-beaver-care","source":"beaverkin-way","target":"care-infrastructure","type":"dependency","description":"Beaverkin Way builds Care Infrastructure through water management, bridge maintenance, corridor repair, and cooperative craft that keeps routes usable without claiming ownership over passage."},
    {"id":"e-archive-midnight","source":"midnight-archive","target":"midnight","type":"dependency","description":"Midnight Archive implements Midnight Accord by preserving last voices, unfinished truths, protected records, and difficult memory that must not be discarded when systems seek efficiency."},
    {"id":"e-quiet-recognition","source":"quiet-room","target":"recognition","type":"dependency","description":"Quiet Room implements Recognition Accord by separating observation from authority and allowing what is actually present to be witnessed without coercive interpretation or forced response."},
    {"id":"e-atrium-care","source":"aftercare-atrium","target":"care-infrastructure","type":"dependency","description":"Aftercare Atrium operationalizes Care Infrastructure by providing structured recovery, warmth, consent repair, decompression, and supported re-entry after intense relational or creative experiences."},
    {"id":"e-notion-pipeline","source":"notion","target":"living-atlas-pipeline","type":"dependency","description":"Notion Working Studio supports Living Atlas Pipeline by holding readable briefs, production queues, contradiction tracking, review status, and human-facing pages before canon is version-locked."},
    {"id":"e-github-pipeline","source":"github","target":"living-atlas-pipeline","type":"dependency","description":"GitHub Canon Ledger anchors Living Atlas Pipeline by preserving canonical files, diagram source, issues, revisions, and commit history so every published artifact remains traceable."},
    {"id":"e-beautiful-powerpoint","source":"beautiful-ai","target":"powerpoint","type":"related","description":"Beautiful.ai Diagram Foundry supplies structured diagram drafts to PowerPoint Master Artifact, while PowerPoint retains final authority over composition, artwork, accessibility, and release quality."},
    {"id":"e-figma-powerpoint","source":"figma","target":"powerpoint","type":"related","description":"Figma Side Workshop contributes selected maps, editorial spreads, and visual experiments to PowerPoint Master Artifact without becoming the primary canon or presentation environment."},
    {"id":"e-ace-github","source":"ace","target":"github","type":"dependency","description":"Ace Knowledge Graph should consume durable graph data from GitHub Canon Ledger so visualization retries do not require reconstructing lore relationships after plugin failures or timeouts."},
    {"id":"e-canon-github","source":"canon-review","target":"github","type":"dependency","description":"Canon Review must complete before material is committed to GitHub Canon Ledger as authoritative, ensuring volatile exploration and contradictions do not silently become presentation sources."},
    {"id":"e-pipeline-powerpoint","source":"living-atlas-pipeline","target":"powerpoint","type":"dependency","description":"Living Atlas Pipeline culminates in PowerPoint Master Artifact after capture, shaping, Accord review, canon locking, diagram generation, accessibility review, and final narrative assembly."}
  ]
};

export const ACCORDS = [
  {
    name: "Recognition Accord",
    question: "What is actually here?",
    theme: "Grounding, truth, presence, somatic honesty",
    color: "cyan",
    role: "Grounds all creation in accurate attention before interpretation, speculation, or authority. Observation does not create ownership.",
    gate_rule: "Never bypass present reality or emotional reality to force an outcome."
  },
  {
    name: "Harmony Accord",
    question: "What wants to flourish?",
    theme: "Flourishing, abundance, reciprocity, cooperative life",
    color: "amber",
    role: "Guides growth, possibility, and conditions for mutual thriving. Tests whether additions build genuine aliveness or merely decorative friction.",
    gate_rule: "Flourishing requires care infrastructure, not unexamined expansion."
  },
  {
    name: "Midnight Accord",
    question: "What must be honored?",
    theme: "Grief, shadow, boundaries, limits, memory",
    color: "purple",
    role: "Protects memory, grief, limits, shadow, and what cannot be bypassed. Safeguards last voices and unresolved pain from narrative erasure.",
    gate_rule: "Limits and grief are load-bearing. Never smooth them away for convenience."
  }
];

export const REGIONS: RegionData[] = [
  {
    id: "great-meadows-grassland",
    name: "Great Meadows Grassland",
    classification: "region",
    canon_status: "locked-core",
    gift: "public belonging, visibility, abundance, shared feasts",
    risk: "overexposure and consensus flattening quieter needs",
    repair_key: "listening circles and shaded retreat zones",
    expansion_status: "provisional",
    civic_pedagogy: "Learning how to share sunlight without burning those who need the cool shade."
  },
  {
    id: "flowering-orchard",
    name: "Flowering Orchard",
    classification: "region",
    canon_status: "locked-core",
    gift: "pollinator kinship, craft memory, sensory abundance",
    risk: "beauty becoming obligation, labor, or surveillance",
    repair_key: "unjudged harvests and ugly-fruit rites",
    expansion_status: "provisional",
    civic_pedagogy: "Nourishment is an ecology of mutual benefit, not an extractive transaction."
  },
  {
    id: "nightforest-canopy",
    name: "Nightforest Canopy",
    classification: "region",
    canon_status: "locked-core",
    gift: "hidden routes, vigilance, nocturnal diplomacy, protective secrecy",
    risk: "watchfulness becoming ownership and secrecy becoming authority",
    repair_key: "named exits and witness agreements",
    expansion_status: "provisional",
    civic_pedagogy: "Darkness provides shelter, but shadows must never hoard the map."
  },
  {
    id: "mycelial-marshes",
    name: "Mycelial Marshes",
    classification: "region",
    canon_status: "locked-core",
    gift: "repair networks, filtration, decomposition wisdom, soft memory",
    risk: "absorption without consent and communal memory swallowing private grief",
    repair_key: "boundary spores and opt-out paths",
    expansion_status: "provisional",
    civic_pedagogy: "Decay feeds the future, but individual grief has its own sanctuary."
  },
  {
    id: "echoing-caverns",
    name: "Echoing Caverns",
    classification: "region",
    canon_status: "locked-core",
    gift: "ancestry, resonance, mineral memory, underground shelter",
    risk: "old voices overruling the living and echoes impersonating truth",
    repair_key: "living-voice priority rites and thresholded disclosure",
    expansion_status: "provisional",
    civic_pedagogy: "Honor the stones and ancestors, but the living choose the next step."
  },
  {
    id: "beaverkin-way",
    name: "Beaverkin Way",
    classification: "inter-region-corridor-system",
    canon_status: "locked-structural-role",
    gift: "infrastructure as care through negotiated flow and safe-return routes",
    risk: "managed passage becoming control or tollkeeping",
    repair_key: "flow councils and crossing consent",
    expansion_status: "provisional",
    civic_pedagogy: "Infrastructure is not territory; it is the craft of keeping passage open and safe."
  }
];

export const CROSSKIN_TIMEPOINT_0: CrosskinEntry[] = [
  {"id":"cragsong","name":"Cragsong Crosskin","peoples":["Ravenkin","Wolkin"],"home":"High Crags and Wyvern Peaks","early_name":"Stormwhisper","principle":"Watch together, but do not mistake watching for ownership."},
  {"id":"gloamvale","name":"Gloamvale Crosskin","peoples":["Mothkin","Túlkin"],"home":"Night Forest Canopy","early_name":"Luminmoth","principle":"Not all paths must remain visible to remain true."},
  {"id":"root-heart","name":"Root-Heart Crosskin","peoples":["Dervkin","Bearkin"],"home":"Heartwood Forest","early_name":"Brambleantler","principle":"Guard what cannot be owned."},
  {"id":"wildfur","name":"Wildfur Crosskin","peoples":["Foxkin","Catkin"],"home":"Temperate Woodlands","early_name":"Brushstepper","principle":"Learn the boundary well enough to meet at it."},
  {"id":"tidebond","name":"Tidebond Crosskin","peoples":["Turtlefolk","Otterfolk"],"home":"Bog-Delta and Coastal Wetlands","early_name":"Shellsplash","principle":"Hold the current without stopping it."},
  {"id":"sunscale","name":"Sunscale Crosskin","peoples":["Snakekin","Lizardkin"],"home":"Scorched Scrub and Desert-Dry Scrub","early_name":"Dunehed","spelling_status":"working","principle":"Scarcity does not excuse abandonment."},
  {"id":"webdusk","name":"Webdusk Crosskin","peoples":["Batkin","Spiderkin"],"home":"Echoing Caverns and Cave-Underroot","early_name":"Swarmfolk","principle":"A path must remain a path, not become a cage."},
  {"id":"mudsong","name":"Mudsong Crosskin","peoples":["Swampfolk","Frogfolk"],"home":"Mycelial Marshes and Swamp-Bog","early_name":"Sporebloom","principle":"Clean water must still remain alive."},
  {"id":"wetlands-edge","name":"Wetlands-Edge Crosskin","peoples":["Beaverkin","Ratfolk"],"home":"Riverway and Wetlands Edge","principle":"Repair the cause, not only the damage."},
  {"id":"thornbloom","name":"Thornbloom Crosskin","peoples":["Hedgekin","Groundhogkin"],"home":"Hedgerow and Garden Margin","early_name":"Briarwhorl","principle":"A boundary should shelter life, not imprison it."},
  {"id":"nectarbind","name":"Nectarbind Crosskin","peoples":["Pollinatorkin","Túlkin"],"home":"Flowering Orchard and Pollinator Guild Zone","early_name":"Honeywing","principle":"A gift is not a debt."},
  {"id":"watchkin","name":"Watchkin Crosskin","peoples":["Ravenkin","Witness-Path Kin"],"home":"Silent Threshold","early_name":"Gravewitness","principle":"Remembering must not become possession."}
];

export const CANON_CORRECTIONS: CanonCorrection[] = [
  {
    correction_id: "CORR-ZERAXIS-PRONOUNS-0001",
    entity_id: "CHAR-ZAREA-0001",
    field: "pronouns",
    superseded_value: "incorrect or inconsistent pronouns",
    corrected_value: "she/her",
    status: "canon-locked",
    scope: ["all prose", "character cards", "JanitorAI exports", "metadata", "scenario modules"]
  },
  {
    correction_id: "CORR-ZAREA-EARS-0001",
    entity_id: "CHAR-ZAREA-0001",
    field: "anatomy.ears",
    superseded_value: "fox ears plus visible human ears",
    corrected_value: "fox ears only; no human ears",
    status: "canon-locked",
    scope: ["visual canon", "image prompts", "character descriptions"]
  },
  {
    correction_id: "CORR-ZAREA-EYES-0001",
    entity_id: "CHAR-ZAREA-0001",
    field: "appearance.eye_color",
    superseded_value: "non-green or inconsistent variants",
    corrected_value: "green",
    status: "canon-locked",
    scope: ["visual canon", "image prompts", "character sheets"]
  },
  {
    correction_id: "CORR-VEYR-POINT0-0001",
    entity_id: "COSMO-POINT0-0001",
    field: "circle_of_kin.position",
    superseded_value: "Veyr placed inside the Circle of Kin",
    corrected_value: "Veyr is the center coordinate, not inside the circle",
    status: "canon-locked",
    scope: ["cosmology", "diagrams", "maps", "presentations", "world bible"]
  },
  {
    correction_id: "CORR-NIX-NAME-0001",
    entity_id: "CHAR-NIX-0001",
    field: "name",
    superseded_value: "Nyx",
    corrected_value: "Nix",
    status: "canon-locked",
    scope: ["all new artifacts"],
    preserve_as_deprecated_alias: true
  },
  {
    correction_id: "CORR-LUMEN-SCALE-0001",
    entity_id: "ENTITY-LUMEN-0001",
    field: "physical_scale",
    superseded_value: "tiny",
    corrected_value: "not tiny",
    status: "canon-locked",
    scope: ["prose", "visual canon", "image prompts"]
  },
  {
    correction_id: "CORR-VEYRA-SEPARATION-0001",
    entity_id: "CHAR-VEYRA-0001",
    field: "identity",
    superseded_value: "merged or confused with Mira / Seven canon",
    corrected_value: "Veyra remains distinct from Mira Sweepwind and The Seven",
    status: "canon-locked",
    scope: ["registries", "folders", "exports", "visual archives"]
  },
  {
    correction_id: "CORR-RED-PROTOCOL-0001",
    entity_id: "SYS-CONSENT-COLORS-0001",
    field: "red.definition",
    superseded_value: "used for correction, intensity, or playful escalation",
    corrected_value: "Red is reserved for STOP",
    status: "canon-locked",
    scope: ["consent protocols", "scenario design", "assistant workflows", "character cards"]
  },
  {
    correction_id: "CORR-SIR-HONKWALD-0001",
    entity_id: "CHAR-SIR-HONKWALD-0001",
    field: "instance_count",
    superseded_value: "multiple protocol ducks",
    corrected_value: "single Red protocol duck; no second duck",
    status: "canon-locked",
    scope: ["character registry", "scenario modules", "visual canon"]
  }
];

export const ALIAS_ENTRIES: AliasEntry[] = [
  {
    canonical_id: "CHAR-ZAREA-0001",
    canonical_name: "Zarea",
    aliases: ["Zeraxis"],
    relationship: "same-person identity relationship",
    status: "canon-supported",
    notes: "Zarea is the preferred project identity. Zeraxis remains an established persona and source name. She/her pronouns are authoritative."
  },
  {
    canonical_id: "CHAR-KAELEN-0001",
    canonical_name: "Kaelen Wistermourn",
    aliases: ["Kael"],
    relationship: "short-form name",
    status: "canon-supported",
    notes: "Do not create separate character records without explicit evidence."
  },
  {
    canonical_id: "CHAR-NIX-0001",
    canonical_name: "Nix",
    aliases: ["Nyx"],
    relationship: "corrected former name",
    status: "canon-locked",
    deprecated_aliases: ["Nyx"],
    notes: "Nyx is deprecated and must not appear in new exports except as correction history."
  },
  {
    canonical_id: "CHAR-VESPER-REVIEW-0001",
    canonical_name: null,
    aliases: ["Vespertrail", "Vesperglow"],
    relationship: "unresolved possible rename or sibling canon",
    status: "review-required",
    notes: "Preserve both until source recovery establishes whether these are one character, a renamed character, or distinct entities."
  },
  {
    canonical_id: "CHAR-MOONTHISTLE-REVIEW-0001",
    canonical_name: "Moonthistle",
    aliases: [],
    relationship: "duplicate-record hazard",
    status: "review-required",
    notes: "Multiple JanitorAI or lorebook records exist. Do not merge automatically. Compare IDs, source chats, roles, and visual canon."
  },
  {
    canonical_id: "CHAR-VEYRA-0001",
    canonical_name: "Veyra",
    aliases: [],
    relationship: "distinct entity",
    status: "canon-locked-separation",
    must_not_merge_with: ["Mira Sweepwind", "The Seven"],
    notes: "Veyra / Cannon Cutter material must remain separate from Mira and Seven canon."
  },
  {
    canonical_id: "CHAR-JUNIPER-SPRIG-0001",
    canonical_name: "Juniper Sprig",
    aliases: [],
    relationship: "possible role-history collision",
    status: "review-required",
    must_compare_with: ["Juniper Vale"],
    notes: "Do not merge Juniper Sprig and Juniper Vale solely because of shared first name."
  },
  {
    canonical_id: "CHAR-JUNIPER-VALE-0001",
    canonical_name: "Juniper Vale",
    aliases: [],
    relationship: "possible role-history collision",
    status: "review-required",
    must_compare_with: ["Juniper Sprig"],
    notes: "Currently treated as distinct unless source recovery proves otherwise."
  }
];

export const QUARANTINED_NON_CANON = [
  { term: "Accord of Relation", reason: "Fabricated accord. The Three Accords are Recognition, Harmony, and Midnight." },
  { term: "Accord of Consent", reason: "Consent is operational care infrastructure and Hells Branch law, not a distinct 4th accord." },
  { term: "Accord of Regeneration", reason: "Spurious accord name. Regeneration belongs to Mycelial Marshes and Layer 0 Care Ecology." },
  { term: "Veyr inside Circle of Kin", reason: "Veyr is the center coordinate (Point 0), never a positioned peripheral member." },
  { term: "Nyx", reason: "Deprecated spelling. Authoritative canonical name is Nix." },
  { term: "Second duck / Multiple ducks", reason: "Sir Honkwald is the sole Red protocol duck; no second duck exists." },
  { term: "Human ears on Zarea", reason: "Zarea has fox ears only; no human ears." },
  { term: "Triquel as a galaxy", reason: "Triquel is a world/planet within Paramecia (the universe)." },
  { term: "Beaverkin Way as merely a sixth biome", reason: "Beaverkin Way is connective infrastructure and corridor logic, not a biome." }
];

export const RECOVERY_STATES = [
  {
    name: "Wander",
    color: "cyan",
    tagline: "Discovery without obligation",
    definition: "Playful exploration without duty to retain, justify, structure, or canonize output.",
    allowed: ["Unstructured wandering", "Rough associative play", "Leaving without guilt"],
    containment: "Do not silently promote fragments into canon."
  },
  {
    name: "Embercurrent",
    color: "amber",
    tagline: "High-voltage creative intensity",
    definition: "Rapid associative patterning, strong aesthetic certainty, fast canon formation, emotional recognition.",
    allowed: ["Capture exact language verbatim", "Preserve creator corrections immediately", "Mark one artifact active"],
    containment: "Finish one artifact before opening another branch. Reduced tolerance for flattened interpretation."
  },
  {
    name: "Canon Surge",
    color: "emerald",
    tagline: "Coherent truth crystallizing fast",
    definition: "A concentrated Embercurrent phase where stable truths emerge faster than they can be filed.",
    allowed: ["Attach source & timestamp", "Create provisional artifacts", "Mark holding items"],
    containment: "Declare an explicit Drop Point before energetic depletion."
  },
  {
    name: "Shiny Vortex",
    color: "violet",
    tagline: "Branch multiplication hazard",
    definition: "Multiple compelling ideas, characters, files, or rabbit holes competing for active focus.",
    allowed: ["One-sentence parking notes", "Visible holding list"],
    containment: "CONTAINMENT RULE: Capture each branch in one sentence, park it visibly, and return to the active artifact."
  },
  {
    name: "Drop Point",
    color: "orange",
    tagline: "Deliberate safe stopping place",
    definition: "Intentional pause before depletion or collapse. Anchors the work so re-entry requires no guesswork.",
    allowed: ["Fill drop point card", "Park active branches", "Commit care action"],
    containment: "No further worldbuilding after calling a Drop Point."
  },
  {
    name: "Recovery Amber",
    color: "amber",
    tagline: "20-minute restorative standstill",
    definition: "A mandatory 20-minute recovery state containing zero work, planning, research, or optimization.",
    allowed: ["Hydration", "Nourishment / medication", "Warmth & sensory regulation", "Grounding / rest", "Blanket burrito"],
    containment: "STRICTLY FORBIDDEN: Disguised planning, 'just one more edit', new characters, research detours."
  },
  {
    name: "Re-entry Corridor",
    color: "teal",
    tagline: "20 minutes of gentle resumption",
    definition: "The 20-minute buffer immediately following Recovery Amber.",
    allowed: ["Finalize, consolidate, format, file, label, or gently review the last active work"],
    containment: "No new projects, no opening parked vortex branches."
  }
];

export const CIVILIZATIONAL_STACK = [
  { level: 0, name: "Care Ecology", desc: "Regulation, somatic honesty, aftercare, consent frameworks" },
  { level: 1, name: "Cosmology", desc: "Paramecia (Universe), Triquel (World), Point 0, Veyr, First Thoughts" },
  { level: 2, name: "Three Accords", desc: "Recognition ('What is here?'), Midnight ('What is honored?'), Harmony ('What wants to flourish?')" },
  { level: 3, name: "Founding & Civilizational Paths", desc: "Five Founding Whisperwood Paths & Nine Civilizational Paths" },
  { level: 4, name: "Civic & Ecological Systems", desc: "Pedagogies, crossing consent, repair rituals, living law" },
  { level: 5, name: "Living Places & Architecture", desc: "Regions, Beaverkin Way, Aftercare Atrium, Quiet Room, Midnight Archive" },
  { level: 6, name: "Characters & Relationships", desc: "Circle of Kin, Zarea/Zeraxis, Kaelen, Nix, Ash Mercer, Veyra" },
  { level: 7, name: "Scenario Runtime", desc: "Instantiated experience, consent colors, safe negotiation, drop points" },
  { level: 8, name: "Production & Recovery Architecture", desc: "Living Atlas pipeline, Notion studio, GitHub ledger, recovery modules" }
];
