# Kendo Icon Variants - Style Guide

## Overview

This guide defines the- Ensure consistent stroke width throughout icon

**Example**: `outline/plus.svg`

```xmlual specifications and conversio- Ensure visual hierarchy is clear

**Example**: `duotone/home.svg`

```xmlles for creating **solid**, **outline**, and **duotone** variants of Kendo UI icons.

**Goal**: Maintain visual consistency across all 807 icons × 3 variants = 2,421 total icons.

## ✅ Template Examples Created

5 template icons have been manually created to establish the style guide:

1. **plus** - Simple geometric (lines)
2. **star** - Polygon shape  
3. **home** - Combined shapes (roof + house)
4. **menu** - Multiple elements (3 lines)
5. **bell** - Complex shape with multiple parts

## 📐 Specifications

### Common Standards (All Variants)

- **ViewBox**: `0 0 512 512` (always)
- **Width/Height**: `512` (always)
- **Color**: `currentColor` (inherits from parent)
- **XML Declaration**: `<?xml version="1.0" encoding="utf-8"?>`
- **Namespace**: `xmlns="http://www.w3.org/2000/svg"`

### Solid Icons

**Style**: Filled shapes without strokes

```xml
<path d="..." fill="currentColor"/>
```

**Characteristics**:

- Single fill color
- No strokes
- Medium to bold visual weight
- Full detail level

**Example**: `solid/plus.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <path d="M288 224V96h-64v128H96v64h128v128h64V288h128v-64H288z"/>
</svg>
```

### Outline Icons

**Style**: Stroked paths without fill

```xml
<path d="..." stroke="currentColor" stroke-width="48" stroke-linecap="round" fill="none"/>
```

**Specifications**:

- **Fill**: `none`
- **Stroke**: `currentColor`
- **Stroke Width**: `32-48px` (adjust by complexity)
  - Simple icons (lines, crosses): `48px`
  - Medium complexity: `40px`
  - Complex/detailed: `32px`
- **Linecap**: `round` (for line endings)
- **Linejoin**: `round` (for corner joints)
- **Visual Weight**: Medium

**Conversion Rules**:

1. Extract geometric centerline/outline from solid shape
2. Apply stroke instead of fill
3. Simplify detail if needed (combine small elements)
4. Ensure consistent stroke width throughout icon

**Example**: `outline/plus.svg`
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <path d="M256 64v384M64 256h384" 
        stroke="currentColor" stroke-width="48" stroke-linecap="round" fill="none"/>
</svg>
```

### Duotone Icons

**Style**: Two-layer composition with different opacities

```xml
<!-- Background layer (40% opacity) -->
<path d="..." fill="currentColor" opacity="0.4"/>
<!-- Foreground layer (100% opacity) -->
<path d="..." fill="currentColor"/>
```

**Specifications**:

- **Primary (Foreground)**: `currentColor` at `100%` opacity
- **Secondary (Background)**: `currentColor` at `40%` opacity (`opacity="0.4"`)
- **Layers**: 2 distinct visual layers
- **Hierarchy**: Background = supporting, Foreground = focal

**Layer Separation Strategy**:

1. **Background**: Larger/outer shapes, containers, base structure
2. **Foreground**: Smaller/inner details, focal points, accents

**Conversion Rules**:

1. Analyze solid icon structure
2. Identify logical layer split (back vs front, container vs content)
3. Apply 40% opacity to background elements
4. Keep 100% opacity for foreground elements
5. Ensure visual hierarchy is clear

**Example**: `duotone/home.svg`
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <!-- Background house (40% opacity) -->
  <path d="M80 240L256 80 432 240v192H80V240z" fill="currentColor" opacity="0.4"/>
  <!-- Foreground door (100% opacity) -->
  <rect x="208" y="320" width="96" height="112" fill="currentColor"/>
</svg>
```

## 🎨 Icon Complexity Classification

### Simple Icons

- Single element or 2-3 basic shapes
- **Stroke Width (Outline)**: 48px
- **Examples**: plus, minus, close, check

### Medium Icons

- 3-5 elements or moderate detail
- **Stroke Width (Outline)**: 40px
- **Examples**: home, star, bell, user

### Complex Icons

- 6+ elements or intricate detail
- **Stroke Width (Outline)**: 32px
- **Examples**: detailed illustrations, compound shapes

## 📋 Conversion Workflow

### Solid → Outline

1. **Analyze Structure**: Identify main paths and shapes
2. **Extract Centerlines**: Convert filled shapes to stroked paths
3. **Simplify**: Combine small elements, reduce detail if needed
4. **Apply Stroke**: Set width based on complexity (32-48px)
5. **Set Attributes**: `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
6. **Validate**: Check visual weight consistency

### Solid → Duotone

1. **Analyze Structure**: Identify visual hierarchy
2. **Split Layers**: Separate into background and foreground
   - Background: Outer shell, container, base structure
   - Foreground: Inner details, focal elements, accents
3. **Apply Opacity**: Background at `0.4`, foreground at `1.0`
4. **Order Elements**: Background first, foreground second in SVG
5. **Validate**: Check contrast and hierarchy

## ✅ Quality Checklist

### All Variants

- [ ] ViewBox is `0 0 512 512`
- [ ] Width and height are `512`
- [ ] Uses `currentColor` for themability
- [ ] Proper XML declaration
- [ ] Clean, optimized paths

### Outline Specific

- [ ] `fill="none"` attribute present
- [ ] Stroke width appropriate for complexity
- [ ] `stroke-linecap="round"` for line endings
- [ ] `stroke-linejoin="round"` for corners
- [ ] No tiny gaps or artifacts

### Duotone Specific

- [ ] Exactly 2 opacity levels (0.4 and 1.0)
- [ ] Clear visual hierarchy
- [ ] Background elements listed first
- [ ] Foreground elements listed second
- [ ] Logical layer separation

## 🎯 Testing & Validation

Test icons in:

1. **Light theme** (light background)
2. **Dark theme** (dark background)
3. **Different sizes**: 16px, 24px, 32px, 48px, 64px
4. **Color variations**: Primary, secondary, success, warning, error

Ensure:

- Readable at all sizes
- Sufficient contrast
- No visual artifacts
- Consistent visual weight within category

## 📊 Icon Variants Matrix

| Style | Fill | Stroke | Opacity | Use Case |
|-------|------|--------|---------|----------|
| **Solid** | currentColor | none | 1.0 | Default, high contrast, small sizes |
| **Outline** | none | currentColor (32-48px) | 1.0 | Modern, minimal, larger sizes |
| **Duotone** | currentColor | none | 0.4 + 1.0 | Depth, hierarchy, medium/large sizes |

## 🚀 Pilot Batch Status

**Templates Created** (5/30):

- ✅ plus (solid, outline, duotone)
- ✅ star (solid, outline, duotone)
- ✅ home (solid, outline, duotone)
- ✅ menu (solid, outline, duotone)
- ✅ bell (solid, outline, duotone)

**Remaining** (25/30):

- file, upload, save, download, image-add, image-edit, volume-down, volume-up, download-light, file-add, folder-add, folder-up, file-error, files-error, cancel-circle, file-audio, file-image, file-video, filter-add-group, filter-add-expression, image-map-editor, file-disc-image, padding-left, padding-right, all

## 📝 Next Steps

1. ✅ Create 5 template examples
2. ✅ Document style guide
3. ⏳ Build semi-automated converter tool
4. ⏳ Generate remaining 25 pilot batch icons
5. ⏳ QA and refine
6. ⏳ Scale to all 807 icons

---

**Version**: 1.0  
**Date**: October 3, 2025  
**Status**: Templates Complete, Ready for Tool Development
