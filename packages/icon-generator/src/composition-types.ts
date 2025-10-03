/**
 * Core types for icon composition system
 */

import { PrimitiveOptions } from './primitives.js';

export type IconVariant = 'solid' | 'outline' | 'duotone';

export interface CompositionStep {
  primitive: string;
  options?: PrimitiveOptions;
}

export interface IconComposition {
  name: string;
  variant: IconVariant;
  viewBox?: string;
  steps: CompositionStep[];
}

export interface IconGenerationRequest {
  iconName: string;
  variants?: IconVariant[];
  prompt?: string;
  useAI?: boolean;
  force?: boolean;
}

export interface IconGenerationResult {
  iconName: string;
  variant: IconVariant;
  svgPath: string;
  success: boolean;
  error?: string;
  generatedAt: string;
}

export interface BatchGenerationRequest {
  icons: IconGenerationRequest[];
  concurrency?: number;
}

export interface Recipe extends IconComposition {
  description?: string;
  tags?: string[];
}
