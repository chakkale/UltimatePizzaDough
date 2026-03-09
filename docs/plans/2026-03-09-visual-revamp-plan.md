# Visual Revamp Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reskin the entire app from Apple-blue to warm artisanal terracotta/olive theme.

**Architecture:** Pure CSS/styled-component color and typography changes. No logic changes.

**Tech Stack:** Emotion/styled-components, CSS variables, Google Fonts

---

### Task 1: Add Google Font and update index.html meta

**Files:** `index.html`

- Add DM Serif Display font from Google Fonts
- Update theme-color meta to terracotta

### Task 2: Update CSS variables in index.css

**Files:** `src/index.css`

- Replace all light theme CSS variables with warm palette
- Replace all dark theme CSS variables with warm dark palette
- Add --inputBackground variable

### Task 3: Update StyledComponents.tsx color constants and all components

**Files:** `src/components/StyledComponents.tsx`

- Replace `colors` object with new palette
- Update pulse animation to terracotta
- Update Card shadow and top border gradient
- Update Button colors and hover states
- Update SecondaryButton
- Update Input/Select focus colors
- Update Slider thumb/track colors
- Update Tab active colors and gradient
- Update InfoBox background and border
- Update GridItem hover and selection colors
- Update Badge color
- Increase border-radius to 14px on cards

### Task 4: Update CalculatorForm.tsx inline colors

**Files:** `src/components/CalculatorForm.tsx`

- Replace all hardcoded `#0071e3` with terracotta
- Replace all `#f5f5f7` inactive backgrounds
- Replace `rgba(0, 113, 227, ...)` shadows
- Update reset button gradient
- Update style card selection colors

### Task 5: Update App.tsx hero gradient

**Files:** `src/App.tsx`

- Update hero gradient overlay to warm brown
- Update title font-family to DM Serif Display

### Task 6: Update ThemeToggle.tsx colors

**Files:** `src/components/ThemeToggle.tsx`

- Replace toggle button blue with terracotta
- Update toggle container background

### Task 7: Update LanguageToggle.tsx colors

**Files:** `src/components/LanguageToggle.tsx`

- Replace focus shadow blue with terracotta
- Update hover background

### Task 8: Update ToastProvider.tsx

**Files:** `src/components/ToastProvider.tsx`

- Update toast border-radius to 14px

### Task 9: Update TemplateManager.tsx

**Files:** `src/components/TemplateManager.tsx`

- Update border-radius to match new theme

### Task 10: Build and verify

- Run `npm run build`
- Verify no errors
