# AGENTS.md

Comprehensive instructions for AI agents working with this repository.

## Repository Overview

`@strata-game-library/presets` provides **parameterized, themable asset templates** for games built with Strata.

### Core Philosophy

```
Template × Variants × Themes = Unlimited Assets
```

- **Templates** define all available knobs (40+ parameters per asset type)
- **Forms** are suggested starting configurations (otter, temple, gem, etc.)
- **Themes** apply colors independently of form
- Everything is customizable - forms are just starting points

## Agent Types

| Agent | Best For | Context File |
|-------|----------|--------------|
| **Claude** | Complex reasoning, architecture, cross-repo work | `CLAUDE.md` |
| **Copilot** | Issue kickoffs, targeted fixes, code generation | `.github/copilot-instructions.md` |
| **Cursor** | IDE-integrated development | `.cursor/rules/*.mdc` |

## Development Commands

```bash
# Install dependencies
pnpm install

# Build (uses tsup for ESM)
pnpm run build

# Lint with Biome
pnpm run lint
pnpm run lint:fix

# Type check
pnpm run typecheck

# Run tests
pnpm run test

# Run e2e tests
pnpm run test:e2e
```

## Module Structure

```
src/
├── creatures/          # Quadruped templates (otter, dog, horse, etc.)
│   ├── quadruped.ts    # Main template with 40+ parameters
│   ├── themes.ts       # Color themes (natural, fantasy)
│   ├── morphology.ts   # Detailed fine-grained parameters
│   └── index.ts
├── structures/         # Building templates
│   └── building.ts     # 50+ parameters, 16 forms
├── collectibles/       # Pickup items
│   └── index.ts        # 30+ parameters, 17 forms
├── obstacles/          # Hazards and blockers
│   └── index.ts        # 35+ parameters, 21 forms
└── [existing modules]  # ai, animation, audio, etc.
```

## Adding New Presets

### 1. Define ALL Parameters

Ask: "What are ALL the knobs someone might want to adjust?"

```typescript
export interface NewAssetParams {
  // Group parameters logically
  size: number;
  // ... every possible adjustment
}

export const DEFAULTS: NewAssetParams = {
  size: 1,
  // ... sensible defaults
};
```

### 2. Create Forms (Starting Points)

Forms are just partial parameter overrides:

```typescript
export const FORMS: Record<FormName, Partial<NewAssetParams>> = {
  variantA: { size: 1.2, /* only what differs */ },
  variantB: { size: 0.8 },
};
```

### 3. Add Factory Function

```typescript
export function createNewAsset(
  form: FormName,
  customizations?: Partial<NewAssetParams>
): NewAssetParams {
  return {
    ...DEFAULTS,
    ...FORMS[form],
    ...customizations,
  };
}
```

### 4. Add Tests

```typescript
// tests/new-asset.test.ts
describe('createNewAsset', () => {
  it('applies form defaults', () => {
    const asset = createNewAsset('variantA');
    expect(asset.size).toBe(1.2);
  });

  it('allows customization', () => {
    const asset = createNewAsset('variantA', { size: 2.0 });
    expect(asset.size).toBe(2.0);
  });
});
```

## Integration with @strata-game-library/core

Presets are designed to work with core's preset loading system:

```typescript
import { usePreset } from '@strata-game-library/core';
import { createQuadruped, ALL_THEMES } from '@strata-game-library/presets';

function OtterCharacter() {
  const params = createQuadruped('otter', { age: 'baby' });
  const theme = ALL_THEMES.arctic;
  
  // Use params to configure model
  return <ProceduralCreature params={params} theme={theme} />;
}
```

## Testing Requirements

### Unit Tests (Vitest)
- Every factory function must have tests
- Test all forms produce valid output
- Test customization overrides work
- Test modifier combinations (age × build × condition)

### E2E Tests (Playwright)
- Load each preset type with @strata-game-library/core
- Snapshot render output
- Verify theme application
- Test prompt generation produces valid strings

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(creatures): add dragon form to quadruped template
fix(collectibles): correct gem facet count default
test(obstacles): add coverage for moving obstacles
docs(readme): update usage examples
```

## Related Repositories

| Repo | Purpose |
|------|---------|
| `strata-game-library/core` | Core rendering, preset loading |
| `strata-game-library/shaders` | GLSL shader presets |
| `strata-game-library/audio-synth` | Procedural audio |
| `strata-game-library/model-synth` | 3D model generation (Meshy) |

## What NOT To Do

- ❌ Don't create game-specific presets (no "RustyTheOtter")
- ❌ Don't hardcode colors in forms (use themes)
- ❌ Don't skip parameter documentation
- ❌ Don't add presets without corresponding tests
- ❌ Don't merge without CI passing
