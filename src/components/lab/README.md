# premium-portfolio — Component Lab

Demo components and orphaned UI not currently imported in `page.tsx`.
All preserved for future use or reference. Replace placeholder content before production use.

---

## Components

### expandable-card-demo-standard.tsx
Expandable list of cards with modal expansion and AnimatePresence transitions.
- **Import pattern:** `motion/react` (correct — follows project standard)
- **Content:** Music artist placeholder content — replace before use
- **Dependencies:** Self-contained (base component logic is inside the demo file itself)
- **Status:** Ready to use after content replacement.

### layout-grid-demo.tsx
Masonry grid layout demo with click-to-expand interaction.
- **Content:** Stock Unsplash images and placeholder text — replace with actual portfolio content
- **Base component:** `layout-grid.tsx` IS in `src/components/ui/` and is actively used in `page.tsx`
- **Status:** Content-ready demo. Replace images and text before use.

---

## Missing Base Components (referenced but not on disk)

The exploration notes mention these demos, but neither the demo files nor their base components
exist in the codebase. They are referenced here for awareness:

- `card-stack-demo.tsx` → requires `card-stack.tsx` base (not present)
- `glowing-effect-demo.tsx` → requires `glowing-effect.tsx` base (not present)
- `glowing-stars-demo.tsx` → requires `glowing-stars.tsx` base (not present)
- `lamp-demo.tsx` → requires `lamp.tsx` base (not present)
- `draggable-card-demo-2.tsx` → requires `draggable-card.tsx` base (not present)

These are Aceternity UI components. If needed, copy from https://ui.aceternity.com/components.
