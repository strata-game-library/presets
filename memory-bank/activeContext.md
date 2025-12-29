# Active Context

## Current Focus
- Configure 21st.dev Magic MCP for local Cursor IDE integration (Issue #4).

## Recent Decisions
- Created `.cursor/mcp.json` with the required configuration for `21st-magic`.
- Initialized memory bank for session tracking.

## Session: 2025-12-29

### Completed
- [x] Fixed CI/CD workflow issues in `ci.yml` and `cd.yml`.
- [x] Migrated `tsup.config.ts` to use dynamic entry points via `glob`.
- [x] Fixed broken imports from `@strata-game-library/core` across multiple files.
- [x] Updated `src/yuka.d.ts` with missing AI state machine and behavior types.
- [x] Verified build success with `pnpm run build`.

### For Next Agent
- [ ] PR #12 is now fully ready for merge and build-verified.
- [ ] Once merged, PR #14 can be rebased cleanly onto main.

