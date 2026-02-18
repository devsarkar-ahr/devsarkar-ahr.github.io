# Games Database Guide

## Quick Start

**Add games to:** `/data/games.json`

**Change top games by editing:** `search-system.js` (lines ~115)

## File Location
`/data/games.json` — central game registry for search functionality.

## JSON Format - Complete Example

```json
[
  {
    "id": "cookie-clicker",
    "name": "Cookie Clicker",
    "category": "idle",
    "type": "desktop",
    "href": "/class/cookie-clicker/",
    "thumb": "https://cdn.example.com/cookie-clicker.jpg"
  },
  {
    "id": "basketball-legends",
    "name": "Basketball Legends",
    "category": "sports",
    "type": "desktop",
    "href": "/class/basketball-legends/",
    "thumb": "https://cdn.example.com/basketball-legends.jpg"
  }
]
```

## Required Fields vs Optional

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| `id` | ✅ YES | `cookie-clicker` | Must match folder name in `/class/` directory |
| `name` | ✅ YES | `Cookie Clicker` | Display name in search results |
| `category` | ❌ NO | `idle` | Used for category filters |
| `type` | ❌ NO | `desktop` | Device type: desktop, mobile, or tablet |
| `href` | ❌ NO | `/class/cookie-clicker/` | Auto-generated if not provided |
| `thumb` | ❌ NO | Image URL | Game thumbnail (show in grid) |

## Category Options

Use one of these for the `category` field:

```
sports, idle, 2d, racing, action, adventure, horror, puzzle, 
strategy, rpg, fps, fighting, 2-player, io, platformer, flash, 
girls, driving, roblox, minecraft, casual, clicker, brainrot, 
emulator, 3d, temu, new, multiplayer
```

## Type Options

Use one of these for the `type` field:

```
desktop, mobile, tablet
```

## How to Find Game ID

Your game ID must **match the folder name** in `/class/`:

- Folder: `/class/cookie-clicker/` → ID: `cookie-clicker`
- Folder: `/class/1v1-lol/` → ID: `1v1-lol`
- Folder: `/class/basketball-legends/` → ID: `basketball-legends`

## Customize Top 6 Games

Edit this in `search-system.js` (around line 115):

```javascript
const TOP_GAMES_IDS = [
    'cookie-clicker',      // 1st top game
    '1v1-lol',             // 2nd top game
    'basketball-legends',  // 3rd top game
    'gun-spin',            // 4th top game
    'golf-orbit',          // 5th top game
    'race-survival-arena-king'  // 6th top game
];
```

Just replace these IDs with your own! They'll show when sidebar is opened.

---

## Step-by-Step: Add 10 New Games

**Step 1:** Open `/data/games.json`

**Step 2:** Find a game folder in `/class/` you want to add. Example: `/class/minecraft/`

**Step 3:** Add entry to games.json:

```json
{
  "id": "minecraft",
  "name": "Minecraft",
  "category": "adventure",
  "type": "desktop",
  "href": "/class/minecraft/",
  "thumb": "https://cdn.example.com/minecraft.jpg"
}
```

**Step 4:** Repeat for each game, separated by commas

**Step 5:** Ensure valid JSON (proper brackets, commas)

## Complete Working Example

```json
[
  {
    "id": "cookie-clicker",
    "name": "Cookie Clicker",
    "category": "idle",
    "type": "desktop",
    "href": "/class/cookie-clicker/",
    "thumb": "https://pizzaedition.pro/images/cookie-clicker.webp"
  },
  {
    "id": "minecraft-classic",
    "name": "Minecraft Classic",
    "category": "adventure",
    "type": "desktop",
    "thumb": "https://pizzaedition.pro/images/minecraft.webp"
  },
  {
    "id": "chess",
    "name": "Chess",
    "category": "strategy",
    "type": "desktop",
    "thumb": "https://pizzaedition.pro/images/chess.webp"
  }
]
```

## Legacy Format (Still Supported)

Old games.json format still works:

```json
{
  "title": "Game Name",
  "href": "/g/game-slug/",
  "img": "https://example.com/image.webp"
}
```

Auto-converts to:
- `title` → `name`
- `img` → `thumb`  
- `href` slug → `id`

## Search System Integration

When sidebar opens:
1. ✅ Loads all games from `/data/games.json`
2. ✅ Shows 6 "Top Games" (from `TOP_GAMES_IDS` array)
3. ✅ User can search by game name or ID
4. ✅ Filter by category (sports, idle, etc.)
5. ✅ Filter by type (desktop, mobile, tablet)

---

**Last Updated:** Feb 12, 2026

