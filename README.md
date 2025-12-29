# @strata-game-library/presets

[![npm version](https://img.shields.io/npm/v/@strata-game-library/presets.svg)](https://www.npmjs.com/package/@strata-game-library/presets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pre-configured, parameterized presets for [Strata 3D](https://strata.game) - ready-to-use creatures, structures, collectibles, equipment, and more.

## 🎮 Live Demo
**Try the interactive Preset Viewer: [strata-game-library.github.io/presets/](https://strata-game-library.github.io/presets/)**

## 📚 Documentation

**Full documentation is available at [strata.game/presets](https://strata.game/presets/)**

---

## 🏢 Enterprise Context

**Strata** is the Games & Procedural division of the [jbcom enterprise](https://jbcom.github.io). This package is part of a coherent suite of specialized tools, sharing a unified design system and interconnected with sibling organizations like [Agentic](https://agentic.dev) and [Extended Data](https://extendeddata.dev).

## Features

- **Ready-to-use** - Sensible defaults for common scenarios
- **Customizable** - Override any setting as needed
- **Comprehensive** - Presets for all major Strata systems

## Installation

```bash
pnpm add @strata-game-library/presets @strata-game-library/core
```

## Usage

```typescript
import { 
  createQuadruped, 
  createBuilding, 
  createCollectible, 
  ALL_THEMES 
} from '@strata-game-library/presets';

// Create a baby otter with arctic theme
const otter = createQuadruped('otter', { age: 'baby', furLength: 1.4 });

// Create a temple building
const temple = createBuilding('temple', { floors: 2, wear: 0.3 });

// Create a rare gem collectible
const gem = createCollectible('gem', 'rare', { size: 1.5 });
```

## Available Presets

| Category | Module | Examples |
|----------|--------|----------|
| Creatures | `@strata-game-library/presets/creatures` | `createQuadruped`, `createMount` |
| Structures | `@strata-game-library/presets/structures` | `createBuilding` |
| Collectibles | `@strata-game-library/presets/collectibles` | `createCollectible` |
| Obstacles | `@strata-game-library/presets/obstacles` | `createObstacle` |
| Equipment | `@strata-game-library/presets/equipment` | `createEquipment` |
| Vehicles | `@strata-game-library/presets/vehicles` | `createVehicle` |
| AI | `@strata-game-library/presets/ai` | `GuardPreset`, `FlockPreset` |

## Related

- [Strata Documentation](https://strata.game) - Full documentation
- [Strata Core](https://github.com/strata-game-library/core) - Main library
- [Strata Shaders](https://github.com/strata-game-library/shaders) - GLSL shaders

## License

MIT © [Jon Bogaty](https://github.com/jbcom)
