<!-- a1bc4094-dc14-4457-bb1b-0361be6098cd 8f4ab180-be8c-45e7-883d-df13ade57c61 -->
# Hypixel Pit Tracker - Detailed Build Guide

## What Goes Where (Backend)

- `server/Index.js`: Boot file. Load env, import `app`, start server.
- `server/App.js`: Express app setup. Add CORS, JSON body parser, error handler; mount `pitRoutes` at `/api/pit`.
- `server/routes/pitRoutes.js`: Defines endpoints only. Routes: `/player/:username`, `/player/:username/stats`, `/player/:username/inventory`.
- `server/controllers/pitController.js`: Request/response logic. Validate `username`, call services, map responses, send 4xx/5xx on errors.
- `server/services/mojangService.js`: External calls to Mojang. `getPlayerUUID(username)`, `getPlayerProfile(uuid)`.
- `server/services/hypixelService.js`: External calls to Hypixel + extraction. `getPlayerData(uuid)`, `getPitProfile(uuid)`, `getPitStats(uuid)`, `getPitInventory(uuid)`, `decodeInventory(invData)` (base64 → gunzip → NBT parse → simplify).
- `server/services/cacheService.js` (optional first pass): `getCachedPlayer`, `cachePlayerData`, `shouldRefreshCache(timestamp)` with TTL (e.g., 5 minutes).
- `server/db/db.js`: pg pool (ESM), reads env vars.
- `server/db/schema.sql`: `player_cache` table (`uuid`, `username`, `pit_data JSONB`, `cached_at`, `expires_at`).
- `server/db/playerCacheModel.js`: DB helpers for cache (get/save/clearExpired).

## What Goes Where (Frontend)

- `client/src/App.jsx`: Top-level layout; holds search box and renders profile sections; manages loading/error state.
- `client/src/services/api.js`: Wrapper for fetch/axios; functions `getPlayerProfile(username)`, `getPlayerStats(username)`, `getPlayerInventory(username)`.
- `client/src/components/`:
  - `PlayerSearch.jsx`: Input + submit; calls parent handler.
  - `PlayerProfile.jsx`: Wraps stats + inventory; receives data/loading/error.
  - `PitStats.jsx`: Renders kills, deaths, prestige, level, gold, renown, playtime, streaks.
  - `PitInventory.jsx`: Grid of slots; maps items to `InventoryItem`.
  - `InventoryItem.jsx`: One slot; show name, lore, enchants.
  - `LoadingSpinner.jsx`, `ErrorMessage.jsx`: state components.

## Data Flow (Pit Lookup)

1) Client calls `GET /api/pit/player/:username`.

2) Controller validates username; checks cache (optional).

3) Services: Mojang `getPlayerUUID` → Hypixel `getPlayerData` → derive Pit profile/stats/inventory.

4) Inventory decode: base64 string → gunzip → NBT parse (`prismarine-nbt`) → simplify → items array (in `parsed.value.i`).

5) Respond JSON; client renders stats + inventory.

## Endpoints

- `GET /api/pit/player/:username` → full Pit profile (stats + inventory decoded)
- `GET /api/pit/player/:username/stats` → stats only
- `GET /api/pit/player/:username/inventory` → inventory only

## Backend Implementation Steps

1) App wiring (`App.js`): add `cors()`, `express.json()`, error handler; mount `pitRoutes` at `/api/pit`.

2) Routes (`pitRoutes.js`): map the three endpoints to controller methods.

3) Controller (`pitController.js`): per request — validate username; call `getPlayerUUID`; optional cache; fetch Hypixel player; extract Pit stats/profile; for inventory call `decodeInventory(inv_contents.data)`; send JSON; handle 4xx/5xx.

4) Services:

   - Mojang: fetch UUID, return `{ id, name }`.
   - Hypixel: fetch `/v2/player?uuid=...`; helpers `getPitProfile`, `getPitStats`, `getPitInventory`.
   - Inventory decode: `Buffer.from(base64, 'base64')` → `await gunzip(...)` → `await nbt.parse(...)` → `nbt.simplify(...)` → items list.

5) Cache/DB (optional initially): create table, model, and `cacheService` with TTL check; integrate before remote calls.

## Frontend Implementation Steps

1) `api.js`: implement calls to the three endpoints.

2) `App.jsx`: state for `username`, `loading`, `error`, `data`; on search, call profile endpoint; render components.

3) `PlayerSearch`: input + button; calls parent with username.

4) `PlayerProfile`: receives data; renders `PitStats` and `PitInventory`.

5) `PitStats`: display key numbers (kills, deaths, prestige, level, gold, renown, streaks, playtime).

6) `PitInventory`: render grid; each slot via `InventoryItem` (name/lore/enchantments).

## Error Handling & UX

- 400 for missing/invalid username; 404 when player or Pit stats absent; 429/503 on rate limits; 500 on unexpected errors. Show friendly UI messages and loading states.

## Future Extensions

- Network-wide stats: add `networkService`, `networkController`, `networkRoutes`.
- Skyblock: add `skyblockService`, `skyblockController`, `skyblockRoutes`; reuse Mojang + cache infra.
- Public API hardening: rate limiting, API key auth, logging.

## Env Vars

- `API_KEY`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_PORT`
- `CACHE_DURATION_MINUTES=5`
- `CLIENT_URL=http://localhost:5173`

## Dependencies

- Server: `axios` (or keep fetch), `prismarine-nbt`, `pg`, `cors`, `dotenv`, `morgan`.
- Client: `axios` (or fetch), React.

## Minimal Code Sketch (inventory decode)

```javascript
const decodeInventory = async (base64) => {
  const buf = Buffer.from(base64, 'base64');
  const ungz = await gunzip(buf); // promisified zlib.gunzip
  const parsed = await nbt.parse(ungz, 'big');
  const simplified = nbt.simplify(parsed.parsed ?? parsed);
  return simplified.value?.i?.value || simplified.i || [];
};
```