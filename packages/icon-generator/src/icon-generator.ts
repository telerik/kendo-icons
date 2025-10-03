/**
 * Icon Generator
 * 
 * Main orchestrator for icon generation using composition approach
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { CompositionEngine } from './composition-engine.js';
import { SvgOptimizer } from './svg-optimizer.js';
import { IconGenerationRequest, IconGenerationResult, IconVariant } from './composition-types.js';

export interface IconGeneratorOptions {
  outputDir?: string;
}

export class IconGenerator {
  private engine: CompositionEngine;
  private optimizer: SvgOptimizer;
  private outputDir: string;

  constructor(options: IconGeneratorOptions = {}) {
    this.engine = new CompositionEngine();
    this.optimizer = new SvgOptimizer();
    this.outputDir = options.outputDir || path.join(process.cwd(), 'src', 'telerik-icons');
  }

  /**
   * Generate icon(s) from request
   */
  async generate(request: IconGenerationRequest): Promise<IconGenerationResult[]> {
    const variants = request.variants || ['solid'];
    const results: IconGenerationResult[] = [];

    for (const variant of variants) {
      const result = await this.generateVariant(request.iconName, variant, request.force);
      results.push(result);
    }

    return results;
  }

  /**
   * Generate a single variant
   */
  private async generateVariant(
    iconName: string,
    variant: IconVariant,
    force?: boolean
  ): Promise<IconGenerationResult> {
    const spinner = ora(`Generating ${variant} variant: ${iconName}`).start();

    try {
      // Get recipe
      const recipe = this.engine.getRecipe(iconName, variant);
      if (!recipe) {
        throw new Error(`No recipe found for "${iconName}" with variant "${variant}"`);
      }

      // Compose SVG
      spinner.text = `Composing ${variant} icon: ${iconName}`;
      const svg = this.engine.compose(recipe);

      // Validate
      if (!this.optimizer.validate(svg)) {
        throw new Error('Generated SVG is invalid');
      }

      // Optimize
      spinner.text = `Optimizing ${variant} icon: ${iconName}`;
      const optimized = await this.optimizer.optimizeSvg(svg);

      // Save
      const svgPath = await this.saveIcon(iconName, variant, optimized, force);

      spinner.succeed(chalk.green(`Generated ${variant} icon: ${iconName}`));

      return {
        iconName,
        variant,
        svgPath,
        success: true,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      spinner.fail(chalk.red(`Failed to generate ${variant} icon: ${iconName}`));

      return {
        iconName,
        variant,
        svgPath: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        generatedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Save icon to file
   */
  private async saveIcon(
    iconName: string,
    variant: IconVariant,
    svg: string,
    force?: boolean
  ): Promise<string> {
    const variantDir = path.join(this.outputDir, variant);
    await fs.mkdir(variantDir, { recursive: true });

    const filename = `${iconName}.svg`;
    const filepath = path.join(variantDir, filename);

    // Check if file exists
    if (!force) {
      try {
        await fs.access(filepath);
        throw new Error(`File already exists: ${filepath}. Use --force to overwrite.`);
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
    }

    await fs.writeFile(filepath, svg, 'utf-8');

    return filepath;
  }

  /**
   * List all available recipes
   */
  listRecipes(): string[] {
    return this.engine.listRecipes();
  }

  /**
   * Generate batch of icons
   */
  async generateBatch(requests: IconGenerationRequest[]): Promise<IconGenerationResult[]> {
    const results: IconGenerationResult[] = [];

    for (const request of requests) {
      const iconResults = await this.generate(request);
      results.push(...iconResults);
    }

    return results;
  }
}
