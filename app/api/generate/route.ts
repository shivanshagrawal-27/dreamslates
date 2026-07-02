import { NextRequest, NextResponse } from "next/server";
import { moderatePrompt } from "@/lib/moderation";
import { generateWallpaper } from "@/lib/imageProviders";
import { enhanceUserPrompt } from "@/lib/promptEnhancer";

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio, quality, preferredProvider, styleMode, enhancePrompt, apiKeys } = await req.json();

    // 1. Input Validation
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    const validAspectRatios = ["9:16", "16:9", "1:1", "21:9"];
    if (!aspectRatio || !validAspectRatios.includes(aspectRatio)) {
      return NextResponse.json(
        { error: `Aspect ratio must be one of: ${validAspectRatios.join(", ")}` },
        { status: 400 }
      );
    }

    // 2. Safety Moderation Check
    const moderation = await moderatePrompt(prompt, apiKeys?.["OpenAI DALL-E 3"]);
    if (moderation.flagged) {
      return NextResponse.json({
        blocked: true,
        reason: moderation.reason || "Prompt violates safety policies.",
        safety: moderation
      });
    }

    // 3. Enhance Prompt if requested
    const { enhancedPrompt } = enhanceUserPrompt(prompt, styleMode || "None", !!enhancePrompt, preferredProvider);
    console.log(`[API Generate] Original Prompt: "${prompt}" | Enhanced Prompt: "${enhancedPrompt}"`);

    // 4. Generate Wallpaper
    const result = await generateWallpaper(
      {
        prompt: enhancedPrompt,
        aspectRatio,
        quality: quality || "standard",
        apiKeys,
      },
      preferredProvider
    );

    // 5. Return Output
    return NextResponse.json({
      url: result.url,
      providerName: result.providerName,
      aspectRatio,
      prompt: enhancedPrompt,
      safety: moderation,
      // For future-ready C2PA support and indicators
      isGeneratedAI: true,
      metadata: {
        createdWith: "Dreamslates AI Engine",
        licensing: "Subject to underlying generator terms.",
        c2paIndicator: "AI-generated image flag attached in headers."
      }
    });
  } catch (error: any) {
    console.error("API Generation Error:", error);
    
    // Provide user-friendly errors
    let status = 500;
    let message = "An error occurred during wallpaper generation. Please try again later.";

    if (error.message) {
      if (error.message.includes("API key")) {
        message = "Configuration issue: The AI model key is missing or invalid.";
        status = 502;
      } else if (error.message.includes("timed out")) {
        message = "The generation request timed out. The model took too long to respond.";
        status = 504;
      } else {
        message = error.message;
        status = 400;
      }
    }

    return NextResponse.json({ error: message }, { status });
  }
}
