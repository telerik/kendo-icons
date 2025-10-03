# Kendo Icon Generator - Composition Approach

> **Clean, focused icon generation using geometric primitives**

A streamlined system for generating professional Kendo UI icons by composing reusable geometric shapes. No bitmap processing, no complex AI dependencies - just pure, predictable SVG composition.

## 🎯 Philosophy

**Composition over Generation**: Instead of generating complete SVG code or vectorizing images, we combine hand-crafted geometric primitives like building blocks to create icons.

```
Primitives:  circle + triangle + rectangle  →  Icon: 🏠 home
```

## ✨ Key Features

- **🚀 Instant Generation** - Predefined recipes generate in <1ms
- **💎 Perfect Quality** - Hand-crafted geometric primitives
- **📦 60+ Recipes** - Ready-to-use common icons
- **🔧 70+ Primitives** - Comprehensive shape library
- **✅ Consistent** - Shared primitives ensure visual unity
- **💰 Free** - No AI costs, no API keys needed
- **🎨 Clean SVG** - 3-10 paths per icon (vs thousands from vectorization)
- **📝 Type-Safe** - Full TypeScript support

## 🚀 Quick Start

### Installation

```bash
cd packages/icon-generator
npm install
npm run build
```

### Generate an Icon

```bash
# Single variant
npm run generate home

# Multiple variants
npm run generate rocket -- --variants solid,outline

# Force overwrite
npm run generate star -- --force
```

### List Available Icons

```bash
npm run generate list
```

## 📚 Available Commands

### `generate <iconName>`

Generate icon from predefined recipe.

```bash
npm run generate home
npm run generate star -- --variants solid,outline,duotone
npm run generate check -- --force --output ./my-icons
```

**Options:**
- `-v, --variants <variants>` - Comma-separated variants (default: `solid`)
- `-o, --output <path>` - Output directory (default: `./src/telerik-icons`)
- `-f, --force` - Overwrite existing files

### `list`

List all available icon recipes.

```bash
npm run generate list
npm run generate list -- --count  # Show count only
```

### `batch <file>`

Generate multiple icons from JSON file.

```bash
npm run generate batch icons.json
npm run generate batch icons.json -- --force
```

**Batch file format:**
```json
{
  "icons": [
    { "iconName": "home", "variants": ["solid"] },
    { "iconName": "star", "variants": ["solid", "outline"] },
    { "iconName": "check", "variants": ["solid", "outline", "duotone"] }
  ]
}
```

### `primitives`

List all available geometric primitives.

```bash
npm run generate primitives
```

### `info <iconName>`

Show information about an icon recipe.

```bash
npm run generate info home
```

## 🎨 Available Icons (60+ Recipes)

### Navigation
home, search, menu, arrow-left, arrow-right, arrow-up, arrow-down, chevron-left, chevron-right, chevron-up, chevron-down

### Actions
plus, minus, close, check, edit, delete, copy, download, upload

### Settings & Tools
settings, filter, sort

### Status & Feedback
star, heart, info, warning, error, success, help

### Communication
bell, mail, chat, phone

### Media
play, pause, stop, volume, image

### Documents
document, folder, calendar, clock

### Tech & Code
code, link, cloud, lock, unlock

### Shopping
cart

### Misc
flag, pin, bookmark, tag, rocket

## 🔧 Primitives Library (70+)

### Basic Shapes
`circle`, `ring`, `square`, `rectangle`, `roundedRect`, `ellipse`

### Triangles
`triangleUp`, `triangleDown`, `triangleLeft`, `triangleRight`

### Polygons
`pentagon`, `hexagon`, `octagon`, `diamond`

### Stars
`star3`, `star4`, `star5`, `star6`, `star8`

### Arrows & Chevrons
`arrowUp`, `arrowDown`, `arrowLeft`, `arrowRight`, `chevronUp`, `chevronDown`, `chevronLeft`, `chevronRight`

### Lines
`horizontalLine`, `verticalLine`, `diagonalLineNE`, `diagonalLineNW`

### Curves
`arc`, `quarterCircle`, `wave`

### Symbols
`checkmark`, `cross`, `plus`, `minus`, `equals`, `dot`, `question`, `exclamation`, `heart`, `infinity`

### Containers
`frame`, `roundedFrame`, `badge`

### Composite
`gear`, `cloud`, `bell`, `flag`

## 📖 Programmatic API

### Basic Usage

```typescript
import { IconGenerator } from '@progress/kendo-icon-generator';

const generator = new IconGenerator({
  outputDir: './icons'
});

// Generate single icon
const results = await generator.generate({
  iconName: 'home',
  variants: ['solid', 'outline']
});

// List recipes
const recipes = generator.listRecipes();
console.log(recipes); // ['home', 'star', 'check', ...]
```

### Batch Generation

```typescript
const results = await generator.generateBatch([
  { iconName: 'home', variants: ['solid'] },
  { iconName: 'star', variants: ['solid', 'outline'] },
  { iconName: 'check', variants: ['solid', 'outline', 'duotone'] }
]);
```

### Custom Compositions

```typescript
import { CompositionEngine } from '@progress/kendo-icon-generator';

const engine = new CompositionEngine();

// Create custom composition
const svg = engine.compose({
  name: 'custom-icon',
  variant: 'solid',
  viewBox: '0 0 512 512',
  steps: [
    { primitive: 'circle', options: { x: 256, y: 256, size: 300 } },
    { primitive: 'star5', options: { x: 256, y: 256, size: 150, color: 'white' } }
  ]
});

console.log(svg); // <svg xmlns...>...</svg>
```

### Adding Custom Recipes

```typescript
const engine = new CompositionEngine();

engine.addRecipe({
  name: 'my-icon',
  variant: 'solid',
  description: 'My custom icon',
  tags: ['custom'],
  steps: [
    { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
    { primitive: 'plus', options: { x: 256, y: 256, size: 150, color: 'white' } }
  ]
});

const svg = engine.compose(engine.getRecipe('my-icon')!);
```

## 🎯 Architecture

```
User Request
    ↓
CLI
    ↓
IconGenerator
    ↓
CompositionEngine
    ├── Get Recipe
    ├── Apply Primitives
    └── Compose SVG
    ↓
SvgOptimizer
    ↓
File System
```

### Clean Structure

```
src/
├── primitives.ts          # 70+ geometric primitives
├── composition-engine.ts  # Recipe library & composition logic
├── composition-types.ts   # TypeScript types
├── icon-generator.ts      # Main orchestrator
├── svg-optimizer.ts       # SVGO integration
├── cli-new.ts            # Command-line interface
└── index-new.ts          # Public API exports
```

## 📊 Performance

| Metric | Value |
|--------|-------|
| Generation Time | <1ms per icon |
| SVG Size | 200-800 bytes (optimized) |
| Path Count | 3-10 paths |
| Dependencies | 7 (minimal) |
| Code Quality | 100% TypeScript |

## 🔄 Migration from Old Approach

The previous system included:
- ❌ Bitmap vectorization (slow, poor quality)
- ❌ AI image generation (expensive, inconsistent)
- ❌ Complex dependencies (Sharp, Potrace, SD WebUI)

**New system benefits:**
- ✅ Instant generation
- ✅ Perfect quality
- ✅ Minimal dependencies
- ✅ Zero cost
- ✅ Predictable results

## 🛠️ Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Test Generation

```bash
npm run generate list
npm run generate home
npm run generate rocket -- --variants solid
```

## 📝 Creating Custom Recipes

Edit `src/composition-engine.ts` and add to the recipes array:

```typescript
{
  name: 'my-custom-icon',
  variant: 'solid',
  description: 'My custom icon description',
  tags: ['custom', 'special'],
  steps: [
    { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
    { primitive: 'star5', options: { x: 256, y: 256, size: 200, color: 'white' } }
  ]
}
```

Then rebuild:

```bash
npm run build
npm run generate my-custom-icon
```

## 🧩 Creating Custom Primitives

Edit `src/primitives.ts` and add your primitive function:

```typescript
export const myShape: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor' } = opts;
  // Generate SVG markup
  return `<path d="..." fill="${color}"/>`;
};

// Add to primitives export
export const primitives = {
  // ... existing primitives
  myShape
};

// Add to categories
export const categories = {
  // ... existing categories
  'my-category': ['myShape']
};
```

## 🎨 Design Guidelines

### For Recipes
1. Use 3-7 primitives per icon (keep it simple)
2. Center icons at (256, 256)
3. Main elements: 200-400px size
4. Details: 40-100px size
5. Use `currentColor` for theme compatibility
6. Layer logically (background first)

### For Primitives
1. Accept standard PrimitiveOptions
2. Use relative coordinates
3. Provide sensible defaults
4. Return clean SVG markup
5. Support color/opacity/strokeWidth
6. Document behavior

## 📄 License

Apache-2.0 © Progress Software Corporation

## 🤝 Contributing

1. Add primitives to `primitives.ts`
2. Create recipes in `composition-engine.ts`
3. Build and test
4. Submit pull request

---

**Built with ❤️ by the Kendo UI team**
