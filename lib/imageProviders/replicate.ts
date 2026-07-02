import { ImageGenerationOptions, ImageProvider } from "./types";

export class ReplicateImageProvider implements ImageProvider {
  name = "Replicate FLUX.1";

  isEnabled(customKey?: string): boolean {
    return !!(customKey || process.env.REPLICATE_API_TOKEN);
  }

  async generateImage(options: ImageGenerationOptions & { apiKey?: string }): Promise<string> {
    const apiToken = options.apiKey || process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      throw new Error("Replicate API token is not configured.");
    }

    // Map aspect ratios
    let aspectRatio = "1:1";
    if (["1:1", "16:9", "9:16", "21:9"].includes(options.aspectRatio)) {
      aspectRatio = options.aspectRatio;
    }

    // Using black-forest-labs/flux-schnell as it is extremely fast and high quality
    const modelVersion = "f20fd2341a1655da0f18833550b714f5296e85e2b177990ab410b2d35431728e";

    // 1. Create Prediction
    const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: modelVersion,
        input: {
          prompt: options.prompt,
          aspect_ratio: aspectRatio,
          output_format: "jpg",
          disable_safety_checker: false,
        },
      }),
    });

    if (!startResponse.ok) {
      const errorData = await startResponse.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Replicate API error: status ${startResponse.status}`
      );
    }

    const prediction = await startResponse.json();
    const pollUrl = prediction.urls.get || `https://api.replicate.com/v1/predictions/${prediction.id}`;

    // 2. Poll prediction status
    let status = prediction.status;
    let resultUrl = "";
    const startTime = Date.now();
    const timeout = 60000; // 60 seconds timeout

    while (status !== "succeeded" && status !== "failed" && status !== "canceled") {
      if (Date.now() - startTime > timeout) {
        throw new Error("Replicate generation timed out.");
      }

      // Wait 1.5 seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const pollResponse = await fetch(pollUrl, {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      });

      if (!pollResponse.ok) {
        throw new Error(`Replicate polling failed with status ${pollResponse.status}`);
      }

      const pollResult = await pollResponse.json();
      status = pollResult.status;

      if (status === "succeeded") {
        // Output can be a string or array of strings depending on the model
        const output = pollResult.output;
        if (Array.isArray(output) && output.length > 0) {
          resultUrl = output[0];
        } else if (typeof output === "string") {
          resultUrl = output;
        } else {
          throw new Error("Invalid output returned from Replicate.");
        }
      } else if (status === "failed") {
        throw new Error(`Replicate generation failed: ${pollResult.error || "unknown error"}`);
      } else if (status === "canceled") {
        throw new Error("Replicate generation was canceled.");
      }
    }

    if (!resultUrl) {
      throw new Error("Failed to retrieve image URL from Replicate.");
    }

    return resultUrl;
  }
}
