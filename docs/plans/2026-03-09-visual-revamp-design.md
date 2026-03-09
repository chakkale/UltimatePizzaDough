# Make Better Pizza — Visual Revamp Design

## Direction: Warm & Artisanal

Visual overhaul of the existing app. No new features — same functionality, elevated aesthetics.

## Color Palette

### Light Theme
- Background: `#FAF6F1` (warm cream/linen)
- Card background: `#FFFFFF`
- Primary accent: `#C75B39` (terracotta)
- Secondary accent: `#6B7F4E` (olive green)
- Text: `#3D2E1F` (espresso)
- Secondary text: `#8C7B6B`
- Border: `#E0D5C7` (warm sand)
- Input background: `#F5EFE7`
- Success: `#6B7F4E` (olive green)
- Warning: `#D4903C`
- Error: `#C44536`

### Dark Theme
- Background: `#1A1714` (deep charcoal)
- Card background: `#2A2520` (warm dark brown)
- Primary accent: `#D4764E` (lighter terracotta for contrast)
- Secondary accent: `#8FA66C` (lighter olive)
- Text: `#F0E8DC` (warm cream)
- Secondary text: `#9C8E80`
- Border: `#3D3530`
- Input background: `#332E28`
- Success: `#8FA66C`
- Warning: `#E0A04C`
- Error: `#D45545`

## Typography

- Headings: `DM Serif Display` (Google Fonts) — warm, elegant serif
- Body/UI: System font stack (unchanged for performance)
- Recipe numbers: `font-variant-numeric: tabular-nums` for alignment

## Component Changes

### Cards
- Border-radius: 14px (up from 8-12px)
- Shadow: brown-tinted `rgba(60,40,20,0.08)` instead of gray
- Top accent border: 3px terracotta instead of blue gradient
- Hover: subtle warm glow, 2px lift

### Pizza Style Cards
- Selected: terracotta border + faint terracotta background tint
- Hover: cream overlay
- Checkmark: olive green badge

### Buttons
- Primary: terracotta gradient `#C75B39 → #B04E30`
- Secondary: outlined with terracotta border
- Template button: olive green gradient
- Hover: subtle brightness increase, no shine effect

### Inputs & Sliders
- Focus ring: warm amber `rgba(199,91,57,0.3)`
- Slider track: terracotta
- Slider thumb: white with terracotta border
- Input border on focus: terracotta

### Tabs (Recipe Display)
- Active underline: terracotta
- Active text: terracotta
- Inactive: muted secondary text

### Recipe Table
- Alternating row tint: `rgba(199,91,57,0.04)` light, `rgba(199,91,57,0.08)` dark
- Baker's % column: olive green text

### Header/Hero
- Gradient overlay: warm brown fade `rgba(26,23,20,0.6)` instead of pure black
- Title font: DM Serif Display, warm white

### Footer
- Warm border top
- Muted secondary text

### Toggle Switches (Theme/Language)
- Terracotta accents instead of blue

## Animations
- All transitions: 0.2s ease
- Card hover: translateY(-2px) + shadow increase
- Recipe content: fade-in on change
- No springs, bounces, or complex sequences

## Files to Modify
1. `src/components/StyledComponents.tsx` — All color constants, shadows, border-radius, component styles
2. `src/index.css` — CSS variables, background, global styles
3. `src/App.tsx` — Hero gradient overlay colors
4. `src/components/CalculatorForm.tsx` — Style card selection colors
5. `src/components/RecipeDisplay.tsx` — Table row tints, tab colors
6. `src/components/ThemeToggle.tsx` — Toggle accent colors
7. `src/components/LanguageToggle.tsx` — Toggle accent colors
8. `src/components/TemplateManager.tsx` — Button colors
9. `src/components/ToastProvider.tsx` — Toast accent colors
10. `index.html` — Add DM Serif Display Google Font, update theme-color meta

## What Does NOT Change
- Layout structure (two-column, sticky recipe)
- All calculator logic and features
- Pizza style image cards (just restyled)
- Template system
- i18n system
- PWA functionality
