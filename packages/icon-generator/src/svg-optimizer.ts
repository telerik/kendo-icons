/**
 * SVG Optimizer
 * 
 * Optimizes generated SVG files using SVGO
 */

import { optimize, Config } from 'svgo';

export class SvgOptimizer {
  private config: Config;

  constructor() {
    this.config = {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
              cleanupIds: false
            }
          }
        },
        'removeDimensions',
        'sortAttrs'
      ]
    };
  }

  /**
   * Optimize SVG content
   */
  async optimizeSvg(svgContent: string): Promise<string> {
    try {
      const result = optimize(svgContent, this.config);
      return result.data;
    } catch (error) {
      console.warn('SVG optimization failed, returning original:', error);
      return svgContent;
    }
  }

  /**
   * Validate SVG structure
   */
  validate(svgContent: string): boolean {
    return svgContent.includes('<svg') && svgContent.includes('viewBox') && svgContent.includes('</svg>');
  }
}
