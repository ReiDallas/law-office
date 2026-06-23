# Εικόνες / Images — assets/

Drop your image files here with these exact names and they appear automatically.
Until a file exists, the site shows a styled placeholder (no broken-image icons).

| File | Used for | Recommended size | Format |
|------|----------|------------------|--------|
| `portrait.svg` | Profile photo (Προφίλ + αρχική) — a styled placeholder is provided | 640 × 800 px (4:5, portrait) | replace with JPG/WebP |
| `logo-1.png` … `logo-6.png` | Partner logos (Εκπροσωπήσεις) | ~300 × 200 px, transparent | PNG/SVG |
| `hero.jpg` | Home hero background (optional) | 1920 × 1080 px, landscape | JPG/WebP |
| `favicon.svg` | Browser tab icon | 64 × 64 (vector) | SVG (already provided) |

## Notes
- The portrait is shown with `object-fit: cover`, so it crops to a 4:5 frame — center the subject. To use a real photo, either overwrite `portrait.svg` with `portrait.jpg` and update the `src` in `index.html` + `profile.html`, or just replace the contents of `portrait.svg`.
- Logos use `object-fit: contain` with padding, so any aspect ratio works; transparent backgrounds look best.
- To use a different filename, edit the `src="assets/..."` in the relevant HTML page.
- To swap the favicon, replace `favicon.svg` (or add `favicon.ico` and update the `<link rel="icon">` in each page's `<head>`).
- The hero background is optional: drop in `hero.jpg` and the home hero automatically switches to a dark-overlay + light-text treatment (handled by `main.js`). Remove the file and it reverts to the light layout. A landscape image with a calmer/darker area behind the heading works best.
