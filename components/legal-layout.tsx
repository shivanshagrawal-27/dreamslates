"use client";

import React from "react";
import { FileText, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 relative grid-bg">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] radial-glow pointer-events-none -z-10" />

      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-card border border-border rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Header Section */}
        <div className="space-y-4 pb-8 border-b border-border mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-primary text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Policy Document</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content Section (Markdown styling) */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
          {children}
        </div>
      </motion.article>
    </div>
  );
}
