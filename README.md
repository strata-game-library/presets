# @strata-game-library/presets

[![npm version](https://img.shields.io/npm/v/@strata-game-library/presets.svg)](https://www.npmjs.com/package/@strata-game-library/presets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pre-configured presets for [Strata 3D](https://strata.game) - ready-to-use terrain, weather, physics, and more.

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
npm install @strata-game-library/presets @strata-game-library/core
# or
pnpm add @strata-game-library/presets @strata-game-library/core
```

## Usage

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata-game-library/presets/terrain';
import { createWeatherPreset, WeatherPresets } from '@strata-game-library/presets/weather';

// Create terrain with predefined biomes
const terrain = createTerrainPreset({
  biomes: [TerrainBiomes.GRASSLAND, TerrainBiomes.MOUNTAIN],
  resolution: 128,
});

// Apply weather preset
const weather = createWeatherPreset(WeatherPresets.RAIN);
```

## Available Presets

| Category | Functions |
|----------|-----------|
| Terrain | `createTerrainPreset`, `TerrainBiomes` |
| Weather | `createWeatherPreset`, `WeatherPresets` |
| Water | `createWaterPreset`, `WaterTypes` |
| Vegetation | `createVegetationPreset` |
| Clouds | `createCloudPreset` |
| Camera | `createCameraPreset` |
| Animation | `createAnimationPreset` |
| Physics | `createPhysicsPreset` |
| Audio | `createAudioPreset` |

## Related

- [Strata Documentation](https://strata.game) - Full documentation
- [Strata Core](https://github.com/strata-game-library/core) - Main library
- [Strata Shaders](https://github.com/strata-game-library/shaders) - GLSL shaders

## License

MIT © [Jon Bogaty](https://github.com/jbcom)
