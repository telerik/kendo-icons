# Icon Triage & Streamlining - Action Plan

## 📊 Current Status (After Triage & Normalization)

### Completed ✅
1. **Triage Analysis**: Analyzed all 807 existing icons
2. **Classification**: All icons classified as "solid" style
3. **Directory Structure**: Created `/outline` and `/duotone` directories
4. **Normalization**: All 807 icons normalized to consistent format:
   - Standard 512x512 viewBox
   - Consistent XML declaration
   - Proper SVG namespace

### Discovery
- **Total Icons**: 807 solid icons
- **Current Location**: `/src/telerik-icons/solid/`
- **Style Distribution**: 100% solid (filled paths, no strokes)
- **Dimension Consistency**: 806/807 consistent (1 fixed)
- **Format**: All properly formatted SVG files

## 🎯 Next Steps

### Phase 1: Manual Review & Refinement (Recommended)

Since all icons are currently "solid" style, we need to:

1. **Manual Visual Inspection** (Sample-based)
   - Review 20-30 representative icons visually
   - Identify if any are actually outline-style misclassified
   - Check for stylistic inconsistencies
   - Document any patterns found

2. **Stylistic Analysis**
   - Stroke widths (if any hidden in paths)
   - Level of detail
   - Visual weight
   - Corner styles (sharp vs rounded)

### Phase 2: Create Outline Variants

**Option A: Using Icon Generator (Composition-based)**
- Use the new composition system
- Create recipes for top 50-100 most common icons
- Generate outline variants using geometric primitives

**Option B: Automated Conversion**
- Write script to convert solid → outline
- Extract outlines from filled shapes
- Apply consistent stroke width (40-50px recommended)

**Option C: Hybrid Approach** (Recommended)
- Use composition system for common/simple icons (home, star, search, etc.)
- Manual creation for complex icons
- Document conversion rules

### Phase 3: Create Duotone Variants

**Duotone Strategy:**
- Primary color: `currentColor` (foreground)
- Secondary color: `currentColor` at 40% opacity (background/accent)
- Apply to layered/compound icons

**Implementation:**
1. Identify icons suitable for duotone (≥2 visual layers)
2. Split layers logically (background vs foreground)
3. Apply color scheme consistently
4. Test in light/dark themes

### Phase 4: Variant Generation Automation

Create systematic approach:

```bash
# For each icon in solid/:
1. Check if outline recipe exists
2. Check if duotone recipe exists
3. Generate missing variants
4. Validate output
5. Move to appropriate directory
```

## 📋 Detailed Action Items

### Immediate Actions (Week 1)

- [ ] **Manual Icon Review**
  - [ ] Sample 50 random icons
  - [ ] Document stylistic patterns
  - [ ] Identify outliers
  - [ ] Create style guide document

- [ ] **Create Conversion Rules**
  - [ ] Define solid → outline conversion
  - [ ] Define solid → duotone conversion
  - [ ] Document edge cases
  - [ ] Create examples

- [ ] **Prioritize Icons**
  - [ ] List top 100 most-used icons
  - [ ] Categorize by complexity
  - [ ] Assign conversion method per icon

### Short-term (Week 2-3)

- [ ] **Build Conversion Tools**
  - [ ] Solid-to-outline converter script
  - [ ] Duotone layer splitter
  - [ ] Batch processor
  - [ ] Quality validator

- [ ] **Create Recipes (Composition System)**
  - [ ] 50 common icon recipes
  - [ ] Outline variant recipes
  - [ ] Duotone variant recipes
  - [ ] Test all recipes

- [ ] **Generate First Batch**
  - [ ] Top 50 icons × 3 variants = 150 files
  - [ ] Manual QA of generated icons
  - [ ] Iterate on recipes
  - [ ] Document learnings

### Medium-term (Week 4-6)

- [ ] **Scale Up Generation**
  - [ ] Process next 200 icons
  - [ ] Batch generate variants
  - [ ] Automated QA checks
  - [ ] Manual spot-checks

- [ ] **Streamline Styling**
  - [ ] Apply consistent visual weight
  - [ ] Normalize stroke widths (outline)
  - [ ] Standardize opacity (duotone)
  - [ ] Fix any inconsistencies

- [ ] **Update Metadata**
  - [ ] Update all.json
  - [ ] Update icon-list.json
  - [ ] Generate new icons.html
  - [ ] Update documentation

### Long-term (Week 7-8)

- [ ] **Complete Remaining Icons**
  - [ ] Generate all missing variants
  - [ ] Full QA pass
  - [ ] Fix any issues
  - [ ] Final validation

- [ ] **Documentation**
  - [ ] Icon usage guide
  - [ ] Variant selection guide
  - [ ] Integration examples
  - [ ] Migration guide (for consumers)

- [ ] **Package & Release**
  - [ ] Update package versions
  - [ ] Generate distribution files
  - [ ] Update changelogs
  - [ ] Prepare release notes

## 🛠️ Technical Implementation

### Script 1: Variant Generator

```javascript
// scripts/generate-variants.js
// - Read solid icon
// - Apply conversion rules
// - Generate outline + duotone
// - Validate output
// - Save to appropriate directory
```

### Script 2: Style Analyzer

```javascript
// scripts/analyze-style.js
// - Extract visual metrics
// - Compare to style guide
// - Report inconsistencies
// - Suggest fixes
```

### Script 3: Batch Processor

```javascript
// scripts/batch-process.js
// - Process multiple icons
// - Parallel processing
// - Progress tracking
// - Error handling
```

## 📐 Style Guide (To Be Defined)

### Solid Icons
- **Fill**: Single color (`currentColor`)
- **Stroke**: None
- **Weight**: Medium to bold
- **Detail**: Full detail

### Outline Icons
- **Fill**: None (`fill="none"`)
- **Stroke**: 40-50px width
- **Linecap**: Round
- **Linejoin**: Round
- **Weight**: Medium
- **Detail**: Simplified where needed

### Duotone Icons
- **Primary**: `currentColor` (100%)
- **Secondary**: `currentColor` (40% opacity)
- **Layers**: 2 distinct visual layers
- **Weight**: Medium
- **Style**: Layered composition

## 🎨 Example Workflow

For icon "home":

1. **Current**: `solid/home.svg` (filled house shape)
2. **Generate Outline**: 
   - Extract outline from filled shape
   - Apply 45px stroke
   - Remove fill
   - Save to `outline/home.svg`
3. **Generate Duotone**:
   - Identify layers: roof (back) + house (front)
   - Roof: 40% opacity
   - House: 100% opacity
   - Save to `duotone/home.svg`

## 📈 Success Metrics

- **Coverage**: 807 icons × 3 variants = 2,421 total icons
- **Consistency**: 100% adherence to style guide
- **Quality**: Zero visual artifacts, proper rendering
- **Performance**: < 5 seconds per icon generation
- **Compatibility**: Works in all modern browsers

## 🚀 Quick Start Command

```bash
# 1. Review triage results
cat src/telerik-icons/icon-triage-report.json

# 2. Sample icons for manual review
node packages/icon-generator/scripts/sample-icons.js

# 3. Generate first batch (when ready)
node packages/icon-generator/scripts/generate-variants.js --batch first-50

# 4. Validate generated icons
node packages/icon-generator/scripts/validate-icons.js

# 5. Commit batch
git add src/telerik-icons/
git commit -m "feat: generate outline and duotone variants (batch 1)"
```

## 📝 Notes

- All 807 icons are currently solid style
- No outline or duotone icons exist yet
- All icons properly normalized (512x512 viewBox)
- Directory structure created and ready
- Icon generator tool ready for recipe creation

## 🔄 Iteration Plan

**Week 1**: Plan + 50 icons  
**Week 2**: 100 icons  
**Week 3**: 200 icons  
**Week 4**: 200 icons  
**Week 5**: 200 icons  
**Week 6**: 57 icons + QA  
**Week 7**: Fixes + polish  
**Week 8**: Documentation + release  

**Total**: 8 weeks to complete all 807 × 3 = 2,421 icons

---

**Status**: ✅ Phase 0 Complete (Triage & Normalization)  
**Next**: Phase 1 (Manual Review & Refinement)  
**Date**: October 3, 2025
