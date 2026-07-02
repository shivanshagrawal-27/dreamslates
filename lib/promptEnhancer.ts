// Dictionary of premium style prompt modifiers
export const STYLE_MODIFIERS: Record<string, string[]> = {
  Cyberpunk: [
    "cyberpunk aesthetic, neon-drenched streets, holographic advertisements, high-tech low-life, synthwave color palette, cybernetic details, futuristic city, reflections on wet pavement",
    "futuristic cyberpunk metropolis, glowing neon signage in violet and cyan, towering megastructures, flying vehicles, retro-future cyberpunk style, cinematic atmosphere",
    "cyberpunk street alleyway, dark concrete, glowing rain-slicked asphalt, neon light rim lighting, volumetric smog, cyberware details"
  ],
  Anime: [
    "gorgeous anime art style, vibrant watercolor clouds, sun rays breaking through golden hour sky, Makoto Shinkai aesthetic, highly detailed scenic visual",
    "retro 90s anime style, hand-drawn aesthetic, soft light, cozy room with a window overlooking a starry sky, detailed background scenery",
    "anime illustration, magical forest with glowing spirits, vibrant colors, fantasy landscape, fantasy anime key visual, Studio Ghibli inspired"
  ],
  Fantasy: [
    "ethereal fantasy landscape, floating castles, glowing waterfalls, giant ancient trees, mythical creature silhouettes, magical dust, dreamy atmospheric lighting",
    "dark fantasy dungeon cathedral, ancient ruins, glowing runes, dark wizard tower, gothic architecture, dramatic lighting, epic scale",
    "mystic crystal cave, glowing crystals reflecting turquoise and purple light, underground river, fantasy adventure setting, highly detailed"
  ],
  "Sci-Fi": [
    "futuristic sci-fi spacecraft interior, high-tech control panels, view of a distant ringed planet from a massive window, deep space exploration theme",
    "sleek sci-fi utopian city, clean white architecture, green vertical gardens, flying shuttles, high-tech solarpunk design, bright sunny day",
    "mysterious alien obelisk, desert planet, dual suns in the sky, sci-fi landscape, monolith casting long shadow, sand dunes"
  ],
  Dark: [
    "dark moody gothic landscape, low contrast, deep shadows, mist rising from a dark lake, skeletal trees, mysterious silhouette in fog",
    "minimalist dark obsidian structures, harsh shadow, dramatic dark ambient mood, low key lighting, mysterious architectural design",
    "dark noir city street under pouring rain, single streetlight casting long shadows, reflections on wet asphalt, black and white with a touch of deep amber"
  ],
  Minimal: [
    "minimalist aesthetic vector art, clean geometry, simple flat shapes, soothing pastel gradient background, mid-century modern design",
    "scandinavian minimal design, organic abstract shapes, neutral earth tones, clean space, elegant composition, calming layout",
    "minimalist line art landscape, single continuous line forming mountain peaks, subtle sun circle, beige and charcoal color scheme"
  ],
  Space: [
    "spiral galaxy, vibrant nebulae in magenta and sapphire blue, cosmic dust clouds, supermassive black hole event horizon, epic space background",
    "planetary rings rising over an alien moon surface, starry background with distant cosmos, deep space explorer vessel, astronomical painting",
    "cosmic storm, swirling gas clouds, glowing infant stars, deep space wallpaper, astrophysics visualization, stunning celestial colors"
  ],
  Nature: [
    "lush misty redwood forest, sunbeams piercing through tall pine trees, dew-covered ferns, mossy ground, hyper-detailed nature photography",
    "majestic snow-capped mountain peaks at sunrise, pristine alpine lake reflecting the pink sky, fresh crisp air, dramatic landscape",
    "tropical paradise beach, crystal clear turquoise water, palm trees framing a fiery orange sunset, pristine white sand, professional photography"
  ],
  Neon: [
    "vibrant neon abstract design, glowing light ribbons flowing through dark space, luminescent waves, high energy neon art",
    "glowing neon geometric shapes, retro-futuristic grid, 8k resolution, bright neon pink and green laser lines",
    "glowing neon jellyfish floating in deep dark ocean, bioluminescent trails, electric blue and hot pink light, stunning detail"
  ],
  Abstract: [
    "abstract fluid acrylic pouring art, swirling gold vein details, marble texture, turquoise and royal blue pigments blending smoothly",
    "dynamic 3D abstract geometric composition, floating metallic shapes, glassmorphism layers, soft shadow, modern digital art",
    "abstract canvas painting, bold texture strokes, warm color palette of terracotta, ochre, and cream, modern gallery piece"
  ],
  Dreamscape: [
    "surreal dreamscape landscape, stairs climbing into cloud gates, clocks melting in a sky of floating stars, Salvador Dali inspired surrealism",
    "magical dreamscape, floating glowing bubbles containing miniature worlds, velvet night sky, whimsical and peaceful mood",
    "surreal pastel dreamscape, pink ocean waves, lavender clouds, oversized glowing moon close to the horizon, celestial ladder"
  ],
  Cinematic: [
    "cinematic shot, dramatic atmosphere, cinematic lighting, shot on 35mm lens, depth of field, anamorphic lens flares, movie scene key art",
    "dramatic cinematic composition, high contrast shadows, volumetric dust particles, professional color grading, epic storytelling mood",
    "cinematic landscape, misty mountain trails, low sun casting long shadows, volumetric lighting, photorealistic atmosphere"
  ],
  "Ultra Realistic": [
    "hyperrealistic, ultra-realistic texture, octane render, 8k resolution, path traced, realistic shadows, intricate details, photorealistic materials",
    "extremely detailed photorealistic composition, natural lighting, sharp focus, raytraced reflection, professional photography standard",
    "ultra detailed closeup, realistic textures, macro lens details, natural highlights, perfect shadows, octane render 8k"
  ]
};

// Model-specific enhancement pools to tailor formatting
const FLUX_DESCRIPTORS = [
  "cinematic atmosphere, natural lighting, highly detailed textures, captured on 35mm film",
  "dramatic depth of field, candid high-fidelity composition, soft environmental glow",
  "rich atmospheric perspective, exquisite details, masterfully composed photography",
  "moody filmic color palette, volumetric light, photorealistic rendering, sharp details",
  "intricate details, soft side lighting, professional composition, award-winning aesthetics"
];

const SDXL_DESCRIPTORS = [
  "octane render, volumetric lighting, photorealistic 8k, highly detailed, dramatic shadows",
  "unreal engine 5 render, cinematic lighting, sharp focus, intricate detailing, raytracing",
  "masterpiece digital art, extremely detailed, depth of field, professional color grading",
  "epic cinematic illustration, ultra-realistic textures, vibrant hyper-detail, 8k resolution"
];

const DALLE_DESCRIPTORS = [
  "portrayed as a cinematic wide-angle shot with soft, dramatic side-lighting and a vivid color palette",
  "presented as a highly detailed professional digital art piece with rich texture highlights and clean depth",
  "depicted in a stunning, modern illustrative style with volumetric highlights and deep, detailed background design"
];

const IMAGEN_DESCRIPTORS = [
  "high fidelity photographic style, natural daylight casting soft shadows, realistic textures",
  "clean studio lighting, professional photography composition, high resolution details, ray-traced reflections",
  "exquisite color rendering, crisp focus, cinematic atmospheric lighting, lifelike textures"
];

// Scene expansion templates for short prompts
const SCENE_EXPANSIONS = [
  (s: string) => `A breathtaking cinematic scene of ${s}, set during golden hour with warm sunlight streaming through, casting long dramatic shadows across the composition`,
  (s: string) => `An ultra-detailed wide-angle capture of ${s}, bathed in soft natural light with a shallow depth of field and beautifully blurred bokeh background`,
  (s: string) => `A stunning high-resolution photograph of ${s}, framed with perfect composition, rich vivid colors, and atmospheric haze creating depth and emotion`,
  (s: string) => `A masterfully composed scene depicting ${s}, with dramatic volumetric lighting, intricate environmental details, and a captivating sense of scale`,
  (s: string) => `An award-winning professional shot of ${s}, featuring exquisite color grading, razor-sharp focus on the subject, and painterly background elements`,
  (s: string) => `A dreamlike portrayal of ${s}, with ethereal soft-focus highlights, rich tonal contrast, and an immersive atmosphere that draws the viewer in`,
  (s: string) => `A cinematic 35mm film still of ${s}, with anamorphic lens flare, natural grain, muted yet powerful color palette, and professional studio-quality lighting`,
  (s: string) => `A hyperrealistic depiction of ${s}, with meticulous attention to textures, lifelike lighting conditions, and a photojournalistic sense of authenticity`,
];

/**
 * Enhances a simple prompt into a premium AI prompt using style mode, generic/model-specific quality boosters.
 * Randomization is built-in to avoid repetitive results.
 */
export function enhanceUserPrompt(
  prompt: string,
  styleMode: string,
  enhance: boolean,
  provider?: string
): { enhancedPrompt: string; styleApplied: string } {
  if (!enhance && (!styleMode || styleMode === "None")) {
    return { enhancedPrompt: prompt, styleApplied: "None" };
  }

  let result = prompt.trim();

  // 1. Expand short/simple prompts into rich scene descriptions
  if (enhance && result.split(/\s+/).length <= 8) {
    const expIdx = Math.floor(Math.random() * SCENE_EXPANSIONS.length);
    result = SCENE_EXPANSIONS[expIdx](result);
  }

  // 2. Apply style modifier if configured
  if (styleMode && styleMode !== "None" && STYLE_MODIFIERS[styleMode]) {
    const modifiers = STYLE_MODIFIERS[styleMode];
    const randomIndex = Math.floor(Math.random() * modifiers.length);
    const modifier = modifiers[randomIndex];
    result = `${result}, ${modifier}`;
  }

  // 3. Apply dynamic, model-optimized enhancers to prevent repetitive outputs
  if (enhance) {
    const currentProvider = provider || "";
    let selectedEnhancer = "";

    if (currentProvider.includes("FLUX.1") || currentProvider.includes("Hugging Face")) {
      const idx = Math.floor(Math.random() * FLUX_DESCRIPTORS.length);
      selectedEnhancer = FLUX_DESCRIPTORS[idx];
      result = `${result}, ${selectedEnhancer}`;
    } else if (currentProvider.includes("Stability") || currentProvider.includes("SDXL")) {
      const idx = Math.floor(Math.random() * SDXL_DESCRIPTORS.length);
      selectedEnhancer = SDXL_DESCRIPTORS[idx];
      result = `${result}, ${selectedEnhancer}`;
    } else if (currentProvider.includes("OpenAI") || currentProvider.includes("DALL-E")) {
      const idx = Math.floor(Math.random() * DALLE_DESCRIPTORS.length);
      selectedEnhancer = DALLE_DESCRIPTORS[idx];
      result = `${result}, ${selectedEnhancer}`;
    } else if (currentProvider.includes("Gemini") || currentProvider.includes("Imagen")) {
      const idx = Math.floor(Math.random() * IMAGEN_DESCRIPTORS.length);
      selectedEnhancer = IMAGEN_DESCRIPTORS[idx];
      result = `${result}, ${selectedEnhancer}`;
    } else {
      // Fallback: Pick 3 random enhancers from a general pool
      const generalPool = [
        "cinematic lighting",
        "ultra detailed",
        "dramatic atmosphere",
        "realistic shadows",
        "volumetric lighting",
        "depth of field",
        "professional color grading",
        "8k resolution",
        "sharp focus",
        "masterpiece quality"
      ];
      const shuffled = [...generalPool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      result = `${result}, ${selected.join(", ")}`;
    }
  }

  return {
    enhancedPrompt: result,
    styleApplied: styleMode
  };
}
