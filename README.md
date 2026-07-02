# Dreamslates

A modern AI-powered wallpaper generation platform built with **Next.js 15**, featuring a premium glassmorphism interface, AI provider integration, inspiration gallery, secure Bring Your Own API Key (BYOK) architecture, and a production-ready user experience.

**Live Demo:** https://dreamslates.vercel.app

---

## Overview

Dreamslates allows users to generate high-quality AI wallpapers using their preferred AI provider while keeping API keys private and under their own control.

Instead of relying on a single paid backend, the platform follows a **Bring Your Own API Key (BYOK)** model. Users can securely connect their preferred provider (such as Hugging Face, OpenAI, Gemini, Stability AI, or Replicate) directly from the browser and generate wallpapers without exposing credentials publicly.

The project focuses on clean UI, modular architecture, responsiveness, and a production-ready developer experience.

---
## Preview


---
## Features

### AI Wallpaper Generator

- Conversational AI wallpaper generation interface
- Intelligent prompt enhancement
- Multiple aspect ratios
- Responsive preview experience
- Download generated wallpapers

### Bring Your Own API Key (BYOK)

Users can securely connect their own AI provider.

Supported providers:

- Hugging Face FLUX.1
- OpenAI DALL·E 3
- Gemini Imagen
- Stability AI
- Replicate FLUX

API keys are stored locally inside the user's browser and are never exposed publicly.

---

### Provider Connection

- One-click provider selection
- Secure API key input
- Connection status indicator
- Test Connection feature
- Automatic provider switching

---

### Inspiration Gallery

Powered by the Pexels API.

Features include:

- Search wallpapers
- Category browsing
- Infinite scrolling
- Responsive masonry layout
- High-quality inspiration images

---

### User Experience

- Dark premium interface
- Glassmorphism design
- Responsive on desktop and mobile
- Smooth animations
- Fast navigation
- Accessible layout

---

### Personalization

- Favorites
- Wallpaper history
- Local collections
- Theme switching
- Persistent browser storage

---

### Security

- Browser-side API key storage
- Prompt moderation
- Safe generation workflow
- No exposed private credentials

---

## Tech Stack

### Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### State Management

- Zustand

### AI Providers

- Hugging Face
- OpenAI
- Gemini
- Stability AI
- Replicate

### External APIs

- Pexels API

### Deployment

- Vercel

---

## Project Structure

```
app/
components/
lib/
store/
public/
types/
```

The project follows a modular architecture where providers, UI components, API routes, and state management remain isolated for maintainability.

---

## Local Setup

Clone the repository

```bash
git clone https://github.com/shivanshagrawal-27/dreamslates.git
```

Move into the project

```bash
cd dreamslates
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file if you want to configure server-side providers.

```env
OPENAI_API_KEY=

PEXELS_API_KEY=

GEMINI_API_KEY=

STABILITY_API_KEY=

REPLICATE_API_TOKEN=
```

The deployed version also supports connecting API keys directly from the browser using the BYOK interface.

---

## Live Demo

Production Deployment

https://dreamslates.vercel.app

GitHub Repository

https://github.com/shivanshagrawal-27/dreamslates

---

## Future Improvements

- Authentication
- Cloud wallpaper sync
- AI prompt templates
- Wallpaper collections
- Community sharing
- Usage analytics
- Additional AI providers

---

## Author

**Shivansh Agrawal**

B.Tech CSE (Data Science)

GitHub

https://github.com/shivanshagrawal-27

LinkedIn

https://www.linkedin.com/in/shivansh-agrawal-27/

---

## License

This project is intended for educational and portfolio purposes.
