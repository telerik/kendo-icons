---
name: manage-icons
description: Add, edit, or remove Kendo icon SVGs, metadata, or aliases, and update the generated SVG and font icon packages. Use for icon asset and package-generation changes.
metadata:
  internal: true
---

# Manage icons

## Source of truth

- Each icon must have a source SVG with the same filename in all three variant folders: `src/telerik-icons/solid/`, `outline/`, and `duotone/`.
- `src/telerik-icons/icons.json` holds shared icon metadata, including names, font aliases, categories, tags, IDs, and Unicode values.
- `src/telerik-icons/icon-list.json` maps Unicode positions to icon names. `npm run update-icons` rebuilds it from `icons.json` and the available SVGs.
- `src/telerik-icons/aliases.json` maps additional SVG package export names to canonical icon names; each target must exist in `icons.json`. This is separate from the font aliases in `icons.json`.

Keep the canonical name and metadata consistent with the source filenames. Never change existing IDs or Unicode values, even if a task requests it.

## Workflow

For icon additions or removals, update the source SVGs, then run `npm run update-icons` to generate or update metadata and `icon-list.json`. Do not manually create metadata for new icons. Add relevant tags by hand after generation and review the changes before building.

Package build scripts generate files under `packages/svg-icons/src/icons/` and `packages/*/dist/`, as well as font artifacts under `packages/font-icons/scss/`. Do not edit these generated outputs by hand.

- `npm run build` builds both packages from the shared sources.
- `npm run build -w packages/svg-icons` builds the SVG package.
- `npm run build -w packages/font-icons` builds the font package.
