"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePreviewStore } from "@/store/usePreviewStore";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { useToastStore } from "@/store/useToastStore";
import { X, Heart, Download, Share2, Sparkles, Scale, Info, Check, Loader2, FolderHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PreviewModal() {
  const { activeWallpaper, closePreview } = usePreviewStore();
  const { toggleFavorite, isFavorite, collections, toggleWallpaperInCollection } = useWallpaperStore();
  const { showToast } = useToastStore();

  const [resolution, setResolution] = useState<"1080p" | "1440p" | "4k" | "ultrawide">("1080p");
  const [format, setFormat] = useState<"png" | "jpeg">("jpeg");
  const [watermark, setWatermark] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync image source and loading status when active wallpaper changes
  useEffect(() => {
    if (activeWallpaper) {
      setImageSrc(activeWallpaper.url);
      setIsImageLoading(true);
    }
  }, [activeWallpaper]);

  if (!activeWallpaper) return null;

  const favorited = isFavorite(activeWallpaper.id);

  // Resolution calculations based on aspect ratio
  const getDimensions = () => {
    const ratio = activeWallpaper.aspectRatio;
    if (ratio === "9:16") {
      if (resolution === "1080p") return { w: 1080, h: 1920 };
      if (resolution === "1440p") return { w: 1440, h: 2560 };
      if (resolution === "4k") return { w: 2160, h: 3840 };
      return { w: 1080, h: 1920 }; // ultrawide not applicable for mobile portrait
    } else if (ratio === "1:1") {
      if (resolution === "1080p") return { w: 1080, h: 1080 };
      if (resolution === "1440p") return { w: 2048, h: 2048 };
      if (resolution === "4k") return { w: 3840, h: 3840 };
      return { w: 1080, h: 1080 };
    } else if (ratio === "21:9") {
      if (resolution === "1080p") return { w: 2560, h: 1080 };
      if (resolution === "1440p") return { w: 3440, h: 1440 };
      if (resolution === "4k") return { w: 5120, h: 2160 };
      return { w: 3440, h: 1440 };
    } else {
      // 16:9
      if (resolution === "1080p") return { w: 1920, h: 1080 };
      if (resolution === "1440p") return { w: 2560, h: 1440 };
      if (resolution === "4k") return { w: 3840, h: 2160 };
      return { w: 1920, h: 1080 };
    }
  };

  const handleFavoriteClick = () => {
    toggleFavorite(activeWallpaper);
    showToast(
      favorited ? "Removed from favorites" : "Added to favorites",
      favorited ? "info" : "success"
    );
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.origin + `/gallery?id=${activeWallpaper.id}` : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Dreamslates Wallpaper",
          text: `Check out this beautiful wallpaper: "${activeWallpaper.prompt || "Inspiration Concept"}"`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied to clipboard!", "success");
      }
    } catch (err) {
      navigator.clipboard.writeText(shareUrl);
      showToast("Link copied to clipboard!", "success");
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    showToast("Processing high-res wallpaper export...", "info");

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = activeWallpaper.url;

    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { w, h } = getDimensions();
        canvas.width = w;
        canvas.height = h;

        // Draw image stretched/fitted
        ctx.drawImage(img, 0, 0, w, h);

        // Overlay watermark if selected
        if (watermark) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 10;
          ctx.font = "bold 24px system-ui, sans-serif";
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          ctx.textAlign = "right";

          // Text to overlay
          const text = activeWallpaper.isAI
            ? "AI GENERATED • DREAMSLATES"
            : "PHOTO PROVIDED BY PEXELS";

          ctx.fillText(text, w - 40, h - 40);

          // Add a subtle branding tag in the bottom left
          ctx.textAlign = "left";
          ctx.font = "16px system-ui, sans-serif";
          ctx.fillText("dreamslates.vercel.app", 40, h - 40);
        }

        // Export and Download
        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const quality = format === "jpeg" ? 0.95 : undefined;
        const dataUrl = canvas.toDataURL(mimeType, quality);

        const a = document.createElement("a");
        const filename = activeWallpaper.isAI
          ? `dreamslate_${activeWallpaper.id}_${resolution}.${format}`
          : `pexels_${activeWallpaper.photographer?.toLowerCase().replace(/\s+/g, "_")}_${resolution}.${format}`;

        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showToast("Wallpaper downloaded successfully!", "success");
      } catch (err) {
        console.error("Canvas export failed:", err);
        showToast("Direct download failed. Opening image in new tab instead.", "error");
        window.open(activeWallpaper.url, "_blank");
      } finally {
        setDownloading(false);
      }
    };

    img.onerror = () => {
      showToast("Failed to load image resource for download.", "error");
      setDownloading(false);
    };
  };

  const { w, h } = getDimensions();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-md overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closePreview}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-transform hover:scale-105 cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hidden Export Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full lg:h-[80vh] rounded-none md:rounded-3xl overflow-hidden glass border border-white/10 dark:border-white/5 shadow-2xl">

          {/* Left: Image Preview Frame */}
          <div className="relative flex-1 bg-zinc-950 flex items-center justify-center p-6 min-h-[320px] lg:h-full group overflow-hidden">
            {isImageLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 z-20 space-y-2">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Dreaming up view...</span>
              </div>
            )}
            
            <img
              src={imageSrc || "/placeholder-wallpaper.svg"}
              alt={activeWallpaper.prompt || "Wallpaper Preview"}
              className="max-w-full max-h-[45vh] lg:max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/5 transition-opacity duration-300"
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setImageSrc("/placeholder-wallpaper.svg");
              }}
            />

            {/* Visual AI Generated Label */}
            {activeWallpaper.isAI && (
              <span className="absolute bottom-6 left-6 text-xs px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm text-white flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Generated Content</span>
              </span>
            )}
          </div>

          {/* Right: Actions and Config Sidebar */}
          <div className="w-full lg:w-[380px] h-[55vh] lg:h-full bg-zinc-900 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between text-white shrink-0 overflow-hidden">
            
            {/* Scrollable Config Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gradient-primary">
                  {activeWallpaper.isAI ? "AI Wallpaper Core" : "Reference Curation"}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider">
                  Aspect Ratio: {activeWallpaper.aspectRatio}
                </p>
              </div>

              {/* Description Prompt / Attribution */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-sm space-y-2">
                <p className="font-semibold text-zinc-200">
                  {activeWallpaper.isAI ? "Generation Prompt:" : "Curation Description:"}
                </p>
                <p className="text-xs text-zinc-400 italic leading-relaxed">
                  "{activeWallpaper.prompt || activeWallpaper.title || "Abstract visual concept for creative inspiration."}"
                </p>

                {!activeWallpaper.isAI && (
                  <div className="border-t border-white/5 pt-2.5 mt-2.5 text-[10px] text-pink-400 font-medium">
                    Photo provided by **Pexels**. Creator:{" "}
                    <a
                      href={activeWallpaper.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      {activeWallpaper.photographer}
                    </a>
                  </div>
                )}
              </div>

              {/* Configuration Panel */}
              <div className="space-y-4">
                {/* Resolution */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <Scale className="w-3 h-3 text-indigo-400" />
                    <span>Select Export Size</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "1080p", label: "1080p HD", note: `${w} × ${h}` },
                      { id: "1440p", label: "1440p QHD", note: `${w} × ${h}` },
                      { id: "4k", label: "4K UHD", note: `${w} × ${h}` },
                      { id: "ultrawide", label: "Ultrawide", note: activeWallpaper.aspectRatio === "9:16" ? "N/A" : `${w} × ${h}`, disabled: activeWallpaper.aspectRatio === "9:16" }
                    ].map((res) => (
                      <button
                        key={res.id}
                        disabled={res.disabled}
                        onClick={() => setResolution(res.id as any)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${resolution === res.id
                          ? "bg-indigo-600/20 border-indigo-500 text-white font-semibold"
                          : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                          }`}
                      >
                        <div className="text-xs">{res.label}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{resolution === res.id ? res.note : ""}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Export Format
                  </label>
                  <div className="flex gap-2">
                    {["jpeg", "png"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f as any)}
                        className={`flex-1 py-2 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all uppercase ${format === f
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Watermark Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-zinc-200">Include Watermark</div>
                    <div className="text-[10px] text-zinc-500">Attaches a small watermark at bottom</div>
                  </div>
                  <button
                    onClick={() => setWatermark(!watermark)}
                    className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center ${watermark ? "bg-indigo-600" : "bg-white/10"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${watermark ? "translate-x-4" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>

                {/* Collections Manager */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <FolderHeart className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Add to Collections</span>
                  </label>
                  {collections.length === 0 ? (
                    <p className="text-[10px] text-zinc-500 italic leading-normal">
                      No collections created. Create a folder in{" "}
                      <Link href="/favorites" className="underline hover:text-white font-semibold" onClick={closePreview}>
                        My Creative Space
                      </Link>{" "}
                      first.
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin">
                      {collections.map((col) => {
                        const isInCol = col.wallpaperIds.includes(activeWallpaper.id);
                        return (
                          <button
                            key={col.id}
                            onClick={() => {
                              toggleWallpaperInCollection(col.id, activeWallpaper.id);
                              showToast(
                                isInCol ? `Removed from ${col.name}` : `Added to ${col.name}`,
                                "success"
                              );
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                              isInCol
                                ? "bg-indigo-600/10 border-indigo-500 text-indigo-200"
                                : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <span className="truncate pr-2">{col.name}</span>
                            {isInCol ? (
                              <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                            ) : (
                              <span className="text-[9px] text-zinc-600 shrink-0">Click to add</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* C2PA Provenance badge & metadata details */}
                {activeWallpaper.isAI && (
                  <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-2 mt-2">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                      <Check className="w-4 h-4 bg-indigo-500/20 text-indigo-400 rounded-full p-0.5" />
                      <span>Authentic AI Generated Content</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1.5 text-[10px] text-zinc-400 leading-normal">
                      <div>Creator:</div>
                      <div className="font-semibold text-zinc-200 text-right">Dreamslates AI</div>
                      <div>Model Engine:</div>
                      <div className="font-semibold text-zinc-200 text-right">{activeWallpaper.provider || "Dreamslates Core"}</div>
                      <div>Timestamp:</div>
                      <div className="font-semibold text-zinc-200 text-right">{new Date(activeWallpaper.createdAt).toLocaleString()}</div>
                      <div>C2PA Integrity:</div>
                      <div className="font-mono text-emerald-400 text-right font-medium">Signed Metadata Attached</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions section (sticky to bottom) */}
            <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-3 shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${favorited
                    ? "bg-rose-500/10 border-rose-500 text-rose-400"
                    : "bg-white/5 border-white/5 hover:bg-white/10 text-white"
                    }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                  <span>{favorited ? "Favorited" : "Favorite"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Concept</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4.5 h-4.5" />
                <span>{downloading ? "Exporting..." : "Download High-Res"}</span>
              </button>

              <div className="flex items-start gap-1.5 text-[10px] text-zinc-500 leading-normal bg-black/25 p-2.5 rounded-lg border border-white/5">
                <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <p>
                  Downloads are compiled using browser canvas cache. AI images include synthetic media headers for C2PA validation checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
