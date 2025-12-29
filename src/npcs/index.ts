/**
 * NPC Presets - Non-player character configurations
 *
 * Migrated from rivermarsh - provides NPC types with AI behaviors
 */

import * as THREE from 'three';

/**
 * NPC type determines behavior and interaction
 */
export type NPCType = 'friendly' | 'hostile' | 'neutral' | 'merchant' | 'quest_giver';

/**
 * NPC faction for alignment
 */
export type NPCFaction = 
  | 'river_clan' 
  | 'marsh_raiders' 
  | 'elder_council' 
  | 'traders_guild'
  | 'neutral';

/**
 * NPC definition
 */
export interface NPCPreset {
  id: string;
  name: string;
  faction: NPCFaction;
  type: NPCType;
  position: [number, number, number];
  health?: number;
  maxHealth?: number;
  dialogue?: string[];
  quests?: string[];
  /** Wander range from spawn point */
  wanderRange?: number;
  /** Movement speed multiplier */
  speedMultiplier?: number;
}

/**
 * NPC behavior configuration
 */
export interface NPCBehaviorConfig {
  /** How far NPC can see player */
  sightRange: number;
  /** Distance to trigger interaction */
  interactRange: number;
  /** Aggro distance for hostiles */
  aggroRange: number;
  /** Time between wander target changes (ms) */
  wanderInterval: number;
}

/**
 * Default behavior configs by NPC type
 */
export const NPC_BEHAVIOR_DEFAULTS: Record<NPCType, NPCBehaviorConfig> = {
  friendly: {
    sightRange: 20,
    interactRange: 3,
    aggroRange: 0,
    wanderInterval: 5000,
  },
  hostile: {
    sightRange: 15,
    interactRange: 0,
    aggroRange: 15,
    wanderInterval: 3000,
  },
  neutral: {
    sightRange: 10,
    interactRange: 3,
    aggroRange: 0,
    wanderInterval: 6000,
  },
  merchant: {
    sightRange: 15,
    interactRange: 4,
    aggroRange: 0,
    wanderInterval: 0, // Merchants don't wander
  },
  quest_giver: {
    sightRange: 20,
    interactRange: 4,
    aggroRange: 0,
    wanderInterval: 0, // Quest givers stay put
  },
};

/**
 * NPC color by type (for placeholder meshes)
 */
export const NPC_COLORS: Record<NPCType, number> = {
  friendly: 0x8b6914,    // Brown
  hostile: 0x8b0000,     // Dark red
  neutral: 0x696969,     // Gray
  merchant: 0xdaa520,    // Gold
  quest_giver: 0x4169e1, // Royal blue
};

/**
 * Example NPC presets from rivermarsh
 */
export const EXAMPLE_NPCS: NPCPreset[] = [
  {
    id: 'elder_moss',
    name: 'Elder Moss',
    faction: 'elder_council',
    type: 'quest_giver',
    position: [10, 1, 10],
    dialogue: [
      'Greetings, young otter! Welcome to Rivermarsh.',
      'We face dark times... the Marsh Raiders have been stealing our fish!',
      'Would you help us recover our stolen supplies?',
    ],
    quests: ['recover_fish'],
  },
  {
    id: 'trader_pebble',
    name: 'Trader Pebble',
    faction: 'traders_guild',
    type: 'merchant',
    position: [-10, 1, 15],
    dialogue: [
      'Looking to trade? I have the finest shells and stones!',
      'Fresh fish for sale, caught this morning!',
    ],
  },
  {
    id: 'marsh_raider',
    name: 'Marsh Raider',
    faction: 'marsh_raiders',
    type: 'hostile',
    position: [40, 1, 30],
    health: 50,
    maxHealth: 50,
    wanderRange: 5,
    speedMultiplier: 1.2,
  },
  {
    id: 'splash',
    name: 'Splash',
    faction: 'river_clan',
    type: 'friendly',
    position: [5, 1, -10],
    dialogue: [
      'Beautiful day for swimming!',
      'Watch out for the raiders near the eastern marsh.',
    ],
    wanderRange: 10,
  },
];

/**
 * Get NPC color for type
 */
export function getNPCColor(type: NPCType): THREE.Color {
  return new THREE.Color(NPC_COLORS[type]);
}

/**
 * Get behavior config for NPC type
 */
export function getNPCBehavior(type: NPCType): NPCBehaviorConfig {
  return { ...NPC_BEHAVIOR_DEFAULTS[type] };
}
