# CLAUDE.md

Quick reference for Claude Code working with @strata-game-library/presets.

## Quick Start

```bash
# Install and build
pnpm install
pnpm run build

# Check types
pnpm run typecheck

# Lint
pnpm run lint

# Test
pnpm run test
```

## What This Package Does

Provides **parameterized templates** for game assets. Each template defines ALL configurable parameters, with "forms" as suggested starting points.

```typescript
// ONE template, MANY variations
const babyOtter = createQuadruped('otter', { age: 'baby' });
const oldWolf = createQuadruped('wolf', { age: 'old', wear: 0.5 });
const ruinedTemple = createBuilding('temple', { wear: 0.7, overgrown: 0.4 });
```

## Key Modules

| Module | Factory | Forms |
|--------|---------|-------|
| `creatures` | `createQuadruped()` | otter, dog, cat, wolf, bear, horse... |
| `structures` | `createBuilding()` | hut, cabin, temple, tower, barn... |
| `collectibles` | `createCollectible()` | coin, gem, star, heart, potion... |
| `obstacles` | `createObstacle()` | rock, spike, pit, fire_pit, ice_patch... |

## Design Principles

1. **Generic over specific** - "quadruped" not "otter"
2. **All knobs exposed** - Never hide a parameter
3. **Forms are suggestions** - Everything overridable
4. **Themes are separate** - Colors applied independently
5. **Tests required** - Every factory needs unit tests

## Adding New Features

### New Form

```typescript
// In src/creatures/quadruped.ts
export const FORMS = {
  // ... existing
  newAnimal: {
    earSize: 1.2,
    tailLength: 0.8,
    // Only what differs from DEFAULTS
  },
};
```

### New Parameter

1. Add to interface
2. Add default value
3. Update any affected forms
4. Add test coverage

### New Module

1. Create `src/modulename/index.ts`
2. Define `Params` interface with ALL knobs
3. Define `DEFAULTS`
4. Define `FORMS` as partial overrides
5. Export `create*()` factory
6. Add to `src/index.ts` exports
7. Add to `package.json` exports
8. Add tests

## File Locations

```
src/creatures/quadruped.ts    # 40+ params, 17 forms
src/creatures/themes.ts       # Color themes
src/creatures/morphology.ts   # Fine-grained details
src/structures/building.ts    # 50+ params, 16 forms
src/collectibles/index.ts     # 30+ params, 17 forms
src/obstacles/index.ts        # 35+ params, 21 forms
```

## Integration Points

- **@strata-game-library/core**: Loads and applies presets
- **@strata-game-library/model-synth**: Uses `generatePrompt()` for AI models
- **@strata-game-library/shaders**: Material presets for themes

## Common Tasks

### Check a preset works
```typescript
import { createQuadruped, DEFAULTS } from './creatures/quadruped';
const result = createQuadruped('otter');
console.log(result); // Should have all DEFAULTS merged with otter form
```

### Generate AI prompt
```typescript
import { generateCreaturePrompt, ALL_THEMES } from './creatures';
const params = createQuadruped('otter', { age: 'baby' });
const prompt = generateCreaturePrompt(params, ALL_THEMES.arctic, 'otter');
// => "baby otter, fluffy fur, #E3F2FD colored, big eyes"
```

## Dependencies

- `three`: 3D math and geometry
- `@react-three/fiber`: React integration
- `@strata-game-library/core`: Core preset system
- `yuka`: Game AI utilities

## CI/CD

- **CI**: Runs on PRs - lint, typecheck, build, test
- **CD**: Runs on main - semantic-release to npm

## Memory Bank

Check `memory-bank/activeContext.md` for current session state.
