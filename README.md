# @jbcom/strata-presets

Pre-configured presets for [Strata 3D](https://github.com/jbcom/nodejs-strata) - ready-to-use terrain, weather, physics, and more.

## Features

- **Ready-to-use** - Sensible defaults for common scenarios
- **Customizable** - Override any setting as needed
- **Comprehensive** - Presets for all major Strata systems

## Installation

```bash
npm install @jbcom/strata-presets @jbcom/strata
# or
pnpm add @jbcom/strata-presets @jbcom/strata
```

## Usage

```typescript
import { createTerrainPreset, TerrainBiomes } from '@jbcom/strata-presets/terrain';
import { createWeatherPreset, WeatherPresets } from '@jbcom/strata-presets/weather';

// Create terrain with predefined biomes
const terrain = createTerrainPreset({
  biomes: [TerrainBiomes.GRASSLAND, TerrainBiomes.MOUNTAIN],
  resolution: 128,
});

// Apply weather preset
const weather = createWeatherPreset(WeatherPresets.RAIN);
```

## Available Presets

### Terrain (`@jbcom/strata-presets/terrain`)
- `createTerrainPreset` - Generate procedural terrain
- `TerrainBiomes` - Grassland, desert, mountain, tundra, etc.

### Weather (`@jbcom/strata-presets/weather`)
- `createWeatherPreset` - Rain, snow, fog, storm
- Weather transition utilities

### Physics (`@jbcom/strata-presets/physics`)
- `createPhysicsPreset` - Collision, buoyancy, wind
- Vehicle and character physics

### Animation (`@jbcom/strata-presets/animation`)
- `createAnimationPreset` - Walk cycles, IK solvers
- Gait configurations

### Vegetation (`@jbcom/strata-presets/vegetation`)
- `createVegetationPreset` - Grass, trees, bushes
- LOD and instancing settings

### Clouds (`@jbcom/strata-presets/clouds`)
- `createCloudPreset` - Cumulus, stratus, cumulonimbus
- Volumetric cloud settings

### Water (`@jbcom/strata-presets/water`)
- `createWaterPreset` - Ocean, lake, river
- Reflection and refraction settings

### Audio (`@jbcom/strata-presets/audio`)
- `createAudioPreset` - Ambient, spatial audio
- Environment presets

### Camera (`@jbcom/strata-presets/camera`)
- `createCameraPreset` - First-person, third-person, cinematic
- Transition configurations

## Related

- [Strata 3D](https://github.com/jbcom/nodejs-strata) - Full procedural graphics library
- [Strata Shaders](https://github.com/jbcom/nodejs-strata-shaders) - GLSL shader collection
- [Strata Examples](https://github.com/jbcom/nodejs-strata-examples) - Example applications

## License

MIT © [Jon Bogaty](https://github.com/jbcom)
