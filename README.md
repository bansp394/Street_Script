# Street Script

Open `index.html` in a browser. No build step, no install.

## Pages
- `index.html`: home (hero + three ways in + about)
- `map.html`: **Enter the streets** (the map, first in the menu)
- `explore.html`: **Explore**, the 4 feelings (titles written on street photos in `images/covers/`)
- `about.html`: About
- `map.html`: **Walk the city**, drawn map of Manhattan with every message pinned (code in `js/walk.js`, borough shapes in `js/nyc-map.js`, every real street from NYC Open Data in `js/nyc-streets.js`, Leaflet in `js/vendor/`)
- `category.html?c=sign|love|laugh|push`: grid of messages; cards flip on hover (tap on phones)
- `message.html?id=...`: one message (hold to reveal, what it means to others, your meaning)
- `leave.html`: **Leave a message**

## Where to edit
- `js/data.js`: ALL content. Add a message by copying an object in `MESSAGES`.
  Put the photo in `images/messages/`. `ll: [lat, lng]` is the real spot on the map
  (right-click a place in Google Maps and click the numbers to copy them).
  `map: { t, s }` is only for the backup drawn map.
- `css/style.css`: all styling; colours and fonts are at the top in `:root`.

- `js/common.js`: shared helpers (saving, hold-to-reveal, menu).

Visitor messages and meanings are saved with localStorage, so they only exist in that visitor's browser.
To make them shared between everyone you'd need a backend (e.g. Firebase or Supabase).

The photos in `images/messages/` were cropped from the mockups, so they're low-res. Swap in your originals using the same file names.
