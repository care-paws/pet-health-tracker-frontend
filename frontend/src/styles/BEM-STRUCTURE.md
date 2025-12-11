# BEM Naming Convention Structure

This document outlines the BEM (Block Element Modifier) naming structure used in the Landing Page component.

**Location:** `src/pages/LandingPage.jsx` and `src/pages/LandingPage.module.css`

## Block: `landing-page`

Main container for the entire landing page.

### Elements:

- `landing-page__header` - Header section
- `landing-page__logo` - Logo container
- `landing-page__menu-button` - Menu button
- `landing-page__main-content` - Main scrollable content area

---

## Block: `hero-section`

Hero/banner section at the top.

### Elements:

- `hero-section__title` - Main heading
- `hero-section__description` - Description text

---

## Block: `how-it-works`

Section explaining how the service works.

### Elements:

- `how-it-works__title` - Section title
- `how-it-works__subtitle` - Section subtitle

---

## Block: `step-icon`

Icon container for steps.

### Modifiers:

- `step-icon--medium` - Medium size icon
- `step-icon--large` - Large size icon

---

## Block: `step`

Individual step section.

### Elements:

- `step__title` - Step title (e.g., "1. Crea tu cuenta")
- `step__description` - Step description text

---

## Block: `feature-card`

Feature/benefit card.

### Elements:

- `feature-card__icon` - Icon container
- `feature-card__title` - Card title
- `feature-card__description` - Card description

### Modifiers:

- `feature-card--first` - First card with different padding

---

## Block: `cta-section`

Call-to-action section.

### Elements:

- `cta-section__title` - CTA title
- `cta-section__description` - CTA description

---

## Block: `cta-button`

Call-to-action button (standalone block, no elements).

---

## CSS Variables (defined in globals.css)

```css
--color-primary: #ffdcb4
--color-secondary: #c48cb6
--color-accent: #ffebcc
--color-border: rgba(196, 140, 182, 0.81)
--color-border-alt: rgba(197, 112, 208, 0.8)
--color-text: #000000
--color-white: #ffffff
--font-roboto: "Roboto", sans-serif
--font-inter: "Inter", sans-serif
```

## Usage in JSX

```jsx
import styles from "./LandingPage.module.css";

// Single class
<div className={styles["landing-page"]}>

// Multiple classes (with modifier)
<div className={`${styles["step-icon"]} ${styles["step-icon--medium"]}`}>
```

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx          # Landing page component
│   └── LandingPage.module.css   # CSS module with BEM naming
├── styles/
│   ├── globals.css              # Global styles & CSS variables
│   └── BEM-STRUCTURE.md         # This file
├── layouts/                     # For layout components (headers, footers, etc.)
├── components/                  # For reusable components
└── App.jsx                      # Main app component
```
