# Diagram Tool Routing

## Canonical rule

All reusable diagram logic must have a durable source in GitHub before or alongside visual generation.

## Primary routes

### Mermaid in GitHub
Use for versioned, canonical diagrams that must remain reproducible, reviewable, and independent of third-party credits.

Best for:
- workflows
- Accord gates
- state and process logic
- entity relationships
- presentation architecture
- fallback copies of knowledge networks

### Beautiful.ai
Use for presentation-native diagrams that benefit from polished slide structures.

Best for:
- process diagrams
- timelines and Gantt charts
- Venn diagrams
- cycles
- hub-and-spoke systems
- journeys
- comparisons
- funnels and charts

Beautiful.ai output is not the canonical source. The underlying wording and relationship logic must remain in GitHub.

### PowerPoint
PowerPoint remains the master presentation artifact. Import or rebuild selected Beautiful.ai and Mermaid outputs here, then apply final narrative, artwork, accessibility, and canon review.

## Optional side routes

### Figma and FigJam
Use selectively for editorial layouts, maps, title spreads, and visual experiments. Do not use Figma as the canon ledger.

### Ace Knowledge Graph
Ace is optional and credit-dependent. Use only when the service is available and a stable GitHub graph source already exists.

If Ace fails, times out, requires human verification, or lacks credits:
1. Stop retrying after one lightweight health check.
2. Preserve or update the graph source in `knowledge-graphs/`.
3. Render a Mermaid or Beautiful.ai substitute.
4. Continue the primary workflow without blocking publication.

## Current fallback source

- `knowledge-graphs/triquel-relational-network.json`

This file preserves the flat many-to-many Triquel network for later Ace import or conversion into other graph formats.

## Routing principle

No presentation or canon task may depend on a single credit-limited visual service. GitHub remembers, Mermaid reproduces, Beautiful.ai structures, and PowerPoint tells the final story.
