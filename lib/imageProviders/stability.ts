import { ImageGenerationOptions, ImageProvider } from "./types";

export class StabilityImageProvider implements ImageProvider {
  name = "Stability AI";

  isEnabled(customKey?: string): boolean {
    return !!(customKey || process.env.STABILITY_API_KEY);
  }

  async generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string> {
    const apiKey = options.apiKey || process.env.STABILITY_API_KEY;
    if (!apiKey) {
      throw new Error("Stability AI API key is not configured.");
    }

    const formData = new FormData();
    formData.append("prompt", options.prompt);
    formData.append("output_format", "jpeg");
    formData.append("aspect_ratio", options.aspectRatio);

    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "image/*",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Stability AI API returned status ${response.status}: ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  }
}
