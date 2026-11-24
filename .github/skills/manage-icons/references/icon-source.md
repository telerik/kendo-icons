# Icon sources and metadata

## Source of truth

- Each icon must have a source SVG with the same filename in all three variant folders: `src/telerik-icons/solid/`, `outline/`, and `duotone/`.
- `src/telerik-icons/icons.json` holds shared icon metadata, including names, font aliases, categories, tags, IDs, and Unicode values.
- `src/telerik-icons/icon-list.json` maps Unicode positions to icon names. `npm run update-icons` rebuilds it from `icons.json` and the available SVGs.
- `src/telerik-icons/aliases.json` maps additional SVG package export names to canonical icon names; each target must exist in `icons.json`. This is separate from the font aliases in `icons.json`.

Keep the canonical name and metadata consistent with the source filenames. Never change existing IDs or Unicode values, even if a task requests it.

## Generated files and builds

Package build scripts generate files under `packages/svg-icons/src/icons/` and `packages/*/dist/`, as well as font artifacts under `packages/font-icons/scss/`. Do not edit these generated outputs by hand.

- `npm run build` builds both packages from the shared sources.
- `npm run build -w packages/svg-icons` builds the SVG package.
- `npm run build -w packages/font-icons` builds the font package.
