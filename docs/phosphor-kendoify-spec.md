# Phosphor → Kendo: Icon Transformation Spec

Each Phosphor icon goes through these exact transformations:

| | **Original Phosphor** | **Kendo Output** |
|---|---|---|
| **Canvas** | 256 × 256 px viewBox | 24 × 24 px viewBox |
| **Content area** | Edge-to-edge (256 × 256) | 21.6 × 21.6 px centered (1.2 px padding on all sides) |
| **Visual weight** | Fills the full canvas | 10% smaller — consistent breathing room around every icon |
| **Color** | Hardcoded hex values (e.g. `#000`) | `currentColor` — inherits from CSS/theme |
| **Background rect** | 256×256 invisible bounding box present | Stripped — removed entirely |
| **Rectangle corners** | Varies per icon (sharp or rounded) | Normalized: max **1.25 px** radius; sharp rects get **0.75 px** |
| **Stroke attributes** | May have stroke-width, linejoin, linecap from source | All stripped — output is pure fill, no strokes |
| **Path coordinates** | Absolute, large numbers (256-scale) | Relative, small numbers (24-scale), rounded to 3 decimals |
| **Optimization** | Raw, unoptimized SVG | SVGO-optimized (cleaned metadata, stripped IDs/classes/data attrs) |

## Per-Variant Differences

| | **Outline** | **Solid** | **Duotone** |
|---|---|---|---|
| **Phosphor source weight** | Light (thin strokes rendered as fills) | Fill (bold filled shapes) | Duotone (two-layer fills with opacity) |
| **Shape structure** | Individual shapes preserved (multi-path) | All paths merged into one single path | Two layers preserved separately |
| **Layer opacity** | — | — | Background: **0.2** (20%), Foreground: **1.0** |
| **Strokes in output** | None | None | None |

## In Plain English

We take Phosphor's 256px icons, shrink them into a 21.6px content area inside a 24px canvas (adding uniform padding), swap all colors to `currentColor`, clean up rectangles to have consistent rounded corners, strip all strokes (these are fill-only icons), and run SVGO to minimize file size. The only difference between variants is whether shapes stay separate (outline), get merged into one silhouette (solid), or keep two opacity layers (duotone).
