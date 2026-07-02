import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Wallpaper, ChatMessage, Collection } from "@/types";

interface SettingsState {
  aspectRatio: "9:16" | "16:9" | "1:1" | "21:9";
  quality: "standard" | "hd";
  format: "png" | "jpeg";
  preferredProvider: string;
  styleMode: string;
  enhancePrompt: boolean;
}

interface WallpaperStore {
  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Chat History
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearChat: () => void;

  // Settings
  settings: SettingsState;
  updateSettings: (settings: Partial<SettingsState>) => void;

  // Favorites
  favorites: Wallpaper[];
  toggleFavorite: (wallpaper: Wallpaper) => void;
  isFavorite: (id: string) => boolean;

  // Collections
  collections: Collection[];
  createCollection: (name: string, description?: string) => void;
  deleteCollection: (id: string) => void;
  toggleWallpaperInCollection: (collectionId: string, wallpaperId: string) => void;

  // Generated Wallpapers History
  generatedWallpapers: Wallpaper[];
  addGeneratedWallpaper: (wallpaper: Wallpaper) => void;

  // Prompt history
  promptHistory: string[];
  addPromptToHistory: (prompt: string) => void;
  clearPromptHistory: () => void;

  // API Keys (BYOK secure flow)
  apiKeys: {
    "Hugging Face (FLUX.1)": string;
    "OpenAI DALL-E 3": string;
    "Gemini Imagen 3": string;
    "Stability AI": string;
    "Replicate FLUX.1": string;
  };
  updateApiKeys: (keys: Partial<WallpaperStore["apiKeys"]>) => void;
}

export const useWallpaperStore = create<WallpaperStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        if (typeof window !== "undefined") {
          if (next === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
      // Initial Chat history (start with empty, we will inject a welcome message in component)
      messages: [],
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      clearChat: () => set({ messages: [] }),

      // Initial settings
      settings: {
        aspectRatio: "16:9",
        quality: "standard",
        format: "jpeg",
        preferredProvider: "Hugging Face (FLUX.1)",
        styleMode: "None",
        enhancePrompt: true,
      },

      // Initial API Keys
      apiKeys: {
        "Hugging Face (FLUX.1)": "",
        "OpenAI DALL-E 3": "",
        "Gemini Imagen 3": "",
        "Stability AI": "",
        "Replicate FLUX.1": "",
      },
      updateApiKeys: (newKeys) =>
        set((state) => ({ apiKeys: { ...state.apiKeys, ...newKeys } })),
      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

      // Favorites
      favorites: [],
      toggleFavorite: (wallpaper) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.id === wallpaper.id);
          if (exists) {
            return { favorites: state.favorites.filter((f) => f.id !== wallpaper.id) };
          } else {
            return { favorites: [...state.favorites, wallpaper] };
          }
        }),
      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      // Collections
      collections: [],
      createCollection: (name, description) =>
        set((state) => {
          const newCol: Collection = {
            id: `col-${Date.now()}`,
            name,
            description,
            wallpaperIds: [],
            createdAt: Date.now(),
          };
          return { collections: [...state.collections, newCol] };
        }),
      deleteCollection: (id) =>
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        })),
      toggleWallpaperInCollection: (colId, wpId) =>
        set((state) => ({
          collections: state.collections.map((c) => {
            if (c.id !== colId) return c;
            const exists = c.wallpaperIds.includes(wpId);
            return {
              ...c,
              wallpaperIds: exists
                ? c.wallpaperIds.filter((id) => id !== wpId)
                : [...c.wallpaperIds, wpId],
            };
          }),
        })),

      // Generated History
      generatedWallpapers: [],
      addGeneratedWallpaper: (wp) =>
        set((state) => {
          // Avoid duplicate items in history
          const exists = state.generatedWallpapers.some((item) => item.id === wp.id || item.url === wp.url);
          if (exists) return {};
          return { generatedWallpapers: [wp, ...state.generatedWallpapers] };
        }),

      // Prompts
      promptHistory: [],
      addPromptToHistory: (prompt) =>
        set((state) => {
          const filtered = state.promptHistory.filter((p) => p !== prompt);
          return { promptHistory: [prompt, ...filtered].slice(0, 50) }; // limit to last 50 prompts
        }),
      clearPromptHistory: () => set({ promptHistory: [] }),
    }),
    {
      name: "dreamslates-storage",
      partialize: (state) => ({
        // Persist settings, favorites, collections, generated history, prompt history, apiKeys
        theme: state.theme,
        settings: state.settings,
        favorites: state.favorites,
        collections: state.collections,
        generatedWallpapers: state.generatedWallpapers,
        promptHistory: state.promptHistory,
        apiKeys: state.apiKeys,
      }),
    }
  )
);
