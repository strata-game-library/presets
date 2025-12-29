/**
 * Character Presets - Ready-to-use character configurations
 *
 * Migrated from otter-river-rush and otter-elite-force
 */

import type { CharacterOptions } from './index';

/**
 * Character stats for gameplay
 */
export interface CharacterStats {
  speed: number;
  health: number;
  handling: number;
}

/**
 * Full character preset definition
 */
export interface CharacterPreset {
  id: string;
  name: string;
  description: string;
  stats: CharacterStats;
  options: CharacterOptions;
}

/**
 * Otter character presets from otter-river-rush
 */
export const OTTER_PRESETS: Record<string, CharacterPreset> = {
  rusty: {
    id: 'rusty',
    name: 'Rusty',
    description: 'The classic adventurer. Balanced stats for any river.',
    stats: {
      speed: 1.0,
      health: 3,
      handling: 1.0,
    },
    options: {
      skinColor: 0x8b6914,
      scale: 1.0,
    },
  },
  dash: {
    id: 'dash',
    name: 'Dash',
    description: 'Speed demon. Faster movement but fragile.',
    stats: {
      speed: 1.2,
      health: 2,
      handling: 1.2,
    },
    options: {
      skinColor: 0x7a5c12,
      scale: 0.9,
    },
  },
  rocky: {
    id: 'rocky',
    name: 'Rocky',
    description: 'Tough as nails. Can take more hits but moves slower.',
    stats: {
      speed: 0.8,
      health: 5,
      handling: 0.8,
    },
    options: {
      skinColor: 0x6b5a20,
      scale: 1.1,
    },
  },
  soldier: {
    id: 'soldier',
    name: 'Soldier',
    description: 'Tactical operative. Combat-ready with balanced loadout.',
    stats: {
      speed: 1.0,
      health: 4,
      handling: 1.1,
    },
    options: {
      skinColor: 0x5d4e37,
      scale: 1.0,
    },
  },
};

/**
 * Gator character presets from otter-elite-force
 */
export const GATOR_PRESETS: Record<string, CharacterPreset> = {
  grunt: {
    id: 'gator-grunt',
    name: 'Gator Grunt',
    description: 'Standard Scale Guard foot soldier. Tough but slow.',
    stats: {
      speed: 0.7,
      health: 6,
      handling: 0.6,
    },
    options: {
      skinColor: 0x2f4f4f,
      scale: 1.3,
    },
  },
  boss: {
    id: 'gator-boss',
    name: 'Gator Boss',
    description: 'Scale Guard commander. Heavily armored.',
    stats: {
      speed: 0.5,
      health: 10,
      handling: 0.5,
    },
    options: {
      skinColor: 0x1a3333,
      scale: 1.6,
    },
  },
};

/**
 * Get preset by ID
 */
export function getCharacterPreset(id: string): CharacterPreset | undefined {
  return OTTER_PRESETS[id] || GATOR_PRESETS[id];
}

/**
 * All available character presets
 */
export const ALL_PRESETS = {
  otters: OTTER_PRESETS,
  gators: GATOR_PRESETS,
};
