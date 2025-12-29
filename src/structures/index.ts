/**
 * Structure Presets - Procedural building generation
 *
 * Migrated from otter-elite-force - provides modular building assembly
 */

import * as THREE from 'three';
import { createFactionMaterial, type Faction } from '../factions';

/**
 * Mesh geometry types available
 */
export type GeometryType = 'BOX' | 'CYLINDER' | 'SPHERE' | 'CAPSULE' | 'CONE' | 'TORUS';

/**
 * Structural component IDs
 */
export type StructureComponentId =
  // Foundation
  | 'STILT_ROUND'
  | 'STILT_SQUARE'
  // Flooring
  | 'FLOOR_PLANK'
  | 'FLOOR_SECTION_2X2'
  // Walls
  | 'WALL_FRAME'
  | 'WALL_BAMBOO_SLATS'
  | 'WALL_THATCH_PANEL'
  // Roofing
  | 'ROOF_BEAM'
  | 'ROOF_THATCH_SECTION'
  | 'ROOF_TIN_SECTION'
  // Accessories
  | 'LADDER_SEGMENT'
  | 'RAILING_SECTION'
  | 'ROPE_COIL'
  | 'ROPE_BINDING';

/**
 * Component definition
 */
export interface StructureComponent {
  id: StructureComponentId;
  geometryType: GeometryType;
  geometryParams: number[];
  defaultScale: THREE.Vector3;
}

/**
 * Structural component library
 */
export const STRUCTURE_COMPONENTS: Record<StructureComponentId, StructureComponent> = {
  // Foundation
  STILT_ROUND: {
    id: 'STILT_ROUND',
    geometryType: 'CYLINDER',
    geometryParams: [0.06, 0.06, 1, 8],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  STILT_SQUARE: {
    id: 'STILT_SQUARE',
    geometryType: 'BOX',
    geometryParams: [0.12, 1, 0.12],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  // Flooring
  FLOOR_PLANK: {
    id: 'FLOOR_PLANK',
    geometryType: 'BOX',
    geometryParams: [1, 0.04, 0.15],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  FLOOR_SECTION_2X2: {
    id: 'FLOOR_SECTION_2X2',
    geometryType: 'BOX',
    geometryParams: [2, 0.08, 2],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  // Walls
  WALL_FRAME: {
    id: 'WALL_FRAME',
    geometryType: 'BOX',
    geometryParams: [2, 1.8, 0.08],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  WALL_BAMBOO_SLATS: {
    id: 'WALL_BAMBOO_SLATS',
    geometryType: 'BOX',
    geometryParams: [2, 1.8, 0.05],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  WALL_THATCH_PANEL: {
    id: 'WALL_THATCH_PANEL',
    geometryType: 'BOX',
    geometryParams: [2, 1.8, 0.1],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  // Roofing
  ROOF_BEAM: {
    id: 'ROOF_BEAM',
    geometryType: 'BOX',
    geometryParams: [0.1, 0.1, 3],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  ROOF_THATCH_SECTION: {
    id: 'ROOF_THATCH_SECTION',
    geometryType: 'BOX',
    geometryParams: [2, 0.15, 2],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  ROOF_TIN_SECTION: {
    id: 'ROOF_TIN_SECTION',
    geometryType: 'BOX',
    geometryParams: [2, 0.02, 2],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  // Accessories
  LADDER_SEGMENT: {
    id: 'LADDER_SEGMENT',
    geometryType: 'BOX',
    geometryParams: [0.4, 1, 0.08],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  RAILING_SECTION: {
    id: 'RAILING_SECTION',
    geometryType: 'BOX',
    geometryParams: [2, 0.8, 0.04],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  ROPE_COIL: {
    id: 'ROPE_COIL',
    geometryType: 'TORUS',
    geometryParams: [0.15, 0.02, 8, 16],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
  ROPE_BINDING: {
    id: 'ROPE_BINDING',
    geometryType: 'CYLINDER',
    geometryParams: [0.08, 0.08, 0.1, 8],
    defaultScale: new THREE.Vector3(1, 1, 1),
  },
};

/**
 * Hut assembly configuration
 */
export interface HutConfig {
  minStilts: number;
  maxStilts: number;
  floorHeight: { min: number; max: number };
  roomSize: { min: number; max: number };
  roofPitch: { min: number; max: number };
  wearVariation: number;
}

/**
 * Hut variant types
 */
export type HutVariant = 'BASIC' | 'LONGHOUSE' | 'HEALER';

/**
 * Default hut configuration
 */
export const DEFAULT_HUT_CONFIG: HutConfig = {
  minStilts: 4,
  maxStilts: 9,
  floorHeight: { min: 0.5, max: 2.5 },
  roomSize: { min: 2.5, max: 5 },
  roofPitch: { min: 0.3, max: 0.6 },
  wearVariation: 0.3,
};

/**
 * Create geometry from component definition
 */
export function createComponentGeometry(component: StructureComponent): THREE.BufferGeometry {
  const params = component.geometryParams;

  switch (component.geometryType) {
    case 'BOX':
      return new THREE.BoxGeometry(params[0], params[1], params[2]);
    case 'CYLINDER':
      return new THREE.CylinderGeometry(params[0], params[1], params[2], params[3] || 8);
    case 'SPHERE':
      return new THREE.SphereGeometry(params[0], params[1] || 12, params[2] || 8);
    case 'CAPSULE':
      return new THREE.CapsuleGeometry(params[0], params[1], params[2] || 4, params[3] || 8);
    case 'CONE':
      return new THREE.ConeGeometry(params[0], params[1], params[2] || 8);
    case 'TORUS':
      return new THREE.TorusGeometry(params[0], params[1], params[2] || 8, params[3] || 16);
    default:
      return new THREE.BoxGeometry(1, 1, 1);
  }
}

/**
 * Create a structural component mesh
 */
export function createComponentMesh(
  componentId: StructureComponentId,
  faction: Faction = 'NEUTRAL'
): THREE.Mesh {
  const component = STRUCTURE_COMPONENTS[componentId];
  const geometry = createComponentGeometry(component);
  
  // Determine material type based on component
  const materialType = componentId.includes('ROPE') ? 'FABRIC' 
    : componentId.includes('TIN') ? 'METAL' 
    : 'WOOD';
  
  const material = createFactionMaterial(faction, materialType);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.copy(component.defaultScale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  
  return mesh;
}

/**
 * Seeded random number generator for deterministic generation
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }
}

/**
 * Assemble a basic hut structure
 */
export function assembleHut(
  seed: number,
  faction: Faction = 'NEUTRAL',
  variant: HutVariant = 'BASIC',
  config: HutConfig = DEFAULT_HUT_CONFIG
): THREE.Group {
  const random = new SeededRandom(seed);
  const hut = new THREE.Group();

  // Determine size based on variant
  const sizeMultiplier = variant === 'LONGHOUSE' ? 1.8 : variant === 'HEALER' ? 1.2 : 1.0;
  const roomWidth = random.range(config.roomSize.min, config.roomSize.max) * sizeMultiplier;
  const roomDepth = random.range(config.roomSize.min, config.roomSize.max);
  const floorHeight = random.range(config.floorHeight.min, config.floorHeight.max);

  // Create stilts at corners
  const stiltPositions = [
    [-roomWidth / 2, -roomDepth / 2],
    [roomWidth / 2, -roomDepth / 2],
    [-roomWidth / 2, roomDepth / 2],
    [roomWidth / 2, roomDepth / 2],
  ];

  for (const [x, z] of stiltPositions) {
    const stilt = createComponentMesh('STILT_ROUND', faction);
    stilt.scale.y = floorHeight;
    stilt.position.set(x, floorHeight / 2, z);
    hut.add(stilt);
  }

  // Create floor
  const floor = createComponentMesh('FLOOR_SECTION_2X2', faction);
  floor.scale.set(roomWidth / 2, 1, roomDepth / 2);
  floor.position.set(0, floorHeight, 0);
  hut.add(floor);

  // Create walls (3 sides, one open)
  const wallHeight = 1.8;
  const wallConfigs = [
    { pos: [0, floorHeight + wallHeight / 2, -roomDepth / 2], rot: 0 },
    { pos: [-roomWidth / 2, floorHeight + wallHeight / 2, 0], rot: Math.PI / 2 },
    { pos: [roomWidth / 2, floorHeight + wallHeight / 2, 0], rot: Math.PI / 2 },
  ];

  for (const wallConfig of wallConfigs) {
    const wall = createComponentMesh('WALL_BAMBOO_SLATS', faction);
    wall.position.set(wallConfig.pos[0], wallConfig.pos[1], wallConfig.pos[2]);
    wall.rotation.y = wallConfig.rot;
    hut.add(wall);
  }

  // Create roof
  const roofPitch = random.range(config.roofPitch.min, config.roofPitch.max);
  const roof = createComponentMesh('ROOF_THATCH_SECTION', faction);
  roof.scale.set(roomWidth / 2 + 0.3, 1, roomDepth / 2 + 0.3);
  roof.position.set(0, floorHeight + wallHeight + 0.3, 0);
  roof.rotation.x = roofPitch;
  hut.add(roof);

  // Add ladder if elevated
  if (floorHeight > 0.8) {
    const ladder = createComponentMesh('LADDER_SEGMENT', faction);
    ladder.scale.y = floorHeight;
    ladder.position.set(0, floorHeight / 2, roomDepth / 2 + 0.2);
    ladder.rotation.x = -0.2;
    hut.add(ladder);
  }

  return hut;
}
