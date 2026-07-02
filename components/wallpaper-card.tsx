"use client";

import Image from "next/image";
import { useState } from "react";
import { Wallpaper } from "@/types";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { usePreviewStore } from "@/store/usePreviewStore";
import { useToastStore } from "@/store/useToastStore";
import { Heart, Maximize2, Download, Copy, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

export function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const { toggleFavorite, isFavorite } = useWallpaperStore();
  const { openPreview } = usePreviewStore();
  const { showToast } = useToastStore();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const favorited = isFavorite(wallpaper.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(wallpaper);
    showToast(
      favorited ? "Removed from favorites" : "Added to favorites",
      favorited ? "info" : "success"
    );
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wallpaper.prompt) {
      navigator.clipboard.writeText(wallpaper.prompt);
      showToast("Prompt copied to clipboard!", "success");
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Trigger preview modal which contains the high-res download configuration panel
    openPreview(wallpaper);
  };

  // Determine size classes based on aspect ratio for grid layout
  const aspectClass =
    wallpaper.aspectRatio === "9:16"
      ? "aspect-[9/16]"
      : wallpaper.aspectRatio === "21:9"
      ? "aspect-[21/9]"
      : wallpaper.aspectRatio === "1:1"
      ? "aspect-square"
      : "aspect-[16/9]"; // 16:9

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openPreview(wallpaper)}
      className={`relative w-full overflow-hidden rounded-2xl cursor-pointer group shadow-md border border-white/5 bg-muted dark:bg-zinc-900 ${aspectClass}`}
    >
      {/* Next.js Optimized Image */}
      <Image
        src={imageError ? "/placeholder-wallpaper.svg" : wallpaper.url}
        alt={wallpaper.prompt || wallpaper.title || "Wallpaper"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setImageError(true)}
        unoptimized={wallpaper.url.startsWith("data:")} // Don't optimize base64 images
      />

      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
        
        {/* Top Actions */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center gap-1 shadow-md">
            {wallpaper.isAI ? (
              <>
                <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>AI Generator</span>
              </>
            ) : (
              <>
                <User className="w-3 h-3 text-pink-400 shrink-0" />
                <span>Reference Pexels</span>
              </>
            )}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-lg backdrop-blur-md border border-white/10 text-white transition-all hover:scale-105 shadow-md cursor-pointer ${
                favorited ? "bg-rose-500/80 text-rose-100 border-rose-500" : "bg-black/30 hover:bg-black/50"
              }`}
              title={favorited ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
            </button>
            
            {wallpaper.isAI && wallpaper.prompt && (
              <button
                onClick={handleCopyPrompt}
                className="p-2 rounded-lg backdrop-blur-md bg-black/30 hover:bg-black/50 border border-white/10 text-white transition-all hover:scale-105 shadow-md cursor-pointer"
                title="Copy Prompt"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Metadata & Info */}
        <div className="space-y-3">
          <div className="text-white">
            <p className="text-sm font-semibold line-clamp-2 leading-snug drop-shadow-md">
              {wallpaper.isAI ? wallpaper.prompt : wallpaper.title || "Stunning Landscape"}
            </p>
            {!wallpaper.isAI && wallpaper.photographer && (
              <p className="text-[11px] text-zinc-300 mt-1 flex items-center gap-1 drop-shadow-sm font-medium">
                <span>By</span>
                <span className="underline hover:text-white transition-colors">{wallpaper.photographer}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider backdrop-blur-sm bg-white/5 px-2 py-0.5 rounded border border-white/5">
              {wallpaper.aspectRatio}
            </span>
            
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-100 text-zinc-900 flex items-center gap-1 shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>C2PA Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Static indicator for Mobile view when not hovered */}
      <div className="absolute bottom-3 left-3 z-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-300 flex items-center gap-1.5">
        <span className="text-[9px] font-bold text-white px-2 py-0.75 rounded-full bg-black/50 backdrop-blur-sm shadow border border-white/5 flex items-center gap-1">
          {wallpaper.isAI ? (
            <Sparkles className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
          ) : (
            <User className="w-2.5 h-2.5 text-pink-400 shrink-0" />
          )}
          <span>{wallpaper.isAI ? "AI" : "REF"}</span>
        </span>
      </div>
    </motion.div>
  );
}
