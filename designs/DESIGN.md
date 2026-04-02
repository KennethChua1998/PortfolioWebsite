```markdown
# Design System Document: High-End Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Archivist"**

This design system is a rejection of the sterile, "app-like" interfaces of the last decade. It draws inspiration from mid-century scholarly journals and rare book collections, where information is not just displayed, but curated. Our objective is to create a digital experience that feels like a physical artifact—tactile, weighted, and authoritative.

We achieve this through **Intentional Asymmetry** and **Tonal Depth**. Unlike rigid bootstrap grids, this system favors wide margins, overlapping text elements, and a "paper-on-paper" layering logic. We are not building a container for content; we are building a stage for intellectual discourse.

---

## 2. Colors: The Parchment Palette
The color strategy relies on a low-contrast base to reduce eye strain, punctuated by high-density "ink" and "gold leaf" accents.

*   **Primary (#154212):** Our "Forest Green." Use this for high-impact brand moments and primary actions. It represents the binding of a classic tome.
*   **Secondary (#745b18):** Our "Muted Gold." This is used sparingly for highlights, badge accents, and premium callouts.
*   **Surface & Background (#fbf9f5):** This is our "Parchment." It is never pure white, providing a warm, biological feel to the interface.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. The grid must be defined by:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low` (#f5f3ef).
2.  **Negative Space:** Using the larger end of our spacing scale (e.g., `16` or `20`) to create "islands" of content.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper. 
*   **Base:** `surface` (#fbf9f5).
*   **Nested Elements:** Place cards or sidebars on `surface-container-lowest` (#ffffff) to create a subtle "lift," or `surface-container-high` (#eae8e4) to create a "recessed" feel.

### The "Glass & Gradient" Rule
While we lean vintage, we use modern techniques to avoid a "flat" look. 
*   **Floating Elements:** Use `surface` colors at 80% opacity with a `backdrop-blur` of 12px to create a frosted glass effect for navigation bars.
*   **Signature Textures:** Apply a subtle radial gradient from `primary` (#154212) to `primary-container` (#2d5a27) on large CTA buttons to provide a sense of leather-bound depth.

---

## 3. Typography: The Scholarly Voice
Our typography scale is designed to mimic the layout of a premium broadsheet or academic journal.

*   **Display & Headlines (Noto Serif):** These are our "Voice." Use `display-lg` (3.5rem) with tight letter-spacing for hero sections. Headlines should feel authoritative and heavy.
*   **Body & Titles (Inter):** Inter provides the modern clarity required for digital legibility. Use `body-lg` (1rem) for long-form reading to ensure the "intellectual" feel doesn't sacrifice usability.
*   **Labels (Inter):** All-caps `label-md` with 0.05em letter-spacing should be used for category tags or "badges," reinforcing the editorial aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too "digital." We utilize **Tonal Layering** to convey hierarchy.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card sitting on a `surface-container-low` section creates a soft, natural lift without the need for CSS box-shadows.
*   **Ambient Shadows:** If a floating effect is required (e.g., a dropdown menu), use a "Tincture Shadow": `box-shadow: 0 10px 30px rgba(27, 28, 26, 0.05)`. The shadow color must be a derivative of our `on-surface` color (#1b1c1a), not pure black.
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use the `outline-variant` (#c2c9bb) at **20% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent `surface` tiers for overlays. This allows the warm parchment tones to bleed through, softening the edges and making the layout feel like a single, cohesive artifact.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `DEFAULT` (0.25rem) roundedness. No borders.
*   **Secondary:** `surface-container-high` background. This should feel like a "pressed" area of the paper.
*   **Tertiary:** No background. Use `label-md` typography with a `primary` color underline (2px offset).

### Cards & Lists
*   **Rule:** Forbid the use of divider lines.
*   **Implementation:** Separate list items using `spacing-4` (1.4rem) of vertical white space. For cards, use a background shift to `surface-container-low` instead of a border.

### Input Fields
*   **Styling:** Inputs should not be boxes. Use a "Bottom-Border-Only" style or a very subtle `surface-container-highest` background fill. 
*   **Focus State:** Transition the background to `surface-container-lowest` and increase the ghost border opacity to 40%.

### Chips / Badges
*   **Selection Chips:** Use `secondary-container` (#ffdc8c) with `on-secondary-container` (#795f1c) text. These should look like wax seals or vintage library stamps. Use `full` roundedness.

### Additional Component: The "Editorial Pull-Quote"
*   A specialized component for long-form content. Use `headline-sm` in Noto Serif, italicized, with a `secondary` (Gold) left-accent bar (4px width).

---

## 6. Do's and Don'ts

### Do:
*   **Do** use intentional white space. Let the content breathe as if it were printed on an expensive, oversized page.
*   **Do** overlap elements. A `headline-lg` can slightly overlap a full-color image to create a sense of depth and custom layout.
*   **Do** use high-quality, full-color photography. The warmth of the imagery should complement the warmth of the parchment background.

### Don't:
*   **Don't** use 100% black (#000000). Always use `on-surface` (#1b1c1a) or `tertiary` (#2d3c3b) for text to maintain the vintage "ink" feel.
*   **Don't** use standard "Material Design" shadows. They are too aggressive for this refined palette.
*   **Don't** use B&W filters on images. It creates a "fake" vintage look. Let the high-end, professional photography provide the modern contrast to the classic typography.
*   **Don't** use sharp corners (`none`) or overly round corners (`xl`) for main containers. Stick to `DEFAULT` (0.25rem) to mimic the subtle cut of a heavy cardstock.

---

## 7. Spacing Logic
Avoid "even" spacing. Use a **Rhythmic Asymmetry**.
*   **Hero Sections:** Use `24` (8.5rem) for top padding but `16` (5.5rem) for bottom padding to drive the eye downward toward the content.
*   **Inline Spacing:** Always favor the `3` (1rem) and `4` (1.4rem) tokens for internal component padding to maintain a "roomy" scholarly feel.