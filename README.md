# Yojna Saathi Seva

Create a web application called "YojnaSetu" (योजनासेतु), an accessible government welfare discovery and automated form filling portal tailored for semi-literate and non-tech citizens across India.

### 🎨 Design System & Visual Tokens

Configure the Tailwind theme with these rules:

- Primary Color: Deep Trust Blue (`#0B3C5D`) for headers, trust indicators, and structural containers.

- Secondary Accent: Saffron Orange (`#E85D04` / `#F48020`) for primary interactive buttons and active states.

- Success Accent: Welfare Green (`#2E7D32`) for eligible badges and completion states.

- Background: Clean Warm Canvas (`#F8F9FA` or `#FFFFFF`). Strictly avoid dark mode.

- Typography: Large, high-legibility fonts. Body text must be at least 18px (`text-lg`), headings 24px-32px.

- Touch Targets: All clickable buttons must have a minimum height of 60px (`h-14` or `h-16`) with rounded-2xl corners for easy mobile tapping.

- Bilingual Labels: Every key action and heading must feature English alongside Hindi (Devanagari) side-by-side or stacked.

### 🏛️ Header & Trust Anchor

Build a top navigation bar:

- Subtle tricolor stripe accent at the very top (Saffron `#FF9933`, White, Green `#138808`).

- Left side: Logo showing an Indian emblem or bridge icon with text "YojnaSetu | योजनासेतु" and a verified badge labeled "भारत सरकार सेवा संगत (Govt Schemes Portal)".

- Right side: A large, high-contrast Language Switcher pill button (English / हिंदी) with an audio accessibility toggle icon (🔊 Audio Help).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://yojna-saathi-seva.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/68c87b04-4fa1-49d4-8a5f-6b729a474589).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
