# Active Context

## Current Focus
- Comprehensive preset system overhaul with parameterized templates
- Repository modernization (pnpm, biome, tsup, vitest)

## Recent Decisions
- Replaced game-specific presets with generic parameterized templates
- Philosophy: Template × Variants × Themes = Unlimited Assets
- Added Vitest unit tests for all new preset modules
- Created GitHub issues for future work (equipment, vehicles, environment, etc.)

## Session: 2025-12-29

### Completed
- [x] Fixed CI/CD workflow issues in `ci.yml` and `cd.yml`.
- [x] Migrated `tsup.config.ts` to use dynamic entry points via `globSync`.
- [x] Fixed broken imports from `@strata-game-library/core` across multiple files.
- [x] Updated `src/yuka.d.ts` with missing AI state machine and behavior types.
- [x] Verified build success with `pnpm run build`.
- [x] Refactored presets to be parameterized and generic
  - creatures/quadruped.ts: 40+ parameters, 17 forms
  - structures/building.ts: 50+ parameters, 16 forms
  - collectibles/index.ts: 30+ parameters, 17 forms
  - obstacles/index.ts: 35+ parameters, 21 forms
  - creatures/themes.ts: Natural + Fantasy themes
  - creatures/morphology.ts: Fine-grained creature details
- [x] Rebased feature branch onto main (after #12 merge)
- [x] Updated AGENTS.md with presets-specific instructions
- [x] Updated CLAUDE.md with module overview
- [x] Added .github/copilot-instructions.md
- [x] Added Vitest configuration and test scripts
- [x] Added comprehensive unit tests for all modules
- [x] Updated CI workflow to run tests
- [x] Updated package.json with new exports and dependencies
- [x] Created GitHub issues for future work (#15-#21)

### For Next Agent
- [ ] PR #12 is now merged.
- [ ] PR #14 is now fully ready for merge and build-verified.
- [ ] Extract presets from core to this repository.
- [ ] Add Playwright e2e tests (issue #18)
- [ ] Update README.md with comprehensive examples

## Key Files

| File | Purpose |
|------|---------|
| `src/creatures/quadruped.ts` | Main creature template |
| `src/creatures/themes.ts` | Color themes |
| `src/structures/building.ts` | Building template |
| `src/collectibles/index.ts` | Collectible template |
| `src/obstacles/index.ts` | Obstacle template |
| `tests/*.test.ts` | Unit tests |
| `vitest.config.ts` | Test configuration |

## Open PRs

- #14: feat: comprehensive preset system (OPEN - this work)
