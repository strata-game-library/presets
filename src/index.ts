/**
 * @strata-game-library/presets
 *
 * Generic, composable preset system for game assets.
 *
 * PHILOSOPHY:
 * - Define ALL the knobs for each asset type
 * - Provide FORMS as suggested starting points
 * - Apply THEMES for colors
 * - Everything is customizable
 *
 * @example
 * ```typescript
 * import {
 *   createQuadruped,
 *   createBuilding,
 *   createCollectible,
 *   createObstacle,
 *   ALL_THEMES,
 *   generateCreaturePrompt
 * } from '@strata-game-library/presets';
 *
 * // Create a baby otter with arctic theme
 * const otter = createQuadruped('otter', { age: 'baby', furLength: 1.4 });
 * const prompt = generateCreaturePrompt(otter, ALL_THEMES.arctic, 'otter');
 *
 * // Create a temple building
 * const temple = createBuilding('temple', { floors: 2, wear: 0.3 });
 *
 * // Create a rare gem collectible
 * const gem = createCollectible('gem', 'rare', { size: 1.5 });
 *
 * // Create a moving spike obstacle
 * const spike = createObstacle('spike', 'severe', { moving: true });
 * ```
 */

// Creatures (quadrupeds, etc.)
export * from './creatures';

// Structures (buildings, etc.)
export * from './structures/building';

// Collectibles (coins, gems, etc.)
export * from './collectibles';

// Obstacles (rocks, spikes, etc.)
export * from './obstacles';
