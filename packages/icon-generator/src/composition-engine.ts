/**
 * Composition Engine
 * 
 * Orchestrates the combination of primitives into complete icons.
 * Includes a library of predefined recipes for common icons.
 */

import { primitives, getPrimitive } from './primitives.js';
import { IconComposition, Recipe, IconVariant } from './composition-types.js';

export class CompositionEngine {
  private recipes: Map<string, Recipe>;

  constructor() {
    this.recipes = new Map();
    this.loadRecipes();
  }

  /**
   * Compose an icon from a composition definition
   */
  compose(composition: IconComposition): string {
    const viewBox = composition.viewBox || '0 0 512 512';
    const elements: string[] = [];

    for (const step of composition.steps) {
      const primitiveFn = getPrimitive(step.primitive);
      if (!primitiveFn) {
        console.warn(`Unknown primitive: ${step.primitive}`);
        continue;
      }

      elements.push(primitiveFn(step.options || {}));
    }

    return this.wrapInSvg(elements.join('\n'), viewBox);
  }

  /**
   * Get a recipe by name
   */
  getRecipe(name: string, variant?: IconVariant): Recipe | undefined {
    const key = variant ? `${name}-${variant}` : name;
    return this.recipes.get(key) || this.recipes.get(name);
  }

  /**
   * List all available recipes
   */
  listRecipes(): string[] {
    const uniqueNames = new Set<string>();
    for (const recipe of this.recipes.values()) {
      uniqueNames.add(recipe.name);
    }
    return Array.from(uniqueNames).sort();
  }

  /**
   * Add a custom recipe
   */
  addRecipe(recipe: Recipe): void {
    const key = `${recipe.name}-${recipe.variant}`;
    this.recipes.set(key, recipe);
  }

  /**
   * Wrap SVG elements in proper container
   */
  private wrapInSvg(content: string, viewBox: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">\n${content}\n</svg>`;
  }

  /**
   * Load predefined recipes
   */
  private loadRecipes(): void {
    const recipes: Recipe[] = [
      // NAVIGATION ICONS
      {
        name: 'home',
        variant: 'solid',
        description: 'House with roof and door',
        tags: ['navigation', 'building'],
        steps: [
          { primitive: 'triangleUp', options: { x: 256, y: 100, size: 280 } },
          { primitive: 'rectangle', options: { x: 150, y: 230, width: 212, height: 220 } },
          { primitive: 'roundedRect', options: { x: 206, y: 330, width: 100, height: 120, radius: 8, color: 'white' } }
        ]
      },
      {
        name: 'search',
        variant: 'outline',
        description: 'Magnifying glass',
        tags: ['navigation', 'search'],
        steps: [
          { primitive: 'ring', options: { x: 200, y: 200, size: 200, strokeWidth: 40 } },
          { primitive: 'horizontalLine', options: { x: 300, y: 300, width: 120, strokeWidth: 40 } }
        ]
      },
      {
        name: 'menu',
        variant: 'outline',
        description: 'Hamburger menu',
        tags: ['navigation', 'menu'],
        steps: [
          { primitive: 'horizontalLine', options: { x: 120, y: 180, width: 272, strokeWidth: 36 } },
          { primitive: 'horizontalLine', options: { x: 120, y: 256, width: 272, strokeWidth: 36 } },
          { primitive: 'horizontalLine', options: { x: 120, y: 332, width: 272, strokeWidth: 36 } }
        ]
      },
      {
        name: 'arrow-left',
        variant: 'outline',
        description: 'Left pointing arrow',
        tags: ['navigation', 'arrow'],
        steps: [
          { primitive: 'arrowLeft', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'arrow-right',
        variant: 'outline',
        description: 'Right pointing arrow',
        tags: ['navigation', 'arrow'],
        steps: [
          { primitive: 'arrowRight', options: { x: 120, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'arrow-up',
        variant: 'outline',
        description: 'Up pointing arrow',
        tags: ['navigation', 'arrow'],
        steps: [
          { primitive: 'arrowUp', options: { x: 256, y: 136, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'arrow-down',
        variant: 'outline',
        description: 'Down pointing arrow',
        tags: ['navigation', 'arrow'],
        steps: [
          { primitive: 'arrowDown', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'chevron-left',
        variant: 'outline',
        description: 'Left chevron',
        tags: ['navigation', 'chevron'],
        steps: [
          { primitive: 'chevronLeft', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'chevron-right',
        variant: 'outline',
        description: 'Right chevron',
        tags: ['navigation', 'chevron'],
        steps: [
          { primitive: 'chevronRight', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'chevron-up',
        variant: 'outline',
        description: 'Up chevron',
        tags: ['navigation', 'chevron'],
        steps: [
          { primitive: 'chevronUp', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },
      {
        name: 'chevron-down',
        variant: 'outline',
        description: 'Down chevron',
        tags: ['navigation', 'chevron'],
        steps: [
          { primitive: 'chevronDown', options: { x: 256, y: 256, size: 220, strokeWidth: 40 } }
        ]
      },

      // ACTION ICONS
      {
        name: 'plus',
        variant: 'solid',
        description: 'Plus sign in circle',
        tags: ['action', 'add'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'plus', options: { x: 256, y: 256, size: 150, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'minus',
        variant: 'solid',
        description: 'Minus sign in circle',
        tags: ['action', 'remove'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'minus', options: { x: 256, y: 256, size: 150, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'close',
        variant: 'solid',
        description: 'Close/X icon in circle',
        tags: ['action', 'close'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'cross', options: { x: 256, y: 256, size: 150, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'check',
        variant: 'solid',
        description: 'Checkmark in circle',
        tags: ['action', 'success'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'checkmark', options: { x: 180, y: 256, size: 150, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'edit',
        variant: 'outline',
        description: 'Pencil icon',
        tags: ['action', 'edit'],
        steps: [
          { primitive: 'rectangle', options: { x: 280, y: 80, width: 50, height: 280, rotation: 45 } },
          { primitive: 'triangleDown', options: { x: 150, y: 350, size: 60 } }
        ]
      },
      {
        name: 'delete',
        variant: 'outline',
        description: 'Trash can icon',
        tags: ['action', 'delete'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 160, y: 180, width: 192, height: 240, radius: 12, strokeWidth: 32 } },
          { primitive: 'horizontalLine', options: { x: 140, y: 160, width: 232, strokeWidth: 32 } },
          { primitive: 'rectangle', options: { x: 220, y: 100, width: 72, height: 60 } }
        ]
      },
      {
        name: 'copy',
        variant: 'outline',
        description: 'Copy/duplicate icon',
        tags: ['action', 'copy'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 120, y: 120, width: 240, height: 240, radius: 12, strokeWidth: 32 } },
          { primitive: 'roundedFrame', options: { x: 152, y: 152, width: 240, height: 240, radius: 12, strokeWidth: 32 } }
        ]
      },
      {
        name: 'download',
        variant: 'outline',
        description: 'Download arrow',
        tags: ['action', 'download'],
        steps: [
          { primitive: 'verticalLine', options: { x: 256, y: 100, height: 220, strokeWidth: 40 } },
          { primitive: 'chevronDown', options: { x: 256, y: 300, size: 120, strokeWidth: 40 } },
          { primitive: 'horizontalLine', options: { x: 140, y: 400, width: 232, strokeWidth: 40 } }
        ]
      },
      {
        name: 'upload',
        variant: 'outline',
        description: 'Upload arrow',
        tags: ['action', 'upload'],
        steps: [
          { primitive: 'verticalLine', options: { x: 256, y: 192, height: 220, strokeWidth: 40 } },
          { primitive: 'chevronUp', options: { x: 256, y: 212, size: 120, strokeWidth: 40 } },
          { primitive: 'horizontalLine', options: { x: 140, y: 400, width: 232, strokeWidth: 40 } }
        ]
      },

      // SETTINGS & TOOLS
      {
        name: 'settings',
        variant: 'solid',
        description: 'Gear/cog icon',
        tags: ['settings', 'tools'],
        steps: [
          { primitive: 'gear', options: { x: 256, y: 256, size: 280 } },
          { primitive: 'circle', options: { x: 256, y: 256, size: 100, color: 'white' } }
        ]
      },
      {
        name: 'filter',
        variant: 'outline',
        description: 'Filter funnel',
        tags: ['settings', 'tools'],
        steps: [
          { primitive: 'horizontalLine', options: { x: 100, y: 140, width: 312, strokeWidth: 36 } },
          { primitive: 'horizontalLine', options: { x: 150, y: 256, width: 212, strokeWidth: 36 } },
          { primitive: 'horizontalLine', options: { x: 200, y: 372, width: 112, strokeWidth: 36 } }
        ]
      },
      {
        name: 'sort',
        variant: 'outline',
        description: 'Sort arrows',
        tags: ['settings', 'tools'],
        steps: [
          { primitive: 'arrowUp', options: { x: 200, y: 136, size: 180, strokeWidth: 36 } },
          { primitive: 'arrowDown', options: { x: 312, y: 256, size: 180, strokeWidth: 36 } }
        ]
      },

      // STATUS & FEEDBACK
      {
        name: 'star',
        variant: 'solid',
        description: '5-pointed star',
        tags: ['status', 'rating'],
        steps: [
          { primitive: 'star5', options: { x: 256, y: 256, size: 350 } }
        ]
      },
      {
        name: 'heart',
        variant: 'solid',
        description: 'Heart symbol',
        tags: ['status', 'favorite'],
        steps: [
          { primitive: 'heart', options: { x: 256, y: 220, size: 240 } }
        ]
      },
      {
        name: 'info',
        variant: 'solid',
        description: 'Information icon',
        tags: ['status', 'info'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'dot', options: { x: 256, y: 180, size: 32, color: 'white' } },
          { primitive: 'verticalLine', options: { x: 256, y: 240, height: 160, strokeWidth: 32, color: 'white' } }
        ]
      },
      {
        name: 'warning',
        variant: 'solid',
        description: 'Warning triangle',
        tags: ['status', 'warning'],
        steps: [
          { primitive: 'triangleUp', options: { x: 256, y: 100, size: 340 } },
          { primitive: 'exclamation', options: { x: 256, y: 180, size: 150, color: 'white', strokeWidth: 32 } }
        ]
      },
      {
        name: 'error',
        variant: 'solid',
        description: 'Error circle with X',
        tags: ['status', 'error'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'cross', options: { x: 256, y: 256, size: 180, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'success',
        variant: 'solid',
        description: 'Success circle with checkmark',
        tags: ['status', 'success'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'checkmark', options: { x: 180, y: 256, size: 150, color: 'white', strokeWidth: 40 } }
        ]
      },
      {
        name: 'help',
        variant: 'solid',
        description: 'Help/question mark',
        tags: ['status', 'help'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'question', options: { x: 256, y: 200, size: 150, color: 'white', strokeWidth: 32 } }
        ]
      },

      // COMMUNICATION
      {
        name: 'bell',
        variant: 'solid',
        description: 'Notification bell',
        tags: ['communication', 'notification'],
        steps: [
          { primitive: 'bell', options: { x: 256, y: 230, size: 200 } }
        ]
      },
      {
        name: 'mail',
        variant: 'outline',
        description: 'Mail envelope',
        tags: ['communication', 'email'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 100, y: 160, width: 312, height: 232, radius: 12, strokeWidth: 32 } },
          { primitive: 'horizontalLine', options: { x: 100, y: 160, width: 156, strokeWidth: 32 } },
          { primitive: 'horizontalLine', options: { x: 256, y: 160, width: 156, strokeWidth: 32 } },
          { primitive: 'diagonalLineNE', options: { x: 180, y: 256, size: 152, strokeWidth: 32 } },
          { primitive: 'diagonalLineNW', options: { x: 332, y: 256, size: 152, strokeWidth: 32 } }
        ]
      },
      {
        name: 'chat',
        variant: 'outline',
        description: 'Chat bubble',
        tags: ['communication', 'message'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 100, y: 120, width: 312, height: 232, radius: 24, strokeWidth: 32 } },
          { primitive: 'triangleDown', options: { x: 256, y: 352, size: 60 } }
        ]
      },
      {
        name: 'phone',
        variant: 'solid',
        description: 'Phone handset',
        tags: ['communication', 'call'],
        steps: [
          { primitive: 'arc', options: { x: 180, y: 180, size: 120, strokeWidth: 50, rotation: -45 } },
          { primitive: 'verticalLine', options: { x: 140, y: 140, height: 80, strokeWidth: 50, rotation: -45 } },
          { primitive: 'verticalLine', options: { x: 372, y: 292, height: 80, strokeWidth: 50, rotation: -45 } }
        ]
      },

      // MEDIA
      {
        name: 'play',
        variant: 'solid',
        description: 'Play button',
        tags: ['media', 'video'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'triangleRight', options: { x: 220, y: 256, size: 140, color: 'white' } }
        ]
      },
      {
        name: 'pause',
        variant: 'solid',
        description: 'Pause button',
        tags: ['media', 'video'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'rectangle', options: { x: 200, y: 180, width: 36, height: 152, color: 'white' } },
          { primitive: 'rectangle', options: { x: 276, y: 180, width: 36, height: 152, color: 'white' } }
        ]
      },
      {
        name: 'stop',
        variant: 'solid',
        description: 'Stop button',
        tags: ['media', 'video'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 256, size: 400 } },
          { primitive: 'square', options: { x: 186, y: 186, size: 140, color: 'white' } }
        ]
      },
      {
        name: 'volume',
        variant: 'outline',
        description: 'Speaker/volume icon',
        tags: ['media', 'audio'],
        steps: [
          { primitive: 'rectangle', options: { x: 140, y: 206, width: 60, height: 100 } },
          { primitive: 'triangleRight', options: { x: 180, y: 256, size: 80 } },
          { primitive: 'arc', options: { x: 280, y: 256, size: 100, strokeWidth: 32, rotation: -90 } },
          { primitive: 'arc', options: { x: 320, y: 256, size: 180, strokeWidth: 32, rotation: -90 } }
        ]
      },
      {
        name: 'image',
        variant: 'outline',
        description: 'Image/photo icon',
        tags: ['media', 'image'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 100, y: 100, width: 312, height: 312, radius: 12, strokeWidth: 32 } },
          { primitive: 'circle', options: { x: 200, y: 200, size: 50 } },
          { primitive: 'diagonalLineNE', options: { x: 206, y: 312, size: 152, strokeWidth: 32 } },
          { primitive: 'diagonalLineNE', options: { x: 312, y: 362, size: 100, strokeWidth: 32 } }
        ]
      },

      // DOCUMENTS
      {
        name: 'document',
        variant: 'outline',
        description: 'Document page',
        tags: ['document', 'file'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 140, y: 80, width: 232, height: 352, radius: 12, strokeWidth: 32 } },
          { primitive: 'horizontalLine', options: { x: 180, y: 180, width: 152, strokeWidth: 24 } },
          { primitive: 'horizontalLine', options: { x: 180, y: 240, width: 152, strokeWidth: 24 } },
          { primitive: 'horizontalLine', options: { x: 180, y: 300, width: 100, strokeWidth: 24 } }
        ]
      },
      {
        name: 'folder',
        variant: 'outline',
        description: 'Folder icon',
        tags: ['document', 'storage'],
        steps: [
          { primitive: 'roundedRect', options: { x: 80, y: 200, width: 352, height: 220, radius: 12, strokeWidth: 32, color: 'none', stroke: 'currentColor' } },
          { primitive: 'roundedRect', options: { x: 80, y: 140, width: 140, height: 60, radius: 8 } }
        ]
      },
      {
        name: 'calendar',
        variant: 'outline',
        description: 'Calendar grid',
        tags: ['document', 'time'],
        steps: [
          { primitive: 'roundedFrame', options: { x: 100, y: 120, width: 312, height: 312, radius: 12, strokeWidth: 32 } },
          { primitive: 'horizontalLine', options: { x: 100, y: 200, width: 312, strokeWidth: 32 } },
          { primitive: 'verticalLine', options: { x: 200, y: 200, height: 232, strokeWidth: 24 } },
          { primitive: 'verticalLine', options: { x: 312, y: 200, height: 232, strokeWidth: 24 } }
        ]
      },
      {
        name: 'clock',
        variant: 'outline',
        description: 'Clock face',
        tags: ['document', 'time'],
        steps: [
          { primitive: 'ring', options: { x: 256, y: 256, size: 350, strokeWidth: 32 } },
          { primitive: 'verticalLine', options: { x: 256, y: 180, height: 76, strokeWidth: 28 } },
          { primitive: 'horizontalLine', options: { x: 256, y: 256, width: 76, strokeWidth: 28 } },
          { primitive: 'dot', options: { x: 256, y: 256, size: 24 } }
        ]
      },

      // TECH & CODE
      {
        name: 'code',
        variant: 'outline',
        description: 'Code brackets',
        tags: ['tech', 'development'],
        steps: [
          { primitive: 'chevronLeft', options: { x: 180, y: 256, size: 180, strokeWidth: 40 } },
          { primitive: 'chevronRight', options: { x: 332, y: 256, size: 180, strokeWidth: 40 } }
        ]
      },
      {
        name: 'link',
        variant: 'outline',
        description: 'Chain link',
        tags: ['tech', 'connection'],
        steps: [
          { primitive: 'arc', options: { x: 180, y: 180, size: 100, strokeWidth: 40, rotation: -45 } },
          { primitive: 'arc', options: { x: 332, y: 332, size: 100, strokeWidth: 40, rotation: 135 } },
          { primitive: 'diagonalLineNW', options: { x: 256, y: 256, size: 100, strokeWidth: 40 } }
        ]
      },
      {
        name: 'cloud',
        variant: 'solid',
        description: 'Cloud icon',
        tags: ['tech', 'storage'],
        steps: [
          { primitive: 'cloud', options: { x: 256, y: 256, size: 280 } }
        ]
      },
      {
        name: 'lock',
        variant: 'solid',
        description: 'Padlock',
        tags: ['tech', 'security'],
        steps: [
          { primitive: 'roundedRect', options: { x: 156, y: 240, width: 200, height: 200, radius: 20 } },
          { primitive: 'arc', options: { x: 256, y: 240, size: 140, strokeWidth: 40, color: 'currentColor', rotation: 0 } },
          { primitive: 'dot', options: { x: 256, y: 340, size: 40, color: 'white' } }
        ]
      },
      {
        name: 'unlock',
        variant: 'solid',
        description: 'Open padlock',
        tags: ['tech', 'security'],
        steps: [
          { primitive: 'roundedRect', options: { x: 156, y: 240, width: 200, height: 200, radius: 20 } },
          { primitive: 'arc', options: { x: 256, y: 240, size: 140, strokeWidth: 40, color: 'currentColor', rotation: -45 } },
          { primitive: 'dot', options: { x: 256, y: 340, size: 40, color: 'white' } }
        ]
      },

      // MISC
      {
        name: 'flag',
        variant: 'solid',
        description: 'Flag marker',
        tags: ['misc', 'marker'],
        steps: [
          { primitive: 'flag', options: { x: 150, y: 100, size: 180, strokeWidth: 32 } }
        ]
      },
      {
        name: 'pin',
        variant: 'solid',
        description: 'Location pin',
        tags: ['misc', 'location'],
        steps: [
          { primitive: 'circle', options: { x: 256, y: 200, size: 220 } },
          { primitive: 'triangleDown', options: { x: 256, y: 310, size: 140 } },
          { primitive: 'circle', options: { x: 256, y: 200, size: 80, color: 'white' } }
        ]
      },
      {
        name: 'bookmark',
        variant: 'solid',
        description: 'Bookmark ribbon',
        tags: ['misc', 'saved'],
        steps: [
          { primitive: 'rectangle', options: { x: 176, y: 80, width: 160, height: 340 } },
          { primitive: 'triangleDown', options: { x: 256, y: 420, size: 80, color: 'white' } }
        ]
      },
      {
        name: 'tag',
        variant: 'outline',
        description: 'Price tag',
        tags: ['misc', 'label'],
        steps: [
          { primitive: 'diamond', options: { x: 256, y: 256, size: 300, color: 'none', stroke: 'currentColor', strokeWidth: 32 } },
          { primitive: 'dot', options: { x: 200, y: 200, size: 40 } }
        ]
      },

      // SHOPPING
      {
        name: 'cart',
        variant: 'outline',
        description: 'Shopping cart',
        tags: ['shopping', 'ecommerce'],
        steps: [
          { primitive: 'horizontalLine', options: { x: 100, y: 180, width: 280, strokeWidth: 32 } },
          { primitive: 'diagonalLineNE', options: { x: 140, y: 256, size: 120, strokeWidth: 32 } },
          { primitive: 'diagonalLineNW', options: { x: 340, y: 256, size: 120, strokeWidth: 32 } },
          { primitive: 'dot', options: { x: 200, y: 400, size: 32 } },
          { primitive: 'dot', options: { x: 312, y: 400, size: 32 } }
        ]
      },

      // SPECIAL: ROCKET (Complex example)
      {
        name: 'rocket',
        variant: 'solid',
        description: 'Rocket ship',
        tags: ['misc', 'launch', 'space'],
        steps: [
          { primitive: 'roundedRect', options: { x: 206, y: 100, width: 100, height: 280, radius: 50 } },
          { primitive: 'triangleUp', options: { x: 256, y: 60, size: 80 } },
          { primitive: 'triangleDown', options: { x: 180, y: 300, size: 60 } },
          { primitive: 'triangleDown', options: { x: 332, y: 300, size: 60 } },
          { primitive: 'circle', options: { x: 256, y: 200, size: 40, color: 'white' } },
          { primitive: 'triangleDown', options: { x: 256, y: 380, size: 60, color: '#FF6B00' } }
        ]
      }
    ];

    // Register all recipes
    recipes.forEach(recipe => this.addRecipe(recipe));
  }
}
