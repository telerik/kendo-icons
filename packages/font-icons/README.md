# Kendo Font Icons

This package contains the Kendo UI font icons, the related CSS and the font files needed to use them in your project.

## Global font choice

Use the existing `scss/all.scss` or precompiled `dist/index.css` entry point
for every variant. There are no variant classes or additional stylesheets:
the selected font file determines the appearance of all font icons.
The default remains outline.

### Sass

Choose the font through the existing `$ki-font-file-url` variable:

```scss
@use '@progress/kendo-font-icons/scss/all.scss' as * with (
    $ki-font-file-url: '/fonts/kendo-font-icons-duotone.ttf'
);
```

Serve the selected font at that URL. Use `kendo-font-icons-solid.ttf` for solid
or `kendo-font-icons.ttf` for outline. No `$ki-font-family` change is needed.
Font URLs follow the same bundler/static-asset resolution rules as before.

The existing `$ki-embed-font: true` option continues to embed the bundled
outline font instead of using `$ki-font-file-url`. To embed a different font,
provide its data URI through the existing `$ki-font-url` override.

### Precompiled CSS

Load only `dist/index.css`. It references `kendo-font-icons.ttf` beside the
stylesheet. To select a variant without recompiling or editing the CSS,
deploy the desired TTF under that filename. For example:

```sh
cp node_modules/@progress/kendo-font-icons/dist/index.css public/icons/index.css
cp node_modules/@progress/kendo-font-icons/dist/kendo-font-icons-duotone.ttf public/icons/kendo-font-icons.ttf
```

```html
<link rel="stylesheet" href="/icons/index.css">
<span class="k-icon k-font-icon k-i-home" aria-hidden="true"></span>
```

The markup, icon names, aliases, primary codepoints, sizing, rotation, and flip
classes are identical for all variants. Give an icon-only control an accessible
name on the control; font glyphs are not meaningful text.

### Runtime customization

Size and rotation retain the existing CSS custom properties, and `color`
continues to set the icon color. No additional customization variables are
needed for the font variants:

```css
.toolbar-actions .k-font-icon {
    font-size: 24px;
    color: #174ea6;
}
```

Both layers inherit the icon color. The secondary layer's opacity is generated
from the source artwork: normally 20%, or the effective opacity of uniformly
overlapping source fills (for example, `perimeter` uses 36%). There is no
separate primary-color, secondary-color, or secondary-opacity variable.

Set `--kendo-icon-size` on `:root` for global scaling. For scoped sizing, set
`font-size` on the icon wrapper or override the applicable size variable,
such as `--kendo-icon-size-md`. Setting only `--kendo-icon-size` on a descendant
does not replace size-specific values already inherited from the root; this
is unchanged from the outline-only stylesheet.

### Boundaries

- Fonts have fixed stroke weight; SVG's runtime stroke-width control does not
  apply. The existing rasterize-and-trace pipeline approximates SVG curves.
- The shared stylesheet reserves `::before` and `::after` on font icons.
  Remove conflicting application pseudo-element styling. Style the wrapper
  for shared sizing and color; `::before`-only overrides affect the foreground,
  not the secondary layer.
- All three fonts include secondary codepoints. Outline and solid map them to
  blank glyphs, while duotone provides the secondary artwork. Upgrade the CSS
  and font together; older fonts lack these blanks and may display fallback
  characters with the new CSS (confirmed in Firefox). Version or cache-bust
  font URLs alongside CSS to prevent stale cached fonts. Custom fonts also
  need the secondary mappings, including blanks for monochrome artwork.
- Secondary glyphs use supplementary private-use codepoints derived from the
  existing primary codepoint. Consumers should use CSS classes, not these
  implementation-specific secondary codes. The choice is global, not a way
  to mix variants on individual icons.
- This spike adds presentation choices, not new component-library properties
  or C# enum values. It does not use a browser-specific color-font format.
- The generator supports black paints at opacity 1 or 0.2 and retains clipping
  definitions. It checks the source against the composited layers during the
  build, allowing subpixel edge differences but rejecting materially different
  compositing or multiple background opacity levels within one icon.
  Unsupported constructs fail with the icon name rather than flattening.

The compositing check runs at the 192px tracing resolution. It allows alpha
differences above 4/255 in at most 0.5% of the image pixels, to accommodate
antialiased edges. This checks layer separation, not the subsequent tracing
approximation.

The shared CSS includes secondary mappings even for monochrome fonts. Only
one font file is referenced and loaded. The TTFs are not WOFF2-compressed.
Customization and catalog switching were exercised in Chrome, Firefox, and
Safari/WebKit on macOS, including all 828 icons and 86 aliases per font,
Sass configuration, rapid switching, and blank monochrome secondary glyphs.
Chrome and Firefox additionally passed pixel-overlay alignment checks and
failed-load/out-of-order selection checks. This remains a spike, not a
production compatibility certification for other operating systems or
component-library integrations.

From the repository root, build with
`npm run build --workspace=@progress/kendo-font-icons` and run the focused
regressions with `npm test --workspace=@progress/kendo-font-icons`.
