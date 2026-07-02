export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

const FALLBACK_WALLPAPERS: PexelsPhoto[] = [
  {
    id: 1,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-mountain-range-covered-in-snow-under-a-starry-sky-xG8IQUMYBPE",
    photographer: "Benjamin Voros",
    photographer_url: "https://unsplash.com/@vorosbenis711",
    src: {
      original: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=800",
      small: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=200"
    },
    alt: "Starry starry mountain night"
  },
  {
    id: 2,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-view-of-the-milky-way-from-a-cave-yZvKkd7sUXg",
    photographer: "Lucas Bieri",
    photographer_url: "https://unsplash.com/@luba",
    src: {
      original: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800",
      small: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=200"
    },
    alt: "Cosmic nebula cloud space"
  },
  {
    id: 3,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-red-sports-car-parked-in-front-of-a-garage-N95Vw56Qy28",
    photographer: "Campbell",
    photographer_url: "https://unsplash.com/@campbell3d",
    src: {
      original: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800",
      small: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200"
    },
    alt: "Cyberpunk sports car under neon reflections"
  },
  {
    id: 4,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-view-of-a-city-at-night-with-lots-of-neon-lights-77-Jm-61tJ0",
    photographer: "Sora Sagano",
    photographer_url: "https://unsplash.com/@sagano",
    src: {
      original: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800",
      small: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=200"
    },
    alt: "Tokyo Cyberpunk City Night Scene"
  },
  {
    id: 5,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/pink-and-purple-smoke-illustration-11gW1wR3X80",
    photographer: "Pawel Czerwinski",
    photographer_url: "https://unsplash.com/@pawel_czerwinski",
    src: {
      original: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800",
      small: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=200"
    },
    alt: "Premium Flowing Abstract Liquid Art"
  },
  {
    id: 6,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-view-of-a-mountain-range-under-a-starry-sky-lSgQX44-b0w",
    photographer: "Vincent Ledvina",
    photographer_url: "https://unsplash.com/@vincentledvina",
    src: {
      original: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800",
      small: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=200"
    },
    alt: "Aurora Borealis Northern Lights Green Sky"
  },
  {
    id: 7,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-very-tall-building-with-a-clock-on-top-of-it-8yqgH_W5Miw",
    photographer: "Kamil Kodera",
    photographer_url: "https://unsplash.com/@kamilkodera",
    src: {
      original: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=800",
      small: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=200"
    },
    alt: "Minimalist Architectural Line Shadow"
  },
  {
    id: 8,
    width: 1920,
    height: 1080,
    url: "https://unsplash.com/photos/a-glowing-neon-triangle-in-the-middle-of-a-dark-room-l45K32f5s0w",
    photographer: "Alexandre Debiève",
    photographer_url: "https://unsplash.com/@alexandre_debieve",
    src: {
      original: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2560",
      large2x: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920",
      large: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200",
      medium: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800",
      small: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400",
      portrait: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1080&h=1920&fit=crop",
      landscape: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920&h=1080&fit=crop",
      tiny: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=200"
    },
    alt: "Technological Digital HUD Neon Glowing Core"
  }
];

export async function searchPexels(query: string, page = 1, perPage = 12): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    // Return curated subset filtered by search term locally if key is missing
    const lowercaseQuery = query.toLowerCase();
    const filtered = FALLBACK_WALLPAPERS.filter(
      (photo) =>
        photo.alt.toLowerCase().includes(lowercaseQuery) ||
        photo.photographer.toLowerCase().includes(lowercaseQuery)
    );
    // If no match, return all wallpapers for preview
    return filtered.length > 0 ? filtered : FALLBACK_WALLPAPERS;
  }

  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: status ${response.status}`);
    }

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error("Error searching Pexels:", error);
    return FALLBACK_WALLPAPERS;
  }
}

export async function getCuratedPexels(page = 1, perPage = 12): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return FALLBACK_WALLPAPERS;
  }

  try {
    const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: status ${response.status}`);
    }

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error("Error fetching curated Pexels:", error);
    return FALLBACK_WALLPAPERS;
  }
}
