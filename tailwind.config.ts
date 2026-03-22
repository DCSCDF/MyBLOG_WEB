import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        "on-surface": "#29343a",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-container": "#494661",
        "primary-dim": "#004eaf",
        "surface-container": "#e8eff4",
        "inverse-surface": "#0b0f11",
        "on-primary-container": "#004dae",
        "on-primary-fixed": "#003b8a",
        "on-tertiary-fixed-variant": "#534f6b",
        "primary-fixed": "#d9e2ff",
        "on-secondary-fixed": "#3e3f45",
        "error-container": "#fe8983",
        "secondary-container": "#e2e2e9",
        "tertiary-fixed": "#d6d0f1",
        "surface-container-low": "#f0f4f8",
        "on-surface-variant": "#566168",
        "surface-dim": "#cfdce5",
        "on-tertiary-fixed": "#36334d",
        "primary-container": "#d9e2ff",
        "on-tertiary": "#fcf7ff",
        "on-error-container": "#752121",
        "error-dim": "#4e0309",
        "outline": "#717c84",
        "secondary-fixed-dim": "#d4d4db",
        "inverse-on-surface": "#9a9da0",
        "on-secondary-container": "#505157",
        "on-primary": "#f7f7ff",
        "surface-tint": "#0059c7",
        "tertiary-dim": "#53506b",
        "background": "#f7f9fc",
        "surface-container-high": "#e1e9f0",
        "outline-variant": "#a8b3bb",
        "tertiary": "#605c78",
        "tertiary-fixed-dim": "#c8c3e3",
        "on-background": "#29343a",
        "tertiary-container": "#d6d0f1",
        "on-primary-fixed-variant": "#0056c1",
        "on-secondary": "#f9f8ff",
        "primary-fixed-dim": "#c4d4ff",
        "primary": "#0059c7",
        "error": "#9f403d",
        "on-secondary-fixed-variant": "#5a5b61",
        "on-error": "#fff7f6",
        "secondary": "#5e5f65",
        "surface-variant": "#d9e4ec",
        "secondary-fixed": "#e2e2e9",
        "surface": "#f7f9fc",
        "secondary-dim": "#525359",
        "surface-container-highest": "#d9e4ec",
        "surface-bright": "#f7f9fc",
        "inverse-primary": "#528dff"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans"],
        "body": ["Plus Jakarta Sans"],
        "label": ["Plus Jakarta Sans"]
      },
      borderRadius: { "DEFAULT": "0.5rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }
    }
  },
  plugins: []
}

export default config