"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { Wallpaper } from "@/types";
import { WallpaperCard } from "@/components/wallpaper-card";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Zap,
  ShieldCheck,
  Download,
  HelpCircle,
  ChevronDown,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_STYLES = [
  {
    name: "Cyberpunk Neon",
    desc: "Vibrant violet and cyan neon streetscapes with technological reflections.",
    prompt:
      "A cyberpunk city street at night, neon lights, purple and cyan color scheme, highly detailed, 4k",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600",
  },
  {
    name: "Anime Sunset",
    desc: "Scenic anime-style horizons with glowing golden hour clouds.",
    prompt:
      "Stunning anime sunset landscape, mountain silhouettes, aesthetic clouds, warm golden hour light, Makoto Shinkai style",
    image:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600",
  },
  {
    name: "Dark Minimalist",
    desc: "Monochromatic, sleek, low-contrast shadows and clean geometric layouts.",
    prompt:
      "Minimalist landscape wallpaper, flat design, clean vector geometry, pastel colors, soothing tone, 8k resolution",
    image:
      "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=600",
  },
];

const FAQs = [
  {
    q: "How does the AI Wallpaper Generator work?",
    a: "Dreamslates connects to advanced image generation models (OpenAI DALL-E 3, Gemini Imagen 3, Stability AI, and Replicate Flux) through our secure server. Describe your vision in the prompt box, and the AI generates it dynamically in seconds.",
  },
  {
    q: "Do I own the wallpapers I generate?",
    a: "Yes! You own the rights to the AI-generated wallpapers subject to the licensing terms of the underlying engine (e.g., OpenAI or Stability AI). You can copy prompts, save them to favorites, and export them for personal use.",
  },
  {
    q: "How does the moderation check protect against copyright issues?",
    a: "We implement an OpenAI Moderation API check alongside a custom lexical blacklist. This blocks inappropriate entries and copyright-protected assets (like Disney, Pokemon, or celebrity generation) prior to querying API engines, keeping the platform legal.",
  },
  {
    q: "What is the role of Pexels in Dreamslates?",
    a: "Pexels API is used exclusively as a secondary inspiration reference feed. We do not claim ownership of Pexels images. All download credits are attributed directly to the photographers in compliance with the Pexels License terms.",
  },
  {
    q: "How do I download high-resolution wallpapers?",
    a: "Clicking Download on any card opens the global preview modal. There, you can select resolutions (1080p, 1440p, 4K, or Ultrawide) and formats (PNG or JPEG). We render the file using your browser canvas for optimized image quality.",
  },
];

const TRENDING_SEED: Wallpaper[] = [
  {
    id: "seed-1",
    url: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1200",
    aspectRatio: "16:9",
    prompt:
      "A beautiful mountain range under a brilliant starry night sky, hyperrealistic, 4k",
    provider: "OpenAI DALL-E 3",
    isAI: true,
    createdAt: Date.now(),
  },
  {
    id: "seed-2",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200",
    aspectRatio: "16:9",
    prompt:
      "Abstract premium flowing liquid paint, colorful blue and gold waves, smooth silk texture, 8k",
    provider: "Stability AI",
    isAI: true,
    createdAt: Date.now(),
  },
  {
    id: "seed-3",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200",
    aspectRatio: "16:9",
    photographer: "Sora Sagano",
    photographerUrl: "https://unsplash.com/@sagano",
    title: "Tokyo Cyberpunk City Night Scene",
    isAI: false,
    createdAt: Date.now(),
  },
];

export default function HomePage() {
  const router = useRouter();
  const { updateSettings } = useWallpaperStore();

  const [promptText, setPromptText] = useState("");
  const [selectedRatio, setSelectedRatio] = useState<"16:9" | "9:16" | "1:1" | "21:9">("16:9");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const handleQuickTrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    updateSettings({ aspectRatio: selectedRatio });
    router.push(`/generator?q=${encodeURIComponent(promptText)}`);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none -z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] radial-glow pointer-events-none -z-10" />

      {/* 1. HERO */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center space-y-8 flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-white/10 dark:border-white/5 text-xs font-semibold text-primary dark:text-indigo-400 shadow-md">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Premium AI Generation Engine</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-foreground">
            Create stunning{" "}
            <span className="text-gradient-premium">AI wallpapers</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate bespoke, high-resolution desktop and mobile wallpapers in 4K using
            chatbot-style prompts, or explore endless curation databases.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 shrink-0"
        >
          <Link
            href="/generator"
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Wallpaper</span>
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-4 rounded-xl bg-card border border-border text-foreground hover:bg-muted font-bold text-base shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Inspiration</span>
          </Link>
        </motion.div>
      </section>

      {/* 2. QUICK TRY */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium border border-white/10 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
              Quick Launch Generator
            </h3>
          </div>

          <form onSubmit={handleQuickTrySubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Enter a prompt (e.g. 'A stunning Japanese pagoda in winter, sunset, anime aesthetic')..."
                className="flex-1 px-4 py-3.5 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
              />
              <button
                type="submit"
                disabled={!promptText.trim()}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                <span>Launch Chat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 select-none">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2">
                Aspect Ratio:
              </span>
              {[
                { id: "16:9", label: "Desktop" },
                { id: "9:16", label: "Mobile" },
                { id: "1:1", label: "Square" },
                { id: "21:9", label: "Ultrawide" },
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  type="button"
                  onClick={() => setSelectedRatio(ratio.id as "16:9" | "9:16" | "1:1" | "21:9")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                    selectedRatio === ratio.id
                      ? "bg-indigo-600/10 border-indigo-500 text-primary"
                      : "bg-card border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {ratio.id} ({ratio.label})
                </button>
              ))}
            </div>
          </form>
        </motion.div>
      </section>

      {/* 3. TRENDING */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-500" />
              <span>Trending Wallpapers</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Hand-picked community choices and reference design elements.
            </p>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-indigo-500 hover:text-indigo-600 cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>Explore Inspiration Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRENDING_SEED.map((wp) => (
            <WallpaperCard key={wp.id} wallpaper={wp} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR STYLES */}
      <section className="w-full bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Pre-configured Art Styles
            </h2>
            <p className="text-sm text-muted-foreground">
              Select an art style chip inside the generator to automatically apply aesthetic
              variables to your custom prompts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POPULAR_STYLES.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border shadow-md cursor-pointer"
                onClick={() => {
                  router.push(`/generator?q=${encodeURIComponent(style.prompt)}`);
                }}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 flex flex-col justify-end p-6 text-white space-y-2">
                  <h3 className="font-bold text-lg">{style.name}</h3>
                  <p className="text-xs text-zinc-300 leading-normal line-clamp-2">
                    {style.desc}
                  </p>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1 pt-1.5">
                    <span>Try This Style</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Designed for Wallpaper Curation
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to generate, crop, format, and catalog high-quality visual
            backgrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Layers,
              title: "Engine Swap Abstraction",
              desc: "Swap easily between OpenAI, Imagen 3, Stability AI, and Replicate on our backend.",
            },
            {
              icon: ShieldCheck,
              title: "Moderation Architecture",
              desc: "Checks prompts for brand logos, trademarked entities, and safety boundaries before querying.",
            },
            {
              icon: Download,
              title: "Canvas High-Res Export",
              desc: "Choose aspect ratios (16:9, 9:16, 21:9) and export using client-side canvas sizing.",
            },
            {
              icon: Zap,
              title: "Synthetic Media Tagging",
              desc: "Generations include visible watermark overlays and metadata tags ready for C2PA schema checks.",
            },
          ].map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-base font-bold text-foreground">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="w-full bg-card border-t border-border py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-1.5">
              <HelpCircle className="w-8 h-8 text-indigo-500 shrink-0" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Clear answers regarding AI image licenses, copyright filters, and high-res downloads.
            </p>
          </div>

          <div className="space-y-4">
            {FAQs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <span className="font-bold text-sm text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                      openFAQIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFAQIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-border text-xs text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
