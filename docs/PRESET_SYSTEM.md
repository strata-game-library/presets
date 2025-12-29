# Preset System Architecture

## Philosophy

```
Template × Variants × Themes = Unlimited Assets
```

One otter template with 8 variants and 10 themes = 80 unique otters.
One hut template with 5 variants and 10 themes = 50 unique buildings.

## Core Concepts

### 1. Templates

Templates define **all configurable parameters** for an asset type. Nothing is hidden.

```typescript
export interface QuadrupedParams {
  // Every possible knob exposed
  size: number;
  bodyLength: number;
  earSize: number;
  tailLength: number;
  furLength: number;
  // ... 40+ more
}
```

### 2. Forms

Forms are **suggested starting points**, not fixed definitions. They only specify what differs from defaults.

```typescript
export const FORMS = {
  otter: {
    bodyLength: 1.3,  // Only override what's different
    legLength: 0.6,
    webbing: 0.7,
  },
  horse: {
    size: 1.8,
    legLength: 1.5,
    mane: 1.0,
  },
};
```

### 3. Themes

Themes provide **color and material properties** independently of form. Any theme can apply to any form.

```typescript
const arcticTheme = {
  primary: '#E3F2FD',
  secondary: '#90CAF9',
  // ...
};

// Arctic otter, arctic horse, arctic anything
const arcticOtter = { ...createQuadruped('otter'), theme: arcticTheme };
```

### 4. Modifiers

Modifiers apply **multiplicative adjustments** based on categories like age or build.

```typescript
const baby = createQuadruped('otter', { age: 'baby' });
// Automatically applies: smaller size, bigger head, bigger eyes
```

## Module Structure

### Creatures

```
src/creatures/
├── quadruped.ts      # Template + Forms + Factory
├── themes.ts         # Color themes
├── morphology.ts     # Fine-grained details
└── index.ts          # Exports
```

**Forms**: otter, beaver, dog, wolf, fox, cat, lion, tiger, bear, horse, cow, pig, deer, moose, rabbit, mouse, squirrel

### Structures

```
src/structures/
└── building.ts       # Template + Forms + Factory
```

**Forms**: hut, cabin, cottage, farmhouse, barn, tower, watchtower, temple, shrine, bunker, warehouse, shack, treehouse, dock_house, windmill, lighthouse

### Collectibles

```
src/collectibles/
└── index.ts          # Template + Forms + Factory
```

**Forms**: coin, gem, crystal, orb, star, heart, key, ring, potion, scroll, rune, shard, feather, shell, pearl, acorn, fish

**Rarity Tiers**: common, uncommon, rare, epic, legendary

### Obstacles

```
src/obstacles/
└── index.ts          # Template + Forms + Factory
```

**Forms**: rock, boulder, log, stump, crate, barrel, fence, wall, pit, spike, icicle, crystal, bush, tree, fire_pit, water_pool, mud_puddle, ice_patch, whirlpool, energy_field

**Hazard Levels**: harmless, minor, moderate, severe, deadly

## Usage Examples

### Basic Usage

```typescript
import { createQuadruped, createBuilding } from '@strata-game-library/presets';

// Create with defaults
const otter = createQuadruped('otter');
const temple = createBuilding('temple');
```

### Customization

```typescript
// Override any parameter
const babyOtter = createQuadruped('otter', {
  age: 'baby',
  furLength: 1.4,  // Extra fluffy
});

// Multiple overrides
const ruinedTemple = createBuilding('temple', {
  floors: 2,
  wear: 0.7,
  overgrown: 0.5,
  damage: 0.3,
});
```

### With Themes

```typescript
import { createQuadruped, ALL_THEMES } from '@strata-game-library/presets';

const params = createQuadruped('otter');
const theme = ALL_THEMES.arctic;

// Use together in rendering
<ProceduralCreature params={params} theme={theme} />
```

### AI Prompt Generation

```typescript
import { generateCreaturePrompt } from '@strata-game-library/presets';

const prompt = generateCreaturePrompt(params, theme, 'otter');
// => "baby otter, fluffy fur, #E3F2FD colored, big eyes"

// Use with model-synth
const model = await modelSynth.character({ prompt, style: 'cartoon' });
```

## Adding New Presets

### Step 1: Define Parameters

Ask: "What are ALL the knobs someone might want to adjust?"

```typescript
export interface NewAssetParams {
  // Size & Shape
  size: number;
  width: number;
  height: number;
  
  // Appearance
  color: string;
  texture: string;
  
  // Behavior
  animated: boolean;
  // ... every possible adjustment
}
```

### Step 2: Set Defaults

```typescript
export const DEFAULTS: NewAssetParams = {
  size: 1,
  width: 1,
  height: 1,
  color: '#888888',
  texture: 'smooth',
  animated: false,
};
```

### Step 3: Create Forms

```typescript
export const FORMS = {
  formA: { size: 1.2 },      // Only what differs
  formB: { size: 0.8, animated: true },
};
```

### Step 4: Export Factory

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

### Step 5: Add Tests

```typescript
describe('createNewAsset', () => {
  it('applies form defaults', () => {
    const result = createNewAsset('formA');
    expect(result.size).toBe(1.2);
  });

  it('allows customization', () => {
    const result = createNewAsset('formA', { size: 2.0 });
    expect(result.size).toBe(2.0);
  });
});
```

## Best Practices

1. **Generic over specific** - Use "quadruped" not "otter" as base
2. **All knobs exposed** - Never hide a useful parameter
3. **Forms are suggestions** - Everything is overridable
4. **Themes are separate** - Colors independent of shape
5. **Tests required** - Every new form needs coverage
6. **Document parameters** - JSDoc all fields
