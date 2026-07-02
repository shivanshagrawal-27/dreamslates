# Dreamslates - Premium AI Wallpaper Platform

Dreamslates is a production-ready, fully functional AI-powered wallpaper generation and discovery platform. Built on Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand, and Framer Motion, it delivers a premium, Apple/Arc-inspired glassmorphic user interface.

## Core Features

- **Chatbot-Style AI Wallpaper Generator**: Conversational prompt interface with loading indicators, error boundary notifications, prompt history, and quick-replicate action.
- **Provider Abstraction Layer**: Pluggable backend structure supporting OpenAI DALL-E 3, Gemini Imagen 3, Stability AI Core, and Replicate FLUX.1.
- **Failover / Fallback Orchestrator**: Automatically shifts from the preferred provider down the list if any API limits are hit or key configurations are missing. Includes a stunning SVG-gradient mock generator if zero API keys are set.
- **Safety Moderation Checking**: Dual moderation filters comprising local lexical checks (blocking brands, trademarks, copyrighted characters, and celebrities) and the official OpenAI Moderation API before sending prompt requests.
- **Inspiration Reference Gallery**: Secondary wallpaper grid powered by the Pexels API. Features debounced global search, search suggestions, infinite scroll via IntersectionObserver, and strict attribution credits compliant with the Pexels License.
- **Canvas Download System**: Client-side canvas rendering engine allowing users to choose output aspects (16:9, 9:16, 1:1, 21:9) and resolutions (1080p, 1440p, 4K, and Ultrawide) in PNG or JPEG format, complete with visible "AI Generated" watermarks and metadata injection.
- **User Dashboard Space**: Client-side persistence using Zustand's local storage middleware for saving favorites, prompt history lists, and custom collection folders.
- **SEO & Performance Optimization**: Static page exports, metadata schemas, OpenGraph card tags, robots.txt, sitemap.xml, and optimized CSS variables.
- **Compliance Pages**: Complete legal documentation including Terms of Service, Privacy Policy, Disclaimer, Cookie Policy, AI Content Policy, and DMCA Takedown guidelines.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **State Management**: Zustand
- **Deployment**: Vercel

---

## Setup & Local Development

### 1. Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and populate the keys for the services you want to use:
```env
# OpenAI Key (Used for DALL-E 3 and prompt moderation checks)
OPENAI_API_KEY=your-openai-api-key

# Pexels API Key (Used to load reference photos in gallery)
PEXELS_API_KEY=your-pexels-api-key

# Gemini API Key (Imagen 3 fallback)
GEMINI_API_KEY=your-gemini-key

# Stability AI API Key (Stable Image Core fallback)
STABILITY_API_KEY=your-stability-key

# Replicate API Token (Flux fallback)
REPLICATE_API_TOKEN=your-replicate-token
```

*Note: If no API keys are provided, the platform automatically runs in Simulated Mode, using mock generated gradient canvases and local image references so you can test all features without configuration.*

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## Vercel Deployment

Deploying Dreamslates to Vercel is seamless:

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Link the repository inside your Vercel Dashboard.
3. Add the API keys as Environment Variables in Vercel settings (e.g. `OPENAI_API_KEY`, `PEXELS_API_KEY`, etc.).
4. Click **Deploy**. Vercel will automatically build the static pages and API routes.
