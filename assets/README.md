# Εικόνες / Images — assets/

Drop your image files here with these exact names and they appear automatically.
Until a file exists, the site shows a styled placeholder (no broken-image icons).

| File | Used for | Recommended size | Format |
|------|----------|------------------|--------|
| `portrait.jpg` | Profile photo (Προφίλ + αρχική) | 640 × 800 px (4:5, portrait) | JPG/WebP |
| `logo-1.png` … `logo-6.png` | Partner logos (Εκπροσωπήσεις) | ~300 × 200 px, transparent | PNG/SVG |
| `favicon.svg` | Browser tab icon | 64 × 64 (vector) | SVG (already provided) |

## Notes
- The portrait is shown with `object-fit: cover`, so it crops to a 4:5 frame — center the subject.
- Logos use `object-fit: contain` with padding, so any aspect ratio works; transparent backgrounds look best.
- To use a different filename, edit the `src="assets/..."` in the relevant HTML page.
- To swap the favicon, replace `favicon.svg` (or add `favicon.ico` and update the `<link rel="icon">` in each page's `<head>`).
- A hero background image isn't wired by default (the hero uses a light layout). Ask if you want one added.
