# @strata/presets

Pre-configured presets for [Strata 3D](https://github.com/jbcom/nodejs-strata) - ready-to-use terrain, weather, physics, and more.

## Features

- **Ready-to-use** - Sensible defaults for common scenarios
- **Customizable** - Override any setting as needed
- **Comprehensive** - Presets for all major Strata systems

## Installation

```bash
npm install @strata/presets @strata/core
# or
pnpm add @strata/presets @strata/core
```

## Usage

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata/presets/terrain';
import { createWeatherPreset, WeatherPresets } from '@strata/presets/weather';

// Create terrain with predefined biomes
const terrain = createTerrainPreset({
  biomes: [TerrainBiomes.GRASSLAND, TerrainBiomes.MOUNTAIN],
  resolution: 128,
});

// Apply weather preset
const weather = createWeatherPreset(WeatherPresets.RAIN);
```

## Available Presets

### Terrain (`@strata/presets/terrain`)
- `createTerrainPreset` - Generate procedural terrain
- `TerrainBiomes` - Grassland, desert, mountain, tundra, etc.

### Weather (`@strata/presets/weather`)
- `createWeatherPreset` - Rain, snow, fog, storm
- Weather transition utilities

### Physics (`@strata/presets/physics`)
- `createPhysicsPreset` - Collision, buoyancy, wind
- Vehicle and character physics

### Animation (`@strata/presets/animation`)
- `createAnimationPreset` - Walk cycles, IK solvers
- Gait configurations

### Vegetation (`@strata/presets/vegetation`)
- `createVegetationPreset` - Grass, trees, bushes
- LOD and instancing settings

### Clouds (`@strata/presets/clouds`)
- `createCloudPreset` - Cumulus, stratus, cumulonimbus
- Volumetric cloud settings

### Water (`@strata/presets/water`)
- `createWaterPreset` - Ocean, lake, river
- Reflection and refraction settings

### Audio (`@strata/presets/audio`)
- `createAudioPreset` - Ambient, spatial audio
- Environment presets

### Camera (`@strata/presets/camera`)
- `createCameraPreset` - First-person, third-person, cinematic
- Transition configurations

## Related

- [Strata 3D](https://github.com/jbcom/nodejs-strata) - Full procedural graphics library
- [Strata Shaders](https://github.com/jbcom/nodejs-strata-shaders) - GLSL shader collection
- [Strata Examples](https://github.com/jbcom/nodejs-strata-examples) - Example applications

## License

MIT © [Jon Bogaty](https://github.com/jbcom)
