# Project Structure

This document explains the organization of the Pet Health Tracker frontend project.

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── pages/                    # Page components (routes/views)
│   │   ├── LandingPage.jsx       # Landing page component
│   │   └── LandingPage.module.css # Landing page styles (CSS Module)
│   │
│   ├── layouts/                  # Layout components (wrapping structures)
│   │   # Example: MainLayout, AuthLayout, DashboardLayout
│   │
│   ├── components/               # Reusable UI components
│   │   # Example: Button, Card, Modal, Input
│   │
│   ├── styles/                   # Global styles and documentation
│   │   ├── globals.css           # Global CSS variables and reset
│   │   └── BEM-STRUCTURE.md      # BEM naming documentation
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── context/                  # React context providers
│   ├── services/                 # API services and external integrations
│   ├── store/                    # State management
│   ├── routes/                   # Route definitions
│   ├── utils/                    # Utility functions
│   ├── assets/                   # Static assets (images, fonts)
│   │
│   ├── App.jsx                   # Root app component
│   └── main.jsx                  # Entry point
│
├── public/                       # Public static files
├── package.json                  # Dependencies and scripts
└── vite.config.js               # Vite configuration
```

## 🎯 Organizational Principles

### Pages vs Layouts vs Components

**Pages (`src/pages/`):**
- Individual routes/views of the application
- Example: `LandingPage`, `DashboardPage`, `ProfilePage`
- Each page is a complete view that users navigate to
- Contains page-specific logic and composition

**Layouts (`src/layouts/`):**
- Structural wrappers that provide consistent UI across pages
- Example: `MainLayout` (with header/footer), `AuthLayout`, `DashboardLayout`
- Provide common elements like navigation, sidebars, headers, footers
- Wrap pages to provide consistent structure

**Components (`src/components/`):**
- Reusable UI building blocks
- Example: `Button`, `Card`, `Modal`, `Input`, `Avatar`
- Should be generic and reusable across different pages
- Focused on single responsibility

## 🎨 Styling Approach

### CSS Modules + BEM Naming Convention

**Why CSS Modules?**
- Scoped styles (no global namespace pollution)
- Automatic unique class name generation
- Better maintainability
- Works seamlessly with React

**BEM Naming Convention:**
```
Block__Element--Modifier

Examples:
.landing-page                    # Block
.landing-page__header            # Element
.step-icon--medium              # Modifier
```

**Usage Example:**
```jsx
import styles from "./LandingPage.module.css";

<div className={styles["landing-page"]}>
  <header className={styles["landing-page__header"]}>
    {/* ... */}
  </header>
</div>
```

### Global Styles

**`src/styles/globals.css`** contains:
- CSS reset and base styles
- CSS custom properties (variables)
- Global utility styles
- Font definitions

**CSS Variables Defined:**
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

## 🚀 Development

### Running the Project

```bash
cd frontend
npm install
npm run dev
```

Access at: `http://localhost:5173/`

### File Naming Conventions

- **Components:** PascalCase (e.g., `LandingPage.jsx`, `Button.jsx`)
- **CSS Modules:** PascalCase + `.module.css` (e.g., `LandingPage.module.css`)
- **Utilities:** camelCase (e.g., `formatDate.js`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### Import Order Convention

```jsx
// 1. External dependencies
import { useState } from "react";

// 2. Internal utilities/services
import { fetchUser } from "./services/api";

// 3. Components
import Button from "./components/Button";

// 4. Styles (last)
import styles from "./Component.module.css";
```

## 📝 Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Use CSS Modules for all component styles** - Avoid global styles
3. **Follow BEM naming** - Consistent and readable class names
4. **Leverage CSS variables** - Use globals.css variables for colors/fonts
5. **Pages are not layouts** - Pages go in `/pages`, layouts in `/layouts`
6. **Reusable UI goes in components** - Don't duplicate UI code

## 🔗 Related Documentation

- [BEM Structure Documentation](./src/styles/BEM-STRUCTURE.md)
- [API Routes](../docs/api-routes.md)

---

**Current Version:** 1.0.0
**Last Updated:** December 2024

