"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { Sparkles, Heart, Sun, Moon, Menu, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useWallpaperStore((state) => state.theme);
  const toggleTheme = useWallpaperStore((state) => state.toggleTheme);
  const favorites = useWallpaperStore((state) => state.favorites);

  const navItems = [
    { label: "AI Generator", path: "/generator", icon: Sparkles, badge: "Core" },
    { label: "Inspiration", path: "/gallery", icon: ImageIcon },
    { label: "Favorites", path: "/favorites", icon: Heart, count: favorites.length },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/10 dark:border-white/5 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gradient-premium bg-size-200">
            Dreamslates
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "text-primary dark:text-indigo-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isActive ? "text-primary dark:text-indigo-400" : ""}`} />}
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="ml-1 text-[10px] bg-indigo-500 text-white font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="ml-1 text-[9px] bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold px-1.5 py-0.5 rounded-full scale-90">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Utility Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <Link
            href="/generator"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 dark:border-white/5 glass-premium"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600/10 text-primary dark:text-indigo-400"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="flex-1">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-xs bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                    {item.badge && (
                      <span className="text-[10px] bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-white/10 dark:border-white/5">
                <Link
                  href="/generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white flex items-center justify-center gap-2 font-semibold shadow-lg text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open AI Generator</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
