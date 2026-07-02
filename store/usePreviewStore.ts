import { create } from "zustand";
import { Wallpaper } from "@/types";

interface PreviewStore {
  activeWallpaper: Wallpaper | null;
  openPreview: (wallpaper: Wallpaper) => void;
  closePreview: () => void;
}

export const usePreviewStore = create<PreviewStore>((set) => ({
  activeWallpaper: null,
  openPreview: (wallpaper) => set({ activeWallpaper: wallpaper }),
  closePreview: () => set({ activeWallpaper: null }),
}));
