# Quick Reference Guide

## 🚀 Getting Started

```bash
# Build the project
npm run build

# List all available icons
npm run icon-gen -- list

# Generate an icon
npm run icon-gen -- generate home --force
```

## 📋 Common Commands

### Generate Single Icon
```bash
npm run icon-gen -- generate <iconName> --force
```

Examples:
```bash
npm run icon-gen -- generate home --force
npm run icon-gen -- generate star --force
npm run icon-gen -- generate rocket --force
```

### Generate with Specific Variant
```bash
npm run icon-gen -- generate <iconName> --variants <variant> --force
```

Example:
```bash
npm run icon-gen -- generate star --variants solid --force
```

### Batch Generation
```bash
npm run icon-gen -- batch <file.json> --force
```

Example batch file (`my-icons.json`):
```json
{
  "icons": [
    { "iconName": "home", "variants": ["solid"] },
    { "iconName": "star", "variants": ["solid"] },
    { "iconName": "check", "variants": ["solid"] }
  ]
}
```

Then run:
```bash
npm run icon-gen -- batch my-icons.json --force
```

### List All Primitives
```bash
npm run icon-gen -- primitives
```

### Get Recipe Info
```bash
npm run icon-gen -- info <iconName>
```

Example:
```bash
npm run icon-gen -- info home
```

## 📊 Available Icons (54)

### Navigation (12)
- arrow-down, arrow-left, arrow-right, arrow-up
- chevron-down, chevron-left, chevron-right, chevron-up
- home, menu, search

### Actions (9)
- check, close, copy, delete, download
- edit, minus, plus, upload

### Settings (3)
- filter, settings, sort

### Status (7)
- error, heart, help, info
- star, success, warning

### Communication (4)
- bell, chat, mail, phone

### Media (5)
- image, pause, play, stop, volume

### Documents (4)
- calendar, clock, document, folder

### Tech (5)
- cloud, code, link, lock, unlock

### Shopping (1)
- cart

### Misc (4)
- bookmark, flag, pin, tag

### Special (1)
- rocket (6-primitive complex example)

## 🔧 Primitives (51)

### Basic Shapes (6)
circle, ring, square, rectangle, roundedRect, ellipse

### Triangles (4)
triangleUp, triangleDown, triangleLeft, triangleRight

### Polygons (4)
pentagon, hexagon, octagon, diamond

### Stars (5)
star3, star4, star5, star6, star8

### Arrows & Chevrons (8)
arrowUp, arrowDown, arrowLeft, arrowRight, chevronUp, chevronDown, chevronLeft, chevronRight

### Lines (4)
horizontalLine, verticalLine, diagonalLineNE, diagonalLineNW

### Curves (3)
arc, quarterCircle, wave

### Symbols (10)
checkmark, cross, plus, minus, equals, dot, question, exclamation, heart, infinity

### Containers (3)
frame, roundedFrame, badge

### Composite (4)
gear, cloud, bell, flag

## 💻 Programmatic Usage

```typescript
import { IconGenerator } from '@progress/kendo-icon-generator';

const generator = new IconGenerator();

// Generate icon
const results = await generator.generate({
  iconName: 'home',
  variants: ['solid']
});

// List recipes
const recipes = generator.listRecipes();
console.log(recipes); // ['home', 'star', 'check', ...]

// Batch generate
await generator.generateBatch([
  { iconName: 'home', variants: ['solid'] },
  { iconName: 'star', variants: ['solid'] }
]);
```

## 📁 Output Location

Generated icons are saved to:
```
src/telerik-icons/{variant}/{iconName}.svg
```

Example:
```
src/telerik-icons/solid/home.svg
src/telerik-icons/solid/star.svg
```

## 🎯 Tips

1. **Always use `--force`** when testing to overwrite existing files
2. **Check recipe names** with `npm run icon-gen -- list` before generating
3. **Start with predefined recipes** - 54 available out of the box
4. **Batch generation** is faster for multiple icons
5. **View primitives** to understand available building blocks

## 🔥 Performance

- Generation: <1ms per icon
- SVG Size: 200-800 bytes (optimized)
- Path Count: 3-10 paths per icon
- Build Time: ~2 seconds

## 📈 Project Stats

- **Total Lines:** 1,671 lines of TypeScript
- **Files:** 7 core files
- **Recipes:** 54 predefined icons
- **Primitives:** 51 geometric shapes
- **Dependencies:** 5 minimal (svgo, chalk, ora, commander, dotenv)

## 🛠️ Development

### Watch Mode
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Add New Recipe
Edit `src/composition-engine.ts` and add to recipes array:

```typescript
{
  name: 'my-icon',
  variant: 'solid',
  description: 'My custom icon',
  tags: ['custom'],
  steps: [
    { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
    { primitive: 'star5', options: { x: 256, y: 256, size: 200 } }
  ]
}
```

Then rebuild and generate:
```bash
npm run build
npm run icon-gen -- generate my-icon --force
```

## ❓ Troubleshooting

### "No recipe found"
- Check recipe name: `npm run icon-gen -- list`
- Recipe names are case-sensitive

### "Command not found"
- Run `npm run build` first
- Check that dist/cli.js exists

### "File already exists"
- Use `--force` flag to overwrite
- Or delete the file manually

## 🎉 Success!

You now have a clean, fast, production-ready icon generator using geometric primitive composition!

---

**For more details, see:**
- `README-NEW.md` - Full documentation
- `COMPLETION_SUMMARY.md` - Project overview
- `src/composition-engine.ts` - Recipe library
- `src/primitives.ts` - Primitive shapes
