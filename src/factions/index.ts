/**
 * Faction Presets - Material palettes for faction-based theming
 *
 * Migrated from otter-elite-force - enables reskinning any asset
 * with faction-appropriate materials.
 */

import * as THREE from 'three';

/**
 * Available factions
 */
export type Faction = 'URA' | 'SCALE_GUARD' | 'NATIVE' | 'NEUTRAL';

/**
 * Material palette for each faction
 */
export interface FactionPalette {
  /** Main structure/uniform color */
  primary: string;
  /** Accent color for details */
  secondary: string;
  /** Wood tone for structures */
  wood: string;
  /** Metal/hardware color */
  metal: string;
  /** Cloth/thatch/fabric color */
  fabric: string;
  /** Wear/damage level 0-1 (affects roughness) */
  wear: number;
}

/**
 * Faction color palettes
 */
export const FACTION_PALETTES: Record<Faction, FactionPalette> = {
  URA: {
    primary: '#5D4E37', // Military brown
    secondary: '#3D5C3A', // Olive green
    wood: '#8B7355', // Clean wood
    metal: '#4A4A4A', // Dark metal
    fabric: '#556B2F', // Military green
    wear: 0.1, // Well-maintained
  },
  SCALE_GUARD: {
    primary: '#2F4F4F', // Dark slate
    secondary: '#8B0000', // Dark red
    wood: '#3E2723', // Dark worn wood
    metal: '#2F2F2F', // Rusted metal
    fabric: '#4A3728', // Muddy brown
    wear: 0.4, // Battle-worn
  },
  NATIVE: {
    primary: '#D2B48C', // Tan
    secondary: '#8FBC8F', // Sage green
    wood: '#DEB887', // Natural wood
    metal: '#B8860B', // Brass/bronze
    fabric: '#F5DEB3', // Wheat/natural
    wear: 0.2, // Weathered but cared for
  },
  NEUTRAL: {
    primary: '#696969', // Gray
    secondary: '#808080', // Light gray
    wood: '#A0826D', // Neutral wood
    metal: '#505050', // Steel
    fabric: '#C0C0C0', // Silver
    wear: 0.3,
  },
};

/**
 * Material types that can be created for factions
 */
export type MaterialType = 'WOOD' | 'METAL' | 'FABRIC' | 'SKIN' | 'PRIMARY' | 'SECONDARY';

/**
 * Create a material for a mesh based on faction and material type
 */
export function createFactionMaterial(
  faction: Faction,
  materialType: MaterialType,
  options: { roughness?: number; metalness?: number; opacity?: number } = {}
): THREE.MeshStandardMaterial {
  const palette = FACTION_PALETTES[faction];
  const { roughness = 0.7, metalness = 0.1, opacity = 1 } = options;

  let color: string;
  let actualRoughness = roughness;
  let actualMetalness = metalness;

  switch (materialType) {
    case 'WOOD':
      color = palette.wood;
      actualRoughness = 0.8 + palette.wear * 0.2;
      break;
    case 'METAL':
      color = palette.metal;
      actualRoughness = 0.4 + palette.wear * 0.4;
      actualMetalness = 0.8 - palette.wear * 0.3;
      break;
    case 'FABRIC':
      color = palette.fabric;
      actualRoughness = 0.9;
      actualMetalness = 0;
      break;
    case 'SKIN':
      color = palette.primary;
      actualRoughness = 0.6;
      actualMetalness = 0;
      break;
    case 'PRIMARY':
      color = palette.primary;
      break;
    case 'SECONDARY':
      color = palette.secondary;
      break;
  }

  return new THREE.MeshStandardMaterial({
    color,
    roughness: actualRoughness,
    metalness: actualMetalness,
    transparent: opacity < 1,
    opacity,
  });
}

/**
 * Get all materials for a faction
 */
export function getFactionMaterials(faction: Faction): Record<MaterialType, THREE.MeshStandardMaterial> {
  return {
    WOOD: createFactionMaterial(faction, 'WOOD'),
    METAL: createFactionMaterial(faction, 'METAL'),
    FABRIC: createFactionMaterial(faction, 'FABRIC'),
    SKIN: createFactionMaterial(faction, 'SKIN'),
    PRIMARY: createFactionMaterial(faction, 'PRIMARY'),
    SECONDARY: createFactionMaterial(faction, 'SECONDARY'),
  };
}
