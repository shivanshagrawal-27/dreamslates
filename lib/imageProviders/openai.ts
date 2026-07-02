import { ImageGenerationOptions, ImageProvider } from "./types";

export class OpenAIImageProvider implements ImageProvider {
  name = "OpenAI DALL-E 3";

  isEnabled(customKey?: string): boolean {
    return !!(customKey || process.env.OPENAI_API_KEY);
  }

  async generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string> {
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is not configured.");
    }

    // Map aspect ratios to DALL-E 3 sizes
    let size = "1024x1024";
    if (options.aspectRatio === "9:16") {
      size = "1024x1792";
    } else if (options.aspectRatio === "16:9" || options.aspectRatio === "21:9") {
      size = "1792x1024"; // DALL-E 3 doesn't support 21:9 natively; we fall back to 16:9 and scale/crop
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: options.prompt,
        n: 1,
        size: size,
        quality: options.quality || "standard",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `OpenAI API returned status ${response.status}`
      );
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      throw new Error("No image data returned from OpenAI.");
    }

    return data.data[0].url;
  }
}
