# HomeVisor Pitch Deck

A production-ready Next.js 15 presentation deck for HomeVisor, built with Tailwind CSS v3, Framer Motion, and Lucide icons.

## Features

- ✨ Next.js 15 with App Router
- 🎨 Tailwind CSS v3
- 🎭 Framer Motion animations
- 🔍 Comprehensive SEO meta tags
- 🌓 Dark/Light theme toggle
- 📱 Responsive design
- 🎯 Keyboard navigation (arrow keys)
- 🏠 Lucide icon favicon

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Main presentation deck component
│   └── globals.css     # Global styles with Tailwind
├── public/
│   ├── icon.svg        # SVG favicon (Lucide Home icon)
│   ├── favicon.ico     # ICO favicon
│   └── site.webmanifest # PWA manifest
└── ...
```

## Navigation

- **Arrow Keys**: Navigate between slides
- **Click Progress Bar**: Jump to specific slide
- **Theme Toggle**: Switch between dark/light mode

## SEO

The app includes comprehensive SEO meta tags:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured metadata
- Canonical URLs
- Robot directives

## License

MIT

