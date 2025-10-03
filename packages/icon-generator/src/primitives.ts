/**
 * SVG Primitives Library
 * 
 * A comprehensive collection of reusable geometric shapes for composing icons.
 * Each primitive is a pure function that returns SVG markup.
 */

export interface PrimitiveOptions {
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  fill?: string;
  stroke?: string;
}

type PrimitiveFunction = (opts?: PrimitiveOptions) => string;

// ============================================================================
// BASIC SHAPES
// ============================================================================

export const circle: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" opacity="${opacity}"/>`;
};

export const ring: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 20, color = 'currentColor', opacity = 1 } = opts;
  return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
};

export const square: PrimitiveFunction = (opts = {}) => {
  const { x = 206, y = 206, size = 100, color = 'currentColor', opacity = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}"/>`;
};

export const rectangle: PrimitiveFunction = (opts = {}) => {
  const { x = 156, y = 206, width = 200, height = 100, color = 'currentColor', opacity = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" opacity="${opacity}"/>`;
};

export const roundedRect: PrimitiveFunction = (opts = {}) => {
  const { x = 156, y = 206, width = 200, height = 100, radius = 20, color = 'currentColor', opacity = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="${color}" opacity="${opacity}"/>`;
};

export const ellipse: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, width = 200, height = 100, color = 'currentColor', opacity = 1 } = opts;
  return `<ellipse cx="${x}" cy="${y}" rx="${width / 2}" ry="${height / 2}" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// TRIANGLES
// ============================================================================

export const triangleUp: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 156, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const points = `${x},${y} ${x - size / 2},${y + size} ${x + size / 2},${y + size}`;
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
};

export const triangleDown: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const points = `${x},${y + size} ${x - size / 2},${y} ${x + size / 2},${y}`;
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
};

export const triangleLeft: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const points = `${x - size},${y} ${x},${y - size / 2} ${x},${y + size / 2}`;
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
};

export const triangleRight: PrimitiveFunction = (opts = {}) => {
  const { x = 206, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const points = `${x},${y - size / 2} ${x},${y + size / 2} ${x + size},${y}`;
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// POLYGONS
// ============================================================================

export const pentagon: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r = size / 2;
  const points: number[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const hexagon: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r = size / 2;
  const points: number[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 2 * Math.PI) / 6;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const octagon: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r = size / 2;
  const points: number[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 2 * Math.PI) / 8;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const diamond: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const half = size / 2;
  const points = `${x},${y - half} ${x + half},${y} ${x},${y + half} ${x - half},${y}`;
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// STARS
// ============================================================================

export const star3: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 2;
  const r2 = size / 4;
  const points: number[] = [];
  for (let i = 0; i < 6; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const star4: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 2;
  const r2 = size / 4;
  const points: number[] = [];
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const star5: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 2;
  const r2 = size / 4;
  const points: number[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const star6: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 2;
  const r2 = size / 4;
  const points: number[] = [];
  for (let i = 0; i < 12; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const angle = (i * Math.PI) / 6 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const star8: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 2;
  const r2 = size / 4;
  const points: number[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// ARROWS
// ============================================================================

export const arrowUp: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 156, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x} ${y} L${x - size / 2} ${y + size / 2} M${x} ${y} L${x + size / 2} ${y + size / 2} M${x} ${y} L${x} ${y + size}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const arrowDown: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const yStart = y - size / 2;
  return `<path d="M${x} ${y + size} L${x - size / 2} ${y + size / 2} M${x} ${y + size} L${x + size / 2} ${y + size / 2} M${x} ${y + size} L${x} ${yStart}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const arrowLeft: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const xStart = x + size / 2;
  return `<path d="M${x - size} ${y} L${x - size / 2} ${y - size / 2} M${x - size} ${y} L${x - size / 2} ${y + size / 2} M${x - size} ${y} L${xStart} ${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const arrowRight: PrimitiveFunction = (opts = {}) => {
  const { x = 206, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x + size} ${y} L${x + size / 2} ${y - size / 2} M${x + size} ${y} L${x + size / 2} ${y + size / 2} M${x + size} ${y} L${x} ${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const chevronUp: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x - size / 2} ${y + size / 4} L${x} ${y - size / 4} L${x + size / 2} ${y + size / 4}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const chevronDown: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x - size / 2} ${y - size / 4} L${x} ${y + size / 4} L${x + size / 2} ${y - size / 4}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const chevronLeft: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x + size / 4} ${y - size / 2} L${x - size / 4} ${y} L${x + size / 4} ${y + size / 2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const chevronRight: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x - size / 4} ${y - size / 2} L${x + size / 4} ${y} L${x - size / 4} ${y + size / 2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

// ============================================================================
// LINES
// ============================================================================

export const horizontalLine: PrimitiveFunction = (opts = {}) => {
  const { x = 156, y = 256, width = 200, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const verticalLine: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 156, height = 200, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + height}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const diagonalLineNE: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const half = size / 2;
  return `<line x1="${x - half}" y1="${y + half}" x2="${x + half}" y2="${y - half}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const diagonalLineNW: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const half = size / 2;
  return `<line x1="${x - half}" y1="${y - half}" x2="${x + half}" y2="${y + half}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

// ============================================================================
// CURVES
// ============================================================================

export const arc: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const r = size / 2;
  const startAngle = opts.rotation || 0;
  const endAngle = startAngle + 180;
  const start = (startAngle * Math.PI) / 180;
  const end = (endAngle * Math.PI) / 180;
  const x1 = x + r * Math.cos(start);
  const y1 = y + r * Math.sin(start);
  const x2 = x + r * Math.cos(end);
  const y2 = y + r * Math.sin(end);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `<path d="M${x1} ${y1} A${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" fill="none" opacity="${opacity}"/>`;
};

export const quarterCircle: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const r = size;
  return `<path d="M${x} ${y} L${x + r} ${y} A${r} ${r} 0 0 1 ${x} ${y + r} Z" fill="${color}" opacity="${opacity}"/>`;
};

export const wave: PrimitiveFunction = (opts = {}) => {
  const { x = 156, y = 256, width = 200, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const quarterWidth = width / 4;
  return `<path d="M${x} ${y} Q${x + quarterWidth} ${y - 30} ${x + 2 * quarterWidth} ${y} Q${x + 3 * quarterWidth} ${y + 30} ${x + width} ${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" fill="none" opacity="${opacity}"/>`;
};

// ============================================================================
// SYMBOLS
// ============================================================================

export const checkmark: PrimitiveFunction = (opts = {}) => {
  const { x = 200, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x} ${y} L${x + size / 3} ${y + size / 2} L${x + size} ${y - size / 2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round" fill="none" opacity="${opacity}"/>`;
};

export const cross: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const offset = size / 2;
  return `<path d="M${x - offset} ${y - offset} L${x + offset} ${y + offset} M${x + offset} ${y - offset} L${x - offset} ${y + offset}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const plus: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const offset = size / 2;
  return `<path d="M${x} ${y - offset} L${x} ${y + offset} M${x - offset} ${y} L${x + offset} ${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const minus: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const offset = size / 2;
  return `<path d="M${x - offset} ${y} L${x + offset} ${y}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const equals: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  const offset = size / 2;
  const spacing = size / 4;
  return `<path d="M${x - offset} ${y - spacing} L${x + offset} ${y - spacing} M${x - offset} ${y + spacing} L${x + offset} ${y + spacing}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/>`;
};

export const dot: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 20, color = 'currentColor', opacity = 1 } = opts;
  return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" opacity="${opacity}"/>`;
};

export const question: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 180, size = 150, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<path d="M${x - size / 3} ${y} Q${x - size / 3} ${y - size / 2} ${x} ${y - size / 2} Q${x + size / 3} ${y - size / 2} ${x + size / 3} ${y} Q${x + size / 3} ${y + size / 4} ${x} ${y + size / 2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" fill="none" opacity="${opacity}"/><circle cx="${x}" cy="${y + size / 1.2}" r="${strokeWidth / 2}" fill="${color}" opacity="${opacity}"/>`;
};

export const exclamation: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 180, size = 150, strokeWidth = 32, color = 'currentColor', strokeLinecap = 'round', opacity = 1 } = opts;
  return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + size / 1.5}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" opacity="${opacity}"/><circle cx="${x}" cy="${y + size}" r="${strokeWidth / 2}" fill="${color}" opacity="${opacity}"/>`;
};

export const heart: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 220, size = 120, color = 'currentColor', opacity = 1 } = opts;
  const w = size / 2;
  return `<path d="M${x} ${y + size} L${x - w} ${y + w / 2} Q${x - w} ${y - w / 2} ${x - w / 2} ${y - w / 2} Q${x} ${y - w / 2} ${x} ${y} Q${x} ${y - w / 2} ${x + w / 2} ${y - w / 2} Q${x + w} ${y - w / 2} ${x + w} ${y + w / 2} Z" fill="${color}" opacity="${opacity}"/>`;
};

export const infinity: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, strokeWidth = 32, color = 'currentColor', opacity = 1 } = opts;
  const w = size / 2;
  return `<path d="M${x - w} ${y} Q${x - w / 2} ${y - w / 2} ${x} ${y} Q${x + w / 2} ${y + w / 2} ${x + w} ${y} Q${x + w / 2} ${y - w / 2} ${x} ${y} Q${x - w / 2} ${y + w / 2} ${x - w} ${y}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}"/>`;
};

// ============================================================================
// CONTAINERS & FRAMES
// ============================================================================

export const frame: PrimitiveFunction = (opts = {}) => {
  const { x = 100, y = 100, width = 312, height = 312, strokeWidth = 32, color = 'currentColor', opacity = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linejoin="round" opacity="${opacity}"/>`;
};

export const roundedFrame: PrimitiveFunction = (opts = {}) => {
  const { x = 100, y = 100, width = 312, height = 312, radius = 20, strokeWidth = 32, color = 'currentColor', opacity = 1 } = opts;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linejoin="round" opacity="${opacity}"/>`;
};

export const badge: PrimitiveFunction = (opts = {}) => {
  const { x = 380, y = 380, size = 80, color = 'currentColor', opacity = 1 } = opts;
  return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// COMPOSITE SHAPES
// ============================================================================

export const gear: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 100, color = 'currentColor', opacity = 1 } = opts;
  const innerR = size / 4;
  const outerR = size / 2;
  const teethCount = 8;
  const points: number[] = [];
  
  for (let i = 0; i < teethCount * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / teethCount;
    points.push(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  
  return `<polygon points="${points.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
};

export const cloud: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 120, color = 'currentColor', opacity = 1 } = opts;
  const r1 = size / 3;
  const r2 = size / 4;
  const r3 = size / 5;
  return `<path d="M${x - size / 2 + r3} ${y + size / 4} Q${x - size / 2} ${y + size / 4} ${x - size / 2} ${y + size / 4 - r3} Q${x - size / 2} ${y - size / 4} ${x - size / 4} ${y - size / 3} Q${x} ${y - size / 2} ${x + size / 4} ${y - size / 3} Q${x + size / 2} ${y - size / 4} ${x + size / 2} ${y + size / 4 - r2} Q${x + size / 2} ${y + size / 4} ${x + size / 2 - r2} ${y + size / 4} Z" fill="${color}" opacity="${opacity}"/>`;
};

export const bell: PrimitiveFunction = (opts = {}) => {
  const { x = 256, y = 256, size = 120, color = 'currentColor', opacity = 1 } = opts;
  const w = size / 2;
  return `<path d="M${x - w} ${y + w / 2} Q${x - w} ${y - w / 3} ${x} ${y - w} Q${x + w} ${y - w / 3} ${x + w} ${y + w / 2} L${x + w} ${y + w / 2} L${x - w} ${y + w / 2} M${x - w / 4} ${y + w / 2} Q${x - w / 4} ${y + w} ${x} ${y + w} Q${x + w / 4} ${y + w} ${x + w / 4} ${y + w / 2}" fill="${color}" opacity="${opacity}"/>`;
};

export const flag: PrimitiveFunction = (opts = {}) => {
  const { x = 150, y = 100, size = 120, strokeWidth = 32, color = 'currentColor', opacity = 1 } = opts;
  return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + size * 2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${opacity}"/><path d="M${x} ${y} L${x + size} ${y + size / 3} L${x} ${y + size / 1.5} Z" fill="${color}" opacity="${opacity}"/>`;
};

// ============================================================================
// EXPORT ALL PRIMITIVES
// ============================================================================

export const primitives = {
  // Basic Shapes
  circle,
  ring,
  square,
  rectangle,
  roundedRect,
  ellipse,
  
  // Triangles
  triangleUp,
  triangleDown,
  triangleLeft,
  triangleRight,
  
  // Polygons
  pentagon,
  hexagon,
  octagon,
  diamond,
  
  // Stars
  star3,
  star4,
  star5,
  star6,
  star8,
  
  // Arrows
  arrowUp,
  arrowDown,
  arrowLeft,
  arrowRight,
  chevronUp,
  chevronDown,
  chevronLeft,
  chevronRight,
  
  // Lines
  horizontalLine,
  verticalLine,
  diagonalLineNE,
  diagonalLineNW,
  
  // Curves
  arc,
  quarterCircle,
  wave,
  
  // Symbols
  checkmark,
  cross,
  plus,
  minus,
  equals,
  dot,
  question,
  exclamation,
  heart,
  infinity,
  
  // Containers
  frame,
  roundedFrame,
  badge,
  
  // Composite
  gear,
  cloud,
  bell,
  flag
};

export const getPrimitive = (name: string): PrimitiveFunction | undefined => {
  return primitives[name as keyof typeof primitives];
};

export const listPrimitives = (): string[] => {
  return Object.keys(primitives);
};

export const categories = {
  'basic-shapes': ['circle', 'ring', 'square', 'rectangle', 'roundedRect', 'ellipse'],
  'triangles': ['triangleUp', 'triangleDown', 'triangleLeft', 'triangleRight'],
  'polygons': ['pentagon', 'hexagon', 'octagon', 'diamond'],
  'stars': ['star3', 'star4', 'star5', 'star6', 'star8'],
  'arrows': ['arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight', 'chevronUp', 'chevronDown', 'chevronLeft', 'chevronRight'],
  'lines': ['horizontalLine', 'verticalLine', 'diagonalLineNE', 'diagonalLineNW'],
  'curves': ['arc', 'quarterCircle', 'wave'],
  'symbols': ['checkmark', 'cross', 'plus', 'minus', 'equals', 'dot', 'question', 'exclamation', 'heart', 'infinity'],
  'containers': ['frame', 'roundedFrame', 'badge'],
  'composite': ['gear', 'cloud', 'bell', 'flag']
};
