import Link from "next/link";
import { Sparkles, Heart, HelpCircle, Shield, FileText } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { label: "Nature", path: "/gallery?q=nature" },
    { label: "Abstract", path: "/gallery?q=abstract" },
    { label: "Space", path: "/gallery?q=space" },
    { label: "Anime", path: "/gallery?q=anime" },
    { label: "Minimalist", path: "/gallery?q=minimalist" },
    { label: "Cars & Gaming", path: "/gallery?q=cars" },
  ];

  const quickLinks = [
    { label: "AI Wallpaper Generator", path: "/generator" },
    { label: "Inspiration Gallery", path: "/gallery" },
    { label: "My Favorites", path: "/favorites" },
    { label: "About Us", path: "/about" },
    { label: "Contact & Support", path: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms of Service", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Disclaimer", path: "/disclaimer" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "AI Content Policy", path: "/ai-content-policy" },
    { label: "DMCA Policy", path: "/dmca" },
  ];

  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg text-gradient-premium bg-size-200">Dreamslates</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create gorgeous, high-resolution AI wallpapers tailored to your exact prompt, or find daily curation and inspiration from our global community database.
            </p>
            <div className="text-[11px] text-muted-foreground border-l-2 border-indigo-500/40 pl-3 italic">
              AI generation is our primary engine. Pexels curation is used as a secondary inspiration source.
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Explore</span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-indigo-500" />
              <span>Styles & Concepts</span>
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    href={cat.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>Legal & Policies</span>
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3 h-3 text-muted-foreground" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* C2PA & License Disclaimers */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Dreamslates. All rights reserved. Designed with premium aesthetics.
            </p>
            <p className="text-[10px] text-muted-foreground/80 max-w-2xl leading-relaxed">
              **Attribution & Licensing**: Photos in our secondary inspiration gallery are provided by **Pexels** under the Pexels License. Dreamslates does not claim ownership or rights over Pexels images. Photographers own their respective creations. AI images are generated dynamically.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <span className="text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>C2PA Metadata Prepared</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
