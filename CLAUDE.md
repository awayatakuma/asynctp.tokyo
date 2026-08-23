# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint source code with Biome
- `npm run format` - Format source code with Biome
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Architecture Overview

This is a Next.js 14 personal portfolio website with the following key features:

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Chakra UI with Emotion
- **Content**: MDX for blog posts and works
- **3D Graphics**: Three.js with React Three Fiber for VRM model display
- **Animation**: Framer Motion
- **Testing**: Jest with React Testing Library
- **Code Quality**: Biome for linting and formatting

### Directory Structure
- `src/app/` - Next.js App Router pages (blog, about, works, feed)
- `src/components/` - Reusable React components including VRM model viewer
- `src/contents/` - MDX content files for blog posts and works
- `src/utils/` - Utility functions for content processing and metadata
- `src/theme/` - Chakra UI theme configuration
- `public/assets/` - Static assets including VRM model files

### Key Components
- **VRMModel/VRMViewer**: 3D character model display using @pixiv/three-vrm
- **MDXArticle**: Renders MDX content with syntax highlighting
- **BlogCard**: Blog post preview cards with metadata

### Content Management
- Blog posts are stored as MDX files in `src/contents/blog/`
- Works/portfolio items in `src/contents/works/`
- Frontmatter metadata is extracted using gray-matter
- RSS feed generation via `src/app/feed/route.ts`

### Import Alias
- `@/*` maps to `src/*` for clean imports

### Build Process
- Uses `next-sitemap` for sitemap generation (runs via `postbuild` script)
- Biome handles code formatting and linting
- Three.js bundle optimization enabled via Next.js config

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
