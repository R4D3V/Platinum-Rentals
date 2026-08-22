# Ninety Nine Property Consultants — Icon & PWA Asset Pack

Brand red used throughout: `#BE1D2C` (sampled from your logo)

## Folder contents

### `/logo`
- `logo_original_white_bg.png` — your original full logo (wordmark + mark), white background
- `logo_full_transparent.png` — full logo (wordmark + mark) with transparent background, for use on colored backgrounds or letterheads
- `icon_mark_white_bg.png` — just the roofline "house" mark, cropped, white background
- `icon_mark_transparent.png` — just the roofline "house" mark, transparent background — this is the source used to generate every icon below

### `/icons`
A full square-icon set generated from the house mark, centered with safe padding:

| File | Size | Use |
|---|---|---|
| `favicon.ico` | 16/32/48 (multi-res) | Browser tab favicon |
| `icon-16x16.png` … `icon-512x512.png` | 16 to 512px | General web/app icons, `<link rel="icon">` |
| `apple-touch-icon.png` | 180×180 | iOS home-screen icon |
| `icon-maskable-192x192.png`, `icon-maskable-512x512.png` | 192 / 512 | Android adaptive icons — extra padding so the mark isn't clipped when the OS masks it into a circle/squircle |

### `manifest.json`
A ready-to-use Web App Manifest referencing the icon set (paths assume `icons/` sits next to `manifest.json` at your site root).

## Wiring it into your site

Add to your HTML `<head>`:

```html
<link rel="icon" href="/icons/favicon.ico" sizes="any">
<link rel="icon" href="/icons/icon-192x192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#BE1D2C">
```

Place the `icons/` folder and `manifest.json` at your site root (or adjust the `src` paths inside `manifest.json` to match wherever you host them).

## Notes
- All icons are PNG with transparent or white backgrounds as noted above — no further editing needed for standard web/PWA use.
- If you also want a dark-mode/white version of the mark (for dark headers or dark app splash screens), let me know and I can generate one from the same source.
