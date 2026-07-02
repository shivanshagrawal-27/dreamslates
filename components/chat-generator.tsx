"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWallpaperStore } from "@/store/useWallpaperStore";
import { usePreviewStore } from "@/store/usePreviewStore";
import { useToastStore } from "@/store/useToastStore";
import { ChatMessage, Wallpaper } from "@/types";
import {
  Sparkles,
  Send,
  Trash2,
  Settings,
  Scale,
  Cpu,
  History,
  Download,
  Heart,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  Key,
  Globe,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STYLE_CHIPS = [
  { label: "Cyberpunk", prompt: "A cyberpunk city street at night, neon lights, purple and cyan color scheme, highly detailed, 4k" },
  { label: "Anime Sunset", prompt: "Stunning anime sunset landscape, mountain silhouettes, aesthetic clouds, warm golden hour light, Makoto Shinkai style" },
  { label: "Minimalist", prompt: "Minimalist landscape wallpaper, flat design, clean vector geometry, pastel colors, soothing tone, 8k resolution" },
  { label: "Space & Galaxy", prompt: "A cosmic spiral galaxy with swirling nebulae, glowing dust stars, deep indigo and violet colors, space wallpaper, 4k" },
  { label: "Ethereal Fantasy", prompt: "A magical floating island with neon waterfalls, giant mystical trees, glowing crystals, ethereal fantasy landscape, volumetric lighting" },
  { label: "Vaporwave", prompt: "Vaporwave grid sunset, wireframe neon grid, retro 80s aesthetic, synthwave colors, palm tree silhouettes, 108p" },
  { label: "Pixel Art", prompt: "A cozy pixel art cabin in the woods, warm light glowing from windows, snowfall, starry night sky, retro 16-bit gaming wallpaper" },
  { label: "Nature Forest", prompt: "Deep mystic forest landscape, sunrays piercing through foggy redwood trees, emerald green colors, hyperrealistic wallpaper, 4k" }
];

function SafetyDashboard({ safety }: { safety: NonNullable<ChatMessage["safety"]> }) {
  const [isOpen, setIsOpen] = useState(false);
  const score = safety.safetyScore;

  // Determine safety class/colors
  let scoreColorClass = "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
  let scoreLabel = "Safe (Green)";
  if (score < 55) {
    scoreColorClass = "text-rose-500 border-rose-500/20 bg-rose-500/10";
    scoreLabel = "High Risk (Red)";
  } else if (score < 85) {
    scoreColorClass = "text-amber-500 border-amber-500/20 bg-amber-500/10";
    scoreLabel = "Moderate Risk (Yellow)";
  }

  const riskDomains = [
    { label: "Violence Risk", value: safety.scores.violence },
    { label: "NSFW Risk", value: safety.scores.nsfw },
    { label: "Hate Speech Risk", value: safety.scores.hateSpeech },
    { label: "Bias Risk", value: safety.scores.bias },
    { label: "Deepfake Risk", value: safety.scores.deepfake },
    { label: "Misinformation Risk", value: safety.scores.misinformation },
  ];

  return (
    <div className="mt-3 border border-border rounded-xl bg-card overflow-hidden text-xs">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors select-none"
      >
        <div className="flex items-center gap-2 font-bold text-foreground">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>AI Safety Analysis Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${scoreColorClass}`}>
            Score: {score}/100 • {scoreLabel}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-muted-foreground ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-border bg-black/5 dark:bg-white/[0.02]"
          >
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {riskDomains.map((domain) => {
                  const riskValue = domain.value;
                  let barColor = "bg-emerald-500";
                  let textColor = "text-emerald-400";
                  if (riskValue >= 75) {
                    barColor = "bg-rose-500";
                    textColor = "text-rose-400";
                  } else if (riskValue >= 45) {
                    barColor = "bg-amber-500";
                    textColor = "text-amber-400";
                  }

                  return (
                    <div key={domain.label} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
                        <span>{domain.label}</span>
                        <span className={textColor}>{riskValue}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${barColor}`} 
                          style={{ width: `${riskValue}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                This dashboard verifies safe prompt boundaries across caste, religion, misinformation, public impersonation, violence, and adult domains.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ChatGeneratorProps {
  seedPrompt?: string;
}

export function ChatGenerator({ seedPrompt }: ChatGeneratorProps = {}) {
  const {
    messages,
    addMessage,
    updateMessage,
    clearChat,
    settings,
    updateSettings,
    addGeneratedWallpaper,
    promptHistory,
    addPromptToHistory,
    toggleFavorite,
    isFavorite,
    apiKeys,
    updateApiKeys
  } = useWallpaperStore();

  const { openPreview } = usePreviewStore();
  const { showToast } = useToastStore();

  const [inputPrompt, setInputPrompt] = useState(seedPrompt ?? "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);

  const handleTestConnection = async (providerName: string) => {
    const key = apiKeys[providerName as keyof typeof apiKeys];
    if (!key || !key.trim()) {
      showToast("Please enter an API key first.", "error");
      return;
    }
    setTestingProvider(providerName);
    try {
      const res = await fetch("/api/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerName, apiKey: key }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`${providerName} connected successfully!`, "success");
      } else {
        showToast(`${providerName} failed: ${data.error || "Invalid key"}`, "error");
      }
    } catch {
      showToast("Connection test failed. Check your network.", "error");
    } finally {
      setTestingProvider(null);
    }
  };
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Inject initial assistant message if chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        id: "welcome-message",
        role: "assistant",
        text: "Welcome to **Dreamslates**! 🌟 Describe your vision in the input box below or choose one of our popular quick-start styles to generate high-resolution AI wallpapers instantly.",
        timestamp: Date.now()
      });
    }
  }, [messages.length, addMessage]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || loading) return;

    setLoading(true);
    setInputPrompt("");

    const promptId = `msg-${Date.now()}`;
    const assistantId = `msg-${Date.now() + 1}`;

    // 1. Add User message
    addMessage({
      id: promptId,
      role: "user",
      text: promptText,
      timestamp: Date.now()
    });

    // 2. Add Prompt to local storage history
    addPromptToHistory(promptText);

    // 3. Add Assistant generating message
    addMessage({
      id: assistantId,
      role: "assistant",
      text: "Generating your custom wallpaper...",
      isGenerating: true,
      timestamp: Date.now(),
      options: {
        aspectRatio: settings.aspectRatio,
        quality: settings.quality,
        provider: settings.preferredProvider
      }
    });

    try {
      // 4. Request server generation API
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          aspectRatio: settings.aspectRatio,
          quality: settings.quality,
          preferredProvider: settings.preferredProvider,
          styleMode: settings.styleMode,
          enhancePrompt: settings.enhancePrompt,
          apiKeys: apiKeys
        })
      });

      const data = await response.json();

      if (data.blocked) {
        updateMessage(assistantId, {
          text: `Generation blocked due to AI Safety concerns.`,
          isGenerating: false,
          error: data.reason || "Prompt violates safety policies.",
          safety: data.safety
        });
        showToast("Generation blocked by AI Safety check", "error");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate wallpaper.");
      }

      // 5. Success! Create wallpaper structure
      const newWallpaper: Wallpaper = {
        id: `ai-${Date.now()}`,
        url: data.url,
        aspectRatio: data.aspectRatio,
        prompt: data.prompt,
        provider: data.providerName,
        isAI: true,
        createdAt: Date.now()
      };

      // 6. Update store states
      addGeneratedWallpaper(newWallpaper);

      // 7. Update assistant chat bubble
      const originalPromptStr = promptText.trim();
      const enhancedPromptStr = data.prompt ? data.prompt.trim() : originalPromptStr;
      const showEnhanced = settings.enhancePrompt && enhancedPromptStr.toLowerCase() !== originalPromptStr.toLowerCase();

      updateMessage(assistantId, {
        text: `Here is your generated wallpaper using **${data.providerName}** in **${data.aspectRatio}** ratio. You can preview, format, and download it in high-res!${
          showEnhanced ? `\n\n**Enhanced Prompt:** *"${enhancedPromptStr}"*` : ""
        }`,
        isGenerating: false,
        image: newWallpaper,
        safety: data.safety
      });

      showToast("Wallpaper generated successfully!", "success");
    } catch (err: any) {
      console.error(err);

      // Update assistant bubble with error
      updateMessage(assistantId, {
        text: `I encountered an issue generating your wallpaper.`,
        isGenerating: false,
        error: err.message || "An unexpected error occurred."
      });

      showToast(err.message || "Generation failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputPrompt);
  };

  const handleChipClick = (chipPrompt: string) => {
    setInputPrompt(chipPrompt);
    showToast("Style configuration injected!", "info");
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden bg-background relative">

      {/* Sidebar: Configuration */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden lg:flex flex-col border-r border-border bg-card shrink-0 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-bold text-foreground flex items-center gap-1.5 text-sm uppercase tracking-wider">
                  <Settings className="w-4 h-4 text-indigo-500" />
                  <span>Generator Settings</span>
                </h3>
              </div>

              {/* Providers */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Model Engine</span>
                </label>
                <div className="space-y-1">
                  {[
                    "Hugging Face (FLUX.1)",
                    "OpenAI DALL-E 3",
                    "Gemini Imagen 3",
                    "Stability AI",
                    "Replicate FLUX.1"
                  ].map((prov) => (
                    <button
                      key={prov}
                      onClick={() => updateSettings({ preferredProvider: prov })}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${settings.preferredProvider === prov
                          ? "bg-indigo-600/10 border-indigo-500 text-primary"
                          : "bg-white/5 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <span>{prov}</span>
                      {settings.preferredProvider === prov && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Dynamic API Key Input for Selected Provider */}
                <div className="space-y-1.5 p-3 rounded-xl bg-indigo-600/5 border border-indigo-500/10 mt-2">
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-extrabold text-indigo-500 dark:text-indigo-400">
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-indigo-400" />
                      <span>{settings.preferredProvider} Key</span>
                    </span>
                    <a
                      href={
                        settings.preferredProvider === "Hugging Face (FLUX.1)"
                          ? "https://huggingface.co/settings/tokens"
                          : settings.preferredProvider === "OpenAI DALL-E 3"
                          ? "https://platform.openai.com/api-keys"
                          : settings.preferredProvider === "Gemini Imagen 3"
                          ? "https://aistudio.google.com/"
                          : settings.preferredProvider === "Stability AI"
                          ? "https://platform.stability.ai/account/keys"
                          : "https://replicate.com/account/api-tokens"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-500 dark:text-indigo-400 hover:underline font-bold"
                    >
                      Get Key
                    </a>
                  </div>
                  <input
                    type="password"
                    placeholder={`Enter ${settings.preferredProvider} Key`}
                    value={apiKeys[settings.preferredProvider as keyof typeof apiKeys] || ""}
                    onChange={(e) => updateApiKeys({ [settings.preferredProvider]: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground/45"
                  />
                  <button
                    onClick={() => handleTestConnection(settings.preferredProvider)}
                    disabled={testingProvider === settings.preferredProvider || !apiKeys[settings.preferredProvider as keyof typeof apiKeys]?.trim()}
                    className="w-full mt-1.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-600/10 text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider cursor-pointer hover:bg-indigo-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    {testingProvider === settings.preferredProvider ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /> Testing...</>
                    ) : (
                      <><CheckCircle2 className="w-3 h-3" /> Test Connection</>
                    )}
                  </button>
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Aspect Ratio</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "16:9", label: "16:9 Desktop", ratio: "aspect-[16/9]" },
                    { id: "9:16", label: "9:16 Mobile", ratio: "aspect-[9/16]" },
                    { id: "1:1", label: "1:1 Square", ratio: "aspect-square" },
                    { id: "21:9", label: "21:9 Ultrawide", ratio: "aspect-[21/9]" }
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => updateSettings({ aspectRatio: ratio.id as any })}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${settings.aspectRatio === ratio.id
                          ? "bg-indigo-600/10 border-indigo-500 text-primary font-semibold"
                          : "bg-white/5 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <div className="text-xs">{ratio.id}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{ratio.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Style Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Premium Mode / Style</span>
                </label>
                <select
                  value={settings.styleMode}
                  onChange={(e) => updateSettings({ styleMode: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border bg-white/5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {[
                    "None",
                    "Cinematic",
                    "Ultra Realistic",
                    "Anime",
                    "Cyberpunk",
                    "Fantasy",
                    "Dark",
                    "Space",
                    "Neon",
                    "Dreamscape",
                    "Sci-Fi",
                    "Minimal",
                    "Nature",
                    "Abstract"
                  ].map((style) => (
                    <option key={style} value={style} className="bg-zinc-900 text-foreground">
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt Enhancer Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-foreground">Prompt Enhancer</div>
                  <div className="text-[10px] text-muted-foreground">Boost prompts with high-quality descriptors</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ enhancePrompt: !settings.enhancePrompt })}
                  className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center ${
                    settings.enhancePrompt ? "bg-indigo-600" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute ${
                      settings.enhancePrompt ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Prompt History list */}
              {promptHistory.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-border">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Recent Prompts</span>
                  </label>
                  <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                    {promptHistory.slice(0, 5).map((hPrompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInputPrompt(hPrompt)}
                        className="w-full p-2.5 rounded-lg bg-muted hover:bg-muted-foreground/10 text-left text-[11px] text-muted-foreground hover:text-foreground truncate block cursor-pointer transition-colors"
                        title={hPrompt}
                      >
                        {hPrompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Panel: Chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-black/45 relative grid-bg">

        {/* Chat Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-card shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Toggle Sidebar"
            >
              <Settings className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="font-bold text-sm tracking-tight">AI Generator Chatbot</span>
            </div>
          </div>
          <button
            onClick={() => {
              clearChat();
              showToast("Chat cleared successfully", "info");
            }}
            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer transition-colors flex items-center gap-1 text-xs"
            title="Clear Chat Console"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>        {/* Chat Messages flow or Connect AI Provider view */}
        {!Object.values(apiKeys).some((key) => key && key.trim() !== "") ? (
          <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center radial-glow">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl w-full p-8 rounded-2xl glass-premium shadow-2xl border border-white/10 dark:border-white/5 space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Key className="w-6 h-6 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Connect AI Provider
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Dreamslates runs securely in your browser. Enter your own API key for any model below to start generating custom wallpapers. Keys are saved locally and never shared.
                </p>
              </div>

              {/* Select Provider */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">
                  Select Provider
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { name: "Hugging Face (FLUX.1)" as const, label: "Hugging Face" },
                    { name: "OpenAI DALL-E 3" as const, label: "OpenAI" },
                    { name: "Gemini Imagen 3" as const, label: "Gemini" },
                    { name: "Stability AI" as const, label: "Stability" },
                    { name: "Replicate FLUX.1" as const, label: "Replicate" },
                  ].map((prov) => (
                    <button
                      key={prov.name}
                      type="button"
                      onClick={() => updateSettings({ preferredProvider: prov.name })}
                      className={`px-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center truncate ${
                        settings.preferredProvider === prov.name
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                          : "bg-white/5 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {prov.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Provider Form */}
              <div className="space-y-4">
                {[
                  {
                    name: "Hugging Face (FLUX.1)" as const,
                    badge: "Free & Fast (Recommended)",
                    desc: "Free Serverless Inference API. Excellent quality wallpapers in seconds.",
                    link: "https://huggingface.co/settings/tokens",
                  },
                  {
                    name: "OpenAI DALL-E 3" as const,
                    desc: "State-of-the-art DALL-E 3 model. Great for creative, stylized designs.",
                    link: "https://platform.openai.com/api-keys",
                  },
                  {
                    name: "Gemini Imagen 3" as const,
                    desc: "Google's highest quality photorealistic image model.",
                    link: "https://aistudio.google.com/",
                  },
                  {
                    name: "Stability AI" as const,
                    desc: "SD3, Core, or Ultra models. Perfect for photographic fidelity.",
                    link: "https://platform.stability.ai/account/keys",
                  },
                  {
                    name: "Replicate FLUX.1" as const,
                    desc: "Run FLUX Schnell, Dev or other models with high customization.",
                    link: "https://replicate.com/account/api-tokens",
                  },
                ]
                  .filter((prov) => prov.name === settings.preferredProvider)
                  .map((prov) => (
                    <div
                      key={prov.name}
                      className="space-y-4 p-5 rounded-2xl bg-white/5 dark:bg-black/20 border border-border"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-foreground">{prov.name}</span>
                          {prov.badge && (
                            <span className="text-[9px] font-extrabold bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {prov.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{prov.desc}</p>
                        
                        {/* Get API Key link */}
                        <a
                          href={prov.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-500 dark:text-indigo-400 hover:underline font-semibold inline-block"
                        >
                          Get {prov.name} Key →
                        </a>

                        {/* Connection status */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Status:</span>
                          {apiKeys[prov.name] && apiKeys[prov.name].trim() !== "" ? (
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Key Configured</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-500">
                              <span>Not Connected</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {/* API key input */}
                        <input
                          type="password"
                          placeholder={`Paste your ${prov.name} Key`}
                          value={apiKeys[prov.name] || ""}
                          onChange={(e) => updateApiKeys({ [prov.name]: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-border bg-black/20 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                        
                        {/* Test Connection */}
                        <button
                          type="button"
                          onClick={() => handleTestConnection(prov.name)}
                          disabled={testingProvider === prov.name || !apiKeys[prov.name]?.trim()}
                          className="w-full py-2 rounded-lg border border-indigo-500/20 bg-indigo-600/10 text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider cursor-pointer hover:bg-indigo-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          {testingProvider === prov.name ? (
                            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Testing...</>
                          ) : (
                            <><CheckCircle2 className="w-3.5 h-3.5" /> Test Connection</>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    const connected = Object.values(apiKeys).some(key => key.trim() !== "");
                    if (connected) {
                      showToast("AI provider connected successfully!", "success");
                    } else {
                      showToast("Please enter at least one API key to begin.", "error");
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all text-sm cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  Confirm & Start Generating
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Chat Messages flow */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => {
                  const isAssistant = message.role === "assistant";
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-sm border ${isAssistant
                            ? "bg-card border-border text-foreground rounded-tl-sm"
                            : "bg-indigo-600 border-indigo-600 text-white rounded-tr-sm"
                          }`}
                      >
                        {/* Header showing engine if assistant */}
                        {isAssistant && message.options && (
                          <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider font-bold text-indigo-500">
                            <Cpu className="w-3 h-3" />
                            <span>{message.options.provider} • {message.options.aspectRatio}</span>
                          </div>
                        )}

                        {/* Text content */}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                        {/* Safety Dashboard Panel */}
                        {message.safety && (
                          <SafetyDashboard safety={message.safety} />
                        )}

                        {/* Generating/Loading State */}
                        {message.isGenerating && (
                          <div className="mt-4 flex flex-col items-center justify-center p-8 rounded-xl bg-zinc-150 dark:bg-zinc-900 border border-border border-dashed">
                            <div className="flex gap-1 mb-3">
                              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full typing-dot" />
                              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full typing-dot" />
                              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full typing-dot" />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest animate-pulse">
                              Dreaming up visuals...
                            </span>
                          </div>
                        )}

                        {/* Error display */}
                        {message.error && (
                          <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-400">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-xs font-bold uppercase tracking-wider">Moderation / API Notice</p>
                              <p className="text-xs leading-relaxed">{message.error}</p>
                            </div>
                          </div>
                        )}

                        {/* Result image preview */}
                        {message.image && (
                          <div className="mt-4 space-y-3">
                            <div
                              className="relative overflow-hidden rounded-xl border border-border shadow-inner bg-zinc-950 group cursor-pointer"
                              style={{
                                aspectRatio: message.image.aspectRatio === "9:16" ? "9/16" : message.image.aspectRatio === "21:9" ? "21/9" : message.image.aspectRatio === "1:1" ? "1/1" : "16/9",
                                maxHeight: "340px",
                              }}
                              onClick={() => message.image && openPreview(message.image)}
                            >
                              <Image
                                src={message.image.url}
                                alt="Generated wallpaper"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-103"
                                unoptimized={message.image.url.startsWith("data:")}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-xs font-bold text-white uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm shadow flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Open Config Panel
                                </span>
                              </div>
                            </div>

                            {/* Image Actions */}
                            <div className="flex gap-2 pt-2 border-t border-border mt-2">
                              <button
                                onClick={() => message.image && toggleFavorite(message.image)}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${message.image && isFavorite(message.image.id)
                                    ? "bg-rose-500/10 border-rose-500 text-rose-400"
                                    : "bg-muted border-border hover:bg-muted-foreground/10 text-foreground"
                                  }`}
                              >
                                <Heart className={`w-3.5 h-3.5 ${message.image && isFavorite(message.image.id) ? "fill-current" : ""}`} />
                                <span>{message.image && isFavorite(message.image.id) ? "Favorited" : "Save Local"}</span>
                              </button>

                              <button
                                onClick={() => message.image && openPreview(message.image)}
                                className="flex-1 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10 transition-transform active:scale-95"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download 4K</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Floating Input bar and Chips */}
            <div className="p-4 bg-card border-t border-border shrink-0">
              <div className="max-w-3xl mx-auto space-y-4">

                {/* Style suggestions (Chips) */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>Popular Styles Suggestions (Click to fill)</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
                    {STYLE_CHIPS.map((style) => (
                      <button
                        key={style.label}
                        onClick={() => handleChipClick(style.prompt)}
                        className="px-3.5 py-1.5 rounded-full bg-muted hover:bg-indigo-600/10 hover:text-indigo-600 border border-border text-xs font-medium cursor-pointer shrink-0 transition-all hover:scale-[1.02]"
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input bar */}
                <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="Describe your dream wallpaper (e.g. 'Stunning abstract fluid liquid art, dark purple neon glowing grids, 8k resolution')..."
                    disabled={loading}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder:text-muted-foreground/80 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
                  />
                  <button
                    type="submit"
                    disabled={!inputPrompt.trim() || loading}
                    className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/15 flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    title="Send Prompt"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-center text-[10px] text-muted-foreground/80 gap-1.5 font-medium">
                  <span>All requests undergo automated Moderation checking.</span>
                  <span>•</span>
                  <span>Generates high-res image assets ready for desktop, mobile & ultrawide screens.</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
