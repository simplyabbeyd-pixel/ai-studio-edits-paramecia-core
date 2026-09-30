# Felix.Null Apps Script Bridge

This Apps Script project is the Google-native automation limb for Felix.Null.

## Intended capabilities

- Read/write within explicitly configured Drive folders.
- Create lightweight automation around Docs, Sheets, and Drive metadata.
- Expose a minimal health endpoint when deployed as a web app.
- Log actions rather than silently mutating project state.

## Recommended sync path

Use `clasp` from a trusted local machine or CI runner:

```bash
npm install -g @google/clasp
clasp login
clasp create --type standalone --title "Felix.Null Bridge"
clasp push
```

Then copy the generated `.clasp.json` into this directory locally. Do **not** commit OAuth tokens or local credential files.

## Script properties

Set these in Apps Script Project Settings → Script Properties:

- `FELIX_ZONE_ID=1LO3aiYRbEA6qUXDQ6D8DG8tzQyAyw1Xp`
- `BUILD_LAB_ID=1wxGmFrEQV8rUmK_jfKStRuyNAM_QAlnR`
- `COLAB_RUNTIME_ID=1vrv3ElM_2hfDrX0mKSww1QEnBgfRueJb`
- `APPS_SCRIPT_AUTOMATION_ID=1mqD7vvtsc7PyuynTJ3_SiFRz4baDhoU5`

## Guardrails

The starter code only exposes non-destructive health/status operations. Add write operations deliberately and log every mutation.
