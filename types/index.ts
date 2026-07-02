export interface Wallpaper {
  id: string; // unique ID
  url: string; // image source URL
  aspectRatio: "9:16" | "16:9" | "1:1" | "21:9";
  prompt?: string; // prompt if AI generated
  provider?: string; // provider name if AI generated
  isAI: boolean; // true if AI generated, false if Pexels
  photographer?: string; // photographer credit if Pexels
  photographerUrl?: string; // photographer link if Pexels
  title?: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  image?: Wallpaper; // if generation response
  isGenerating?: boolean; // loading state
  error?: string; // error message if any
  options?: {
    aspectRatio: "9:16" | "16:9" | "1:1" | "21:9";
    quality: "standard" | "hd";
    provider?: string;
  };
  safety?: {
    flagged: boolean;
    reason?: string;
    safetyScore: number;
    scores: {
      violence: number;
      nsfw: number;
      hateSpeech: number;
      bias: number;
      deepfake: number;
      misinformation: number;
    };
  };
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  wallpaperIds: string[]; // references Wallpaper.id
  createdAt: number;
}
