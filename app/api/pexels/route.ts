import { NextRequest, NextResponse } from "next/server";
import { searchPexels, getCuratedPexels } from "@/lib/pexels";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("perPage") || "12", 10);

    let photos = [];
    if (query.trim()) {
      photos = await searchPexels(query, page, perPage);
    } else {
      photos = await getCuratedPexels(page, perPage);
    }

    return NextResponse.json({
      photos,
      page,
      perPage,
      source: "Pexels APIWrapper",
      attribution: "Photo provided by Pexels. Photographers own their respective works."
    });
  } catch (error) {
    console.error("Pexels Wrapper API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve images from secondary gallery." },
      { status: 500 }
    );
  }
}
