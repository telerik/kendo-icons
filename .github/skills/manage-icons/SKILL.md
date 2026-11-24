---
name: manage-icons
description: Add, edit, or remove Kendo icon SVGs, metadata, or aliases, and update the generated SVG and font icon packages. Use for icon asset and package-generation changes.
metadata:
  internal: true
---

# Manage icons

Read [references/icon-source.md](references/icon-source.md) before changing icon sources or metadata.

For icon additions or removals, update the source SVGs, then run `npm run update-icons` to generate or update metadata and `icon-list.json`. Do not manually create metadata for new icons. Add relevant tags by hand after generation and review the changes before building.

Do not hand-edit generated package outputs. Run `npm run build` to regenerate both packages, or build only the affected package when the change is package-specific.
