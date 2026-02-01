# Conor McGregor Fun Website

A one page fan microsite for Conor McGregor with a “peek through the octagon” reveal, parallax hero, and a slow vertical fight history ticker.

## Live demo
https://conor-mcgregor-fun-website.vercel.app

## What’s inside
* Octagon cursor reveal mask that exposes a second visual layer as you move the mouse
* Rotating octagon cursor with a fading octagon trail
* Subtle parallax on the hero and title
* Hover stats board
* Vertical “stock ticker” fight history on both sides, alternating scroll directions, text rotated via vertical writing mode

## Tech
* Vanilla HTML/CSS/JS
* Vite (build + dev server)

## Local setup

### Prereqs
* Node.js 20.19+ (Vite 7 requirement)

### Install
```bash
npm install
````

### Run dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project structure

```text
.
├── index.html              # Page markup
├── style.css               # Main site styling (cursor mask, layers, ticker, UI)
├── src/
│   ├── main.js             # Cursor + parallax + ticker column builder
│   ├── fightData.js        # Fight history strings used by the ticker
│   └── counter.js          # Vite starter leftover (safe to remove if unused)
├── public/                 # Images used for backgrounds and hero cutouts
└── package.json            # Vite scripts
```

## Updating the fight ticker data

Ticker lines live in `src/fightData.js` as an array of objects with a `ticker` string.

Example entry:

```js
{
  type: "ufc",
  ticker: "Jose Aldo | 2015-12-12 | UFC 194 - Aldo vs. McGregor | W KO (Punch) | R1 0:13"
}
```

To add or edit fights:

1. Open `src/fightData.js`.
2. Add a new object with `type` and `ticker`.
3. Keep the `ticker` format consistent so the scroll reads clean.

## Tuning the ticker speed and feel

In `src/main.js`:

* `COLUMNS_PER_SIDE` controls how many columns appear on each side.
* `baseDuration` controls scroll speed (higher is slower). It’s currently set to extremely slow on purpose.
* The “///” separator is used to break fights visually. Change it if you want a cleaner look.

In `style.css`:

* `.ticker-side { width: 35%; }` controls how wide the side tickers are and how much empty center lane remains.
* The top and bottom fade is done with a CSS mask gradient on `.ticker-side`.

## Swapping images

All images are in `public/`. Replace files there (same filenames) to keep the layout intact, or update the image references in `index.html`.

## Deployment (Vercel)

This is a standard Vite static site.

* Build command: `npm run build`
* Output: `dist`

## Notes

* This repo currently includes fight data through 2021 (plus the Mayweather boxing match). If you want “through present day”, you’ll need to extend `src/fightData.js`.

## Disclaimer

Fan project. Not affiliated with the UFC or Conor McGregor. All names and likenesses belong to their respective owners.

## License

No license file is included right now. If you want others to reuse it safely, add an MIT license (or whatever you prefer).

