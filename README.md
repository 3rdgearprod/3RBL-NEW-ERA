# 3RBL — Restructured GitHub Pages Site

This version turns the old giant `index.html` into a small static site that is much easier to maintain.

## Structure

```text
3RBL-RETRO-BOWL-LEAGUE/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── seasons/
│   ├── season-01.html
│   ├── ...
│   └── season-14.html
└── assets/
    └── images/
        └── season-08.png/webp ... season-14.png
```

## Why this is better

- `index.html` is now small and readable.
- Each season has its own file.
- Large Season 8–14 banner images are real files instead of multi-megabyte base64 strings.
- The season selector loads only the season being viewed.
- No localStorage image overrides, so an old browser cache cannot replace championship banners.
- Updating Season 15 means adding one new season fragment, one banner image, and one selector entry.

## GitHub Pages

Upload the **contents of this folder** into the root of the repository, replacing the old `index.html` and adding the folders/files shown above. Do not upload the parent `3RBL_RESTRUCTURED` folder itself as an extra nesting level.

GitHub Pages should continue serving `index.html` normally.

## Updating a season

Open `seasons/season-XX.html` and edit the standings, awards, playoffs, or banner path there. If the banner is local, place the replacement image in `assets/images/` and update the `<img src="../assets/images/...">` path.
