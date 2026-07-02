import { NextRequest, NextResponse } from "next/server";
import { moderatePrompt } from "@/lib/moderation";

export async function POST(req: NextRequest) {
  try {
    const { prompt, openaiApiKey } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    const moderation = await moderatePrompt(prompt, openaiApiKey);

    return NextResponse.json(moderation);
  } catch (error) {
    console.error("Moderation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in moderation check." },
      { status: 500 }
    );
  }
}
