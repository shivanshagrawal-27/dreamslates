import { HuggingFaceImageProvider } from "./huggingface";
import { OpenAIImageProvider } from "./openai";
import { GeminiImageProvider } from "./gemini";
import { StabilityImageProvider } from "./stability";
import { ReplicateImageProvider } from "./replicate";
import { ImageGenerationOptions, ImageProvider } from "./types";

const providers: ImageProvider[] = [
  new HuggingFaceImageProvider(), // Preferred free provider
  new OpenAIImageProvider(),
  new GeminiImageProvider(),
  new StabilityImageProvider(),
  new ReplicateImageProvider(),
];

function getEnvKeyForProvider(name: string): string | undefined {
  switch (name) {
    case "Hugging Face (FLUX.1)":
      return process.env.HUGGINGFACE_API_KEY;
    case "OpenAI DALL-E 3":
      return process.env.OPENAI_API_KEY;
    case "Gemini Imagen 3":
      return process.env.GEMINI_API_KEY;
    case "Stability AI":
      return process.env.STABILITY_API_KEY;
    case "Replicate FLUX.1":
      return process.env.REPLICATE_API_TOKEN;
    default:
      return undefined;
  }
}

export async function generateWallpaper(
  options: ImageGenerationOptions & { apiKeys?: Record<string, string> },
  preferredProvider?: string
): Promise<{ url: string; providerName: string }> {
  // 1. If user has a preference, try it first
  if (preferredProvider) {
    const selected = providers.find(p => p.name === preferredProvider);
    if (selected) {
      const apiKey = options.apiKeys?.[selected.name];
      const hasKey = selected.isEnabled(apiKey);
      if (hasKey) {
        try {
          const url = await selected.generateImage({ ...options, apiKey });
          return { url, providerName: selected.name };
        } catch (err: any) {
          console.error(`Preferred provider ${preferredProvider} failed:`, err);
          throw new Error(`Preferred provider ${preferredProvider} failed: ${err.message || err}`);
        }
      } else {
        throw new Error(`The selected provider "${preferredProvider}" is not connected. Please supply its API key.`);
      }
    }
  }

  // 2. Otherwise try active providers in order of priority (starting with Hugging Face)
  for (const provider of providers) {
    const apiKey = options.apiKeys?.[provider.name];
    if (provider.isEnabled(apiKey)) {
      try {
        const url = await provider.generateImage({ ...options, apiKey });
        return { url, providerName: provider.name };
      } catch (err) {
        console.error(`Provider ${provider.name} failed, trying next...`, err);
        // Continue to next provider
      }
    }
  }

  throw new Error("No active image generation API providers could be used. Please connect an AI provider and try again.");
}

export function getAvailableProviders(apiKeys?: Record<string, string>): string[] {
  return providers
    .filter(p => p.isEnabled(apiKeys?.[p.name]))
    .map(p => p.name);
}
