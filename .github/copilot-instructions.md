# Copilot Instructions for @strata-game-library/presets

## Repository Purpose

This package provides **parameterized, themable asset templates** for games. Each asset type (creatures, buildings, collectibles, obstacles) has:
- A template with ALL configurable parameters
- "Forms" as suggested starting configurations
- "Themes" for color/material customization

## Key Commands

```bash
pnpm install          # Install dependencies
pnpm run build        # Build with tsup
pnpm run lint         # Lint with Biome
pnpm run lint:fix     # Auto-fix lint issues
pnpm run typecheck    # TypeScript check
pnpm run test         # Run Vitest tests
pnpm run test:e2e     # Run Playwright e2e tests
```

## Code Patterns

### Creating a New Form

```typescript
// Forms only specify what differs from DEFAULTS
export const FORMS: Record<FormName, Partial<Params>> = {
  newForm: {
    size: 1.2,      // Only include parameters that differ
    height: 0.8,
  },
};
```

### Factory Function Pattern

```typescript
export function createAsset(
  form: FormName,
  customizations?: Partial<Params>
): Params {
  return {
    ...DEFAULTS,
    ...FORMS[form],
    ...customizations,
  };
}
```

### Theme Application

Themes are separate from forms - any theme can apply to any form:

```typescript
const params = createQuadruped('otter');
const theme = ALL_THEMES.arctic;
// Use both together but they're independent
```

## File Structure

```
src/
├── creatures/          # Animals (quadrupeds)
│   ├── quadruped.ts    # Template, forms, factory
│   ├── themes.ts       # Color themes
│   └── morphology.ts   # Fine-grained parameters
├── structures/         # Buildings
│   └── building.ts
├── collectibles/       # Pickups
│   └── index.ts
├── obstacles/          # Hazards
│   └── index.ts
```

## Testing Patterns

```typescript
describe('createQuadruped', () => {
  it('applies form defaults', () => {
    const result = createQuadruped('otter');
    expect(result.earSize).toBe(FORMS.otter.earSize);
  });

  it('allows customization override', () => {
    const result = createQuadruped('otter', { earSize: 2.0 });
    expect(result.earSize).toBe(2.0);
  });

  it('applies age modifiers', () => {
    const baby = createQuadruped('otter', { age: 'baby' });
    expect(baby.size).toBeLessThan(1);
  });
});
```

## Important Principles

1. **Generic templates** - Use "quadruped" not "otter" as the base
2. **All knobs exposed** - Never hide a parameter that could be useful
3. **Forms are optional** - Can use `createCustomQuadruped()` directly
4. **Themes independent** - Colors separate from shape/form
5. **Tests required** - Every new form needs test coverage

## Exports

Each module exports:
- `*Params` interface (all parameters)
- `DEFAULTS` constant
- `FORMS` record
- `create*()` factory function
- Type unions for form names

## Related Packages

- `@strata-game-library/core` - Uses these presets
- `@strata-game-library/model-synth` - AI model generation from prompts
- `@strata-game-library/shaders` - Visual effects for themes
