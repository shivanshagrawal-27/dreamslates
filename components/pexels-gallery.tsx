"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Wallpaper } from "@/types";
import { WallpaperCard } from "./wallpaper-card";
import { Search, Loader2, Compass, AlertCircle, RefreshCw } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";

const CATEGORIES = [
  "Nature",
  "Abstract",
  "Space",
  "Anime",
  "Minimal",
  "Cars",
  "Gaming",
  "Technology",
  "Mountains",
  "Cities",
];

const SEARCH_SUGGESTIONS = [
  "neon cyberpunk",
  "retrowave grid",
  "cosmic nebula",
  "foggy redwoods",
  "minimalist lines",
  "sports cars 4k",
  "starry mountain night",
];

export function PexelsGallery() {
  const { showToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mapPhotoToWallpaper = useCallback((photo: Record<string, any>): Wallpaper => ({
    id: `px-${photo.id}`,
    url: photo.src.large2x || photo.src.original,
    aspectRatio: photo.width > photo.height ? "16:9" : "9:16",
    isAI: false,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    title: photo.alt || "Pexels Wallpaper Reference",
    createdAt: Date.now(),
  }), []);

  const fetchPhotos = useCallback(
    async (query: string, pageNum: number, append = false) => {
      setLoading(true);
      try {
        const url = `/api/pexels?q=${encodeURIComponent(query)}&page=${pageNum}&perPage=12`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load reference photos.");

        const data = await res.json();
        const mapped: Wallpaper[] = (data.photos || []).map(mapPhotoToWallpaper);

        if (mapped.length === 0) {
          setHasMore(false);
        } else {
          setWallpapers((prev) => (append ? [...prev, ...mapped] : mapped));
          setHasMore(mapped.length >= 12);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Could not fetch inspiration gallery.";
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    },
    [mapPhotoToWallpaper, showToast]
  );

  const handleLoadNewSearch = useCallback(
    (query: string) => {
      setPage(1);
      setHasMore(true);
      fetchPhotos(query, 1, false);
    },
    [fetchPhotos]
  );

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (searchQuery.trim() === "" && !activeCategory) {
      handleLoadNewSearch("");
      return;
    }

    if (searchQuery.trim() !== "") {
      setActiveCategory(null);
      searchTimeoutRef.current = setTimeout(() => {
        handleLoadNewSearch(searchQuery);
      }, 500);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery, activeCategory, handleLoadNewSearch]);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setSearchQuery("");
      handleLoadNewSearch("");
    } else {
      setActiveCategory(category);
      setSearchQuery("");
      handleLoadNewSearch(category);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestionsOpen(false);
  };

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const current = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPhotos(activeCategory || searchQuery || "", nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    if (current) observer.observe(current);
    return () => observer.disconnect();
  }, [page, hasMore, loading, searchQuery, activeCategory, fetchPhotos]);



  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-2">
          <Compass className="w-8 h-8 text-indigo-500 shrink-0" />
          <span>Inspiration Gallery</span>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore reference wallpapers provided by Pexels. Discover trending palettes and landscapes
          to inspire your next AI prompt.
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSuggestionsOpen(true)}
              onBlur={() => setTimeout(() => setSuggestionsOpen(false), 200)}
              placeholder="Search reference gallery..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-foreground"
            />
            {suggestionsOpen && (
              <div className="absolute top-full left-0 right-0 z-30 mt-2 p-2 rounded-xl border border-border bg-card shadow-2xl glass backdrop-blur-md space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2.5 py-1">
                  Trending Tags
                </div>
                {SEARCH_SUGGESTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSuggestionClick(tag)}
                    className="w-full px-2.5 py-2 text-left text-xs font-semibold hover:bg-indigo-600/10 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors text-muted-foreground"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="text-[11px] text-muted-foreground border-l-2 border-pink-500/40 pl-3 leading-normal max-w-sm text-left">
            All gallery photos belong to their respective creators under the Pexels License.
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 items-center select-none">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2">
            Categories:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      {wallpapers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallpapers.map((wp) => (
            <WallpaperCard key={wp.id} wallpaper={wp} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center p-12 border border-border border-dashed rounded-3xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
            <h4 className="font-bold text-base text-foreground">No Photos Found</h4>
            <p className="text-xs text-muted-foreground max-w-md">
              No matching reference photos found for &quot;{searchQuery || activeCategory}&quot;. Try a
              different category or search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(null);
                handleLoadNewSearch("");
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )
      )}

      {/* Skeleton loaders */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full bg-muted animate-pulse rounded-2xl border border-border"
              style={{ aspectRatio: i % 2 === 0 ? "16/9" : "9/16" }}
            />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={observerRef} className="h-10 w-full flex items-center justify-center">
        {loading && <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />}
      </div>
    </div>
  );
}
