import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { provider, apiKey } = await req.json();

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: "Provider and API Key are required." },
        { status: 400 }
      );
    }

    let isValid = false;
    let errorMessage = "";

    switch (provider) {
      case "Hugging Face (FLUX.1)":
        try {
          const res = await fetch("https://huggingface.co/api/whoami-v2", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          if (res.ok) {
            isValid = true;
          } else {
            const data = await res.json().catch(() => ({}));
            errorMessage = data.error || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          errorMessage = e.message || "Failed to contact Hugging Face API";
        }
        break;

      case "OpenAI DALL-E 3":
        try {
          const res = await fetch("https://api.openai.com/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          if (res.ok) {
            isValid = true;
          } else {
            const data = await res.json().catch(() => ({}));
            errorMessage = data.error?.message || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          errorMessage = e.message || "Failed to contact OpenAI API";
        }
        break;

      case "Gemini Imagen 3":
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
          );
          if (res.ok) {
            isValid = true;
          } else {
            const data = await res.json().catch(() => ({}));
            errorMessage = data.error?.message || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          errorMessage = e.message || "Failed to contact Gemini API";
        }
        break;

      case "Stability AI":
        try {
          const res = await fetch("https://api.stability.ai/v1/user/account", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          if (res.ok) {
            isValid = true;
          } else {
            const data = await res.json().catch(() => ({}));
            errorMessage = data.errors?.[0]?.message || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          errorMessage = e.message || "Failed to contact Stability AI API";
        }
        break;

      case "Replicate FLUX.1":
        try {
          const res = await fetch("https://api.replicate.com/v1/collections/featured", {
            headers: { Authorization: `Token ${apiKey}` },
          });
          if (res.ok) {
            isValid = true;
          } else {
            const data = await res.json().catch(() => ({}));
            errorMessage = data.detail || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          errorMessage = e.message || "Failed to contact Replicate API";
        }
        break;

      default:
        errorMessage = "Unknown provider.";
    }

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: errorMessage || "Invalid API key or token." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Test connection route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in connection check." },
      { status: 500 }
    );
  }
}
