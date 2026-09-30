# Felix.Null Integration Layer

Felix.Null uses this directory as the executable bridge between Paramecia's durable knowledge systems and Google-hosted runtimes.

## Roles

- **GitHub** is the versioned source of truth for executable integration code.
- **Google Drive** is the durable artifact habitat and handoff layer.
- **Google Colab** is the compute/runtime laboratory for notebooks, transforms, prototypes, validation, and generated artifacts.
- **Google Apps Script** is the Google-native automation layer for Drive, Docs, Sheets, triggers, and lightweight web endpoints.
- **Mem / Wisebase** remains the semantic-memory and knowledge-graph layer.

## Drive anchors

- Felix Zone: `1LO3aiYRbEA6qUXDQ6D8DG8tzQyAyw1Xp`
- Build Lab: `1wxGmFrEQV8rUmK_jfKStRuyNAM_QAlnR`
- Colab Runtime: `1vrv3ElM_2hfDrX0mKSww1QEnBgfRueJb`
- Apps Script Automation: `1mqD7vvtsc7PyuynTJ3_SiFRz4baDhoU5`

## Safety / stewardship contract

1. Preserve raw sources before normalization.
2. Never silently promote proposed material to canon.
3. Never store credentials, OAuth tokens, service-account JSON, API keys, or user secrets in this repository.
4. Prefer reversible writes and explicit logs.
5. Generated outputs go to the Drive `06_CREATED OUTPUTS` surface or a task-specific child folder.
6. Experimental code belongs in the sandbox/build path until validated.
7. Canon-facing writes should pass validation before promotion.

## Layout

```text
integrations/felix-null/
├── README.md
├── manifest.json
├── colab/
│   └── felix_bridge.ipynb
└── apps-script/
    ├── README.md
    ├── appsscript.json
    └── Code.gs
```

Nothing flourishes alone.
