import { ImageGenerationOptions, ImageProvider } from "./types";

export class HuggingFaceImageProvider implements ImageProvider {
  name = "Hugging Face (FLUX.1)";

  isEnabled(customKey?: string): boolean {
    return !!(customKey || process.env.HUGGINGFACE_API_KEY);
  }

  async generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string> {
    const apiKey = options.apiKey || process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error("Hugging Face API key is not configured.");
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Use-Cache": "false",
        },
        body: JSON.stringify({
          inputs: options.prompt,
          parameters: {
            seed: Math.floor(Math.random() * 1000000),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Hugging Face API returned status ${response.status}`
      );
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64Image}`;
  }
}
