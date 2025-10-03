#!/usr/bin/env node

/**
 * Kendo Icon Generator CLI
 * 
 * Command-line interface for generating icons using the composition approach
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { IconGenerator } from './icon-generator.js';
import { IconVariant } from './composition-types.js';
import * as path from 'path';
import * as fs from 'fs/promises';

const program = new Command();

program
  .name('kendo-icon-gen')
  .description('Generate Kendo UI icons using composition of geometric primitives')
  .version('2.0.0');

// ============================================================================
// GENERATE COMMAND
// ============================================================================

program
  .command('generate <iconName>')
  .description('Generate icon from predefined recipe')
  .option('-v, --variants <variants>', 'Comma-separated variants (solid,outline,duotone)', 'solid')
  .option('-o, --output <path>', 'Output directory', path.join(process.cwd(), 'src', 'telerik-icons'))
  .option('-f, --force', 'Overwrite existing files', false)
  .action(async (iconName: string, options) => {
    try {
      // Parse variants
      const variantStrings = options.variants.split(',').map((v: string) => v.trim());
      const validVariants: IconVariant[] = ['solid', 'outline', 'duotone'];
      const variants = variantStrings.filter((v: string) =>
        validVariants.includes(v as IconVariant)
      ) as IconVariant[];

      if (variants.length === 0) {
        console.error(chalk.red('❌ No valid variants specified. Use: solid, outline, or duotone'));
        process.exit(1);
      }

      // Initialize generator
      const generator = new IconGenerator({ outputDir: options.output });

      // Generate
      const results = await generator.generate({
        iconName,
        variants,
        force: options.force
      });

      // Display results
      console.log(chalk.bold('\n📊 Generation Results:\n'));
      for (const result of results) {
        if (result.success) {
          console.log(chalk.green(`✓ ${result.iconName}-${result.variant}`));
          console.log(chalk.gray(`  └─ ${result.svgPath}`));
        } else {
          console.log(chalk.red(`✗ ${result.iconName}-${result.variant}`));
          console.log(chalk.gray(`  └─ ${result.error}`));
        }
      }

      const successCount = results.filter(r => r.success).length;
      const totalCount = results.length;

      if (successCount === totalCount) {
        console.log(chalk.bold.green(`\n✨ Successfully generated ${successCount}/${totalCount} variants\n`));
      } else {
        console.log(chalk.bold.yellow(`\n⚠️  Generated ${successCount}/${totalCount} variants\n`));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

// ============================================================================
// LIST COMMAND
// ============================================================================

program
  .command('list')
  .description('List all available icon recipes')
  .option('-c, --count', 'Show count only', false)
  .action((options) => {
    const generator = new IconGenerator();
    const recipes = generator.listRecipes();

    if (options.count) {
      console.log(chalk.bold(`${recipes.length} recipes available`));
      return;
    }

    console.log(chalk.bold('\n📚 Available Icon Recipes:\n'));

    recipes.forEach((recipe, index) => {
      const num = (index + 1).toString().padStart(2, '0');
      console.log(chalk.cyan(`  ${num}. ${recipe}`));
    });

    console.log(chalk.gray('\n💡 Usage:'));
    console.log(chalk.gray('  kendo-icon-gen generate <recipe-name>'));
    console.log(chalk.gray('  kendo-icon-gen generate <recipe-name> --variants solid,outline\n'));
  });

// ============================================================================
// BATCH COMMAND
// ============================================================================

program
  .command('batch <file>')
  .description('Generate multiple icons from JSON file')
  .option('-o, --output <path>', 'Output directory', path.join(process.cwd(), 'src', 'telerik-icons'))
  .option('-f, --force', 'Overwrite existing files', false)
  .action(async (file: string, options) => {
    try {
      // Read batch file
      const content = await fs.readFile(file, 'utf-8');
      const batch = JSON.parse(content);

      if (!Array.isArray(batch.icons)) {
        throw new Error('Batch file must contain an "icons" array');
      }

      // Initialize generator
      const generator = new IconGenerator({ outputDir: options.output });

      console.log(chalk.bold(`\n🚀 Generating ${batch.icons.length} icons...\n`));

      // Generate all icons
      const allResults = await generator.generateBatch(
        batch.icons.map((icon: any) => ({
          ...icon,
          force: options.force
        }))
      );

      // Summary
      const successCount = allResults.filter(r => r.success).length;
      const failedCount = allResults.filter(r => !r.success).length;

      console.log(chalk.bold('\n📊 Batch Results:\n'));
      console.log(chalk.green(`  ✓ Success: ${successCount}`));
      if (failedCount > 0) {
        console.log(chalk.red(`  ✗ Failed:  ${failedCount}`));
      }

      if (failedCount > 0) {
        console.log(chalk.yellow('\n⚠️  Failed icons:'));
        allResults.filter(r => !r.success).forEach(r => {
          console.log(chalk.gray(`  - ${r.iconName}-${r.variant}: ${r.error}`));
        });
      }

      console.log(chalk.bold(`\n✨ Generated ${successCount}/${allResults.length} total variants\n`));

      if (failedCount > 0) {
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

// ============================================================================
// PRIMITIVES COMMAND
// ============================================================================

program
  .command('primitives')
  .description('List all available primitives')
  .action(() => {
    const { categories } = require('./primitives.js');

    console.log(chalk.bold('\n🔧 Available Primitives:\n'));

    for (const [category, prims] of Object.entries(categories)) {
      console.log(chalk.cyan(`${category}:`));
      (prims as string[]).forEach(prim => {
        console.log(chalk.gray(`  - ${prim}`));
      });
      console.log();
    }

    console.log(chalk.gray('💡 Total: ' + Object.values(categories).flat().length + ' primitives\n'));
  });

// ============================================================================
// INFO COMMAND
// ============================================================================

program
  .command('info <iconName>')
  .description('Show information about an icon recipe')
  .action((iconName: string) => {
    const generator = new IconGenerator();
    const recipes = generator.listRecipes();

    if (!recipes.includes(iconName)) {
      console.error(chalk.red(`\n❌ No recipe found for: ${iconName}`));
      console.log(chalk.gray('\n💡 Use "kendo-icon-gen list" to see all available recipes\n'));
      process.exit(1);
    }

    console.log(chalk.bold(`\n📖 Recipe: ${iconName}\n`));
    console.log(chalk.gray('To generate this icon:'));
    console.log(chalk.cyan(`  kendo-icon-gen generate ${iconName}`));
    console.log(chalk.cyan(`  kendo-icon-gen generate ${iconName} --variants solid,outline\n`));
  });

// ============================================================================
// PARSE ARGUMENTS
// ============================================================================

program.parse();
