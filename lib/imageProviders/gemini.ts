import { ImageGenerationOptions, ImageProvider } from "./types";

export class GeminiImageProvider implements ImageProvider {
  name = "Gemini Imagen 3";

  isEnabled(customKey?: string): boolean {
    return !!(customKey || process.env.GEMINI_API_KEY);
  }

  async generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string> {
    const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }

    // Map aspect ratios to Gemini Imagen 3 supported aspect ratios
    let aspectRatio = "1:1";
    if (options.aspectRatio === "9:16") {
      aspectRatio = "9:16";
    } else if (options.aspectRatio === "16:9" || options.aspectRatio === "21:9") {
      aspectRatio = "16:9";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: options.prompt,
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: aspectRatio,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Gemini API returned status ${response.status}`
      );
    }

    const data = await response.json();
    if (!data.generatedImages || data.generatedImages.length === 0) {
      throw new Error("No image data returned from Gemini.");
    }

    const base64Image = data.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64Image}`;
  }
}
