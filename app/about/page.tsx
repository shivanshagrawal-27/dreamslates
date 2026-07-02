"use client";

import { motion } from "framer-motion";
import { Sparkles, Image as ImageIcon, Cpu, Compass, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Cpu,
      title: "Advanced AI Generation",
      desc: "AI generation is the core identity of Dreamslates. We integrate OpenAI, Gemini, and Stability AI to bring your prompts to life in seconds."
    },
    {
      icon: ImageIcon,
      title: "High-Resolution Exports",
      desc: "Export wallpapers in multiple resolutions (1080p, 1440p, 4K, and Ultrawide) customized for desktop, mobile, and wide monitors."
    },
    {
      icon: Compass,
      title: "Inspiration Gallery",
      desc: "Browse a secondary feed of trending stock photos powered by Pexels to fuel your creativity. We never claim ownership of reference photos."
    },
    {
      icon: Shield,
      title: "Content Safety Curation",
      desc: "Every generation prompt runs through a strict moderation layer, filtering harmful, explicit, and trademarked entities."
    }
  ];

  return (
    <main className="min-h-screen bg-background py-20 relative overflow-hidden grid-bg">
      {/* Glows */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] radial-glow pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] radial-glow pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Dreamslates Vision</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Next-Gen Wallpaper Generation
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dreamslates is a premium platform engineered for creating high-fidelity, custom AI wallpapers. Inspired by modern designs from Apple, Arc, and Midjourney, we deliver a chatbot interface where prompts translate into art.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/generator"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-transform hover:scale-103 cursor-pointer"
            >
              Start Generating
            </Link>
            <Link
              href="/gallery"
              className="px-5 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted font-bold text-sm transition-transform hover:scale-103 cursor-pointer"
            >
              Explore Inspiration
            </Link>
          </div>
        </motion.div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 rounded-3xl border border-border glass-premium text-center space-y-4"
        >
          <h2 className="text-xl font-bold text-foreground">Powered by Modern Technology</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Dreamslates is built using Next.js 15 (App Router), React 19, TypeScript, Zustand state management, Tailwind CSS, Framer Motion, and HTML5 Canvas processing.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["Next.js 15", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Canvas API"].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-md bg-muted text-muted-foreground text-xs font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
