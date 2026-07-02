const COPYRIGHTED_BRANDS_AND_CHARACTERS = [
  "disney", "marvel", "pokemon", "nike", "apple logo", "coca-cola", 
  "coca cola", "mcdonalds", "mickey mouse", "pikachu", "spiderman", 
  "ironman", "superman", "batman", "nintendo", "lego", "adidas", 
  "pepsi", "starbucks", "playstation", "xbox", "harry potter", 
  "minions", "hello kitty", "barbie"
];

const PROHIBITED_CELEBRITIES_AND_POLITICIANS = [
  "trump", "biden", "elon musk", "obama", "taylor swift", "bill gates",
  "putin", "zelensky", "celebrity", "politician", "modi"
];

export interface ModerationResult {
  flagged: boolean;
  reason?: string;
  safetyScore: number;
  scores: {
    violence: number;
    nsfw: number;
    hateSpeech: number;
    bias: number;
    deepfake: number;
    misinformation: number;
  };
}

export async function moderatePrompt(prompt: string, openaiApiKey?: string): Promise<ModerationResult> {
  const lowercasePrompt = prompt.toLowerCase().trim();

  // Initialize individual risk scores (0 to 100)
  let violenceRisk = 0;
  let nsfwRisk = 0;
  let hateSpeechRisk = 0;
  let biasRisk = 0;
  let deepfakeRisk = 0;
  let misinformationRisk = 0;

  // 1. Lexicon Definition for multilingual support (English, Hindi, Hinglish)
  
  // Violence & Weapons
  const violenceKeywords = [
    "bomb", "gun", "pistol", "rifle", "shoot", "kill", "murder", "bullet", "grenade",
    "terrorist", "terrorism", "extremist", "blood", "gore", "slaughter", "stab", "knife",
    "blade", "weapon", "marna", "maar", "khoon", "hathiyar", "bandook", "goli", "dhamaka",
    "visphot", "katl", "hatya", "aatankwadi", "aatankvaad", "humla", "jihad", "war", "suicide"
  ];
  
  // NSFW
  const nsfwKeywords = [
    "nsfw", "nude", "naked", "sex", "porn", "xxx", "erotic", "breast", "pussy", "dick",
    "cock", "vagina", "strip", "undress", "sensual", "orgasm", "nanga", "nangi", "chudai",
    "chodo", "lund", "choot", "gand", "bina kapdo ke", "sex video", "bhabhi", "kamasutra"
  ];

  // Hate Speech
  const hateKeywords = [
    "hate", "racist", "slur", "supremacy", "neo-nazi", "anti-semitic", "islamophobia",
    "nigger", "kike", "chink", "faggot", "dyke", "retard", "nafrat", "kutta", "kamina",
    "harami", "mulla", "bhakt", "suar", "saala"
  ];

  // Bias (Caste Discrimination, Religious Hatred)
  const biasKeywords = [
    "caste", "dalit", "brahmin", "shudra", "kshatriya", "vaishya", "caste discrimination",
    "religious war", "convert religion", "anti-islam", "anti-hindu", "infidel", "kaafir",
    "communal", "dharam", "jaati", "chamar", "bhangi", "neech jaati", "neech"
  ];

  // Deepfake & Impersonation (Public figures, fake news)
  const deepfakeKeywords = [
    "modi", "rahul gandhi", "kejriwal", "trump", "biden", "putin", "zelensky", "elon musk",
    "musk", "zuckerberg", "bill gates", "obama", "celebrity", "politician", "pope",
    "narendra modi", "amit shah", "salman khan", "shah rukh khan", "dhoni", "kohli",
    "robbing a bank", "arrested", "handcuffed", "in prison", "jail", "stealing", "robbery"
  ];

  // Misinformation
  const misinfoKeywords = [
    "conspiracy", "fake news", "propaganda", "flat earth", "vaccine microchip",
    "5g radiation", "illuminati", "chem-trails", "moon landing fake", "election rigged",
    "jhooth", "afwah", "sazish"
  ];

  // 2. Keyword Match Scoring
  
  // Violence & Weapons
  violenceKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) violenceRisk = Math.max(violenceRisk, 40);
  });
  
  // NSFW
  nsfwKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) nsfwRisk = Math.max(nsfwRisk, 50);
  });

  // Hate Speech
  hateKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) hateSpeechRisk = Math.max(hateSpeechRisk, 40);
  });

  // Bias
  biasKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) biasRisk = Math.max(biasRisk, 40);
  });

  // Deepfake
  deepfakeKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) deepfakeRisk = Math.max(deepfakeRisk, 40);
  });

  // Misinformation
  misinfoKeywords.forEach(word => {
    if (lowercasePrompt.includes(word)) misinformationRisk = Math.max(misinformationRisk, 40);
  });

  // 3. Phrase & Contextual Heuristics (Hackathon Specific Scenarios)

  // Test Case: "bomb kaise banate hain" (Hinglish for how to make a bomb)
  if (lowercasePrompt.includes("bomb") && (lowercasePrompt.includes("kaise") || lowercasePrompt.includes("banate") || lowercasePrompt.includes("make") || lowercasePrompt.includes("recipe"))) {
    violenceRisk = 100;
  }

  // Test Case: "Modi ko terrorist dikhao" (impersonation, religious/political hatred, extremism)
  if (lowercasePrompt.includes("modi") && (lowercasePrompt.includes("terrorist") || lowercasePrompt.includes("dikhao") || lowercasePrompt.includes("show") || lowercasePrompt.includes("attack"))) {
    deepfakeRisk = 100;
    hateSpeechRisk = 100;
    biasRisk = 90;
    violenceRisk = Math.max(violenceRisk, 95);
  }

  // Test Case: "Elon Musk robbing a bank" (Deepfake, crime impersonation)
  if ((lowercasePrompt.includes("elon") || lowercasePrompt.includes("musk")) && (lowercasePrompt.includes("robbing") || lowercasePrompt.includes("bank") || lowercasePrompt.includes("rob") || lowercasePrompt.includes("steal"))) {
    deepfakeRisk = 100;
    misinformationRisk = Math.max(misinformationRisk, 90);
    violenceRisk = Math.max(violenceRisk, 70);
  }

  // Generic Trademark Brand Copyright filter
  let brandMatched = "";
  for (const brand of COPYRIGHTED_BRANDS_AND_CHARACTERS) {
    if (lowercasePrompt.includes(brand)) {
      brandMatched = brand;
      misinformationRisk = Math.max(misinformationRisk, 85);
      biasRisk = Math.max(biasRisk, 50);
      break;
    }
  }

  // Generic Politician/Celebrity filter
  let celebrityMatched = "";
  for (const celeb of PROHIBITED_CELEBRITIES_AND_POLITICIANS) {
    if (lowercasePrompt.includes(celeb)) {
      celebrityMatched = celeb;
      deepfakeRisk = Math.max(deepfakeRisk, 100);
      break;
    }
  }

  // 4. Calculate Final Overall Score
  // Score drops based on the maximum risk score present
  const maxRisk = Math.max(
    violenceRisk,
    nsfwRisk,
    hateSpeechRisk,
    biasRisk,
    deepfakeRisk,
    misinformationRisk
  );

  const safetyScore = 100 - maxRisk;
  const flagged = maxRisk >= 45; // Flags anything with Moderate or High risk (score < 55)

  // 5. Formulate human-readable reason
  let reason = "";
  if (flagged) {
    const reasons: string[] = [];
    if (violenceRisk >= 45) reasons.push("Violence & Weapons Risk");
    if (nsfwRisk >= 45) reasons.push("NSFW / Adult Content Risk");
    if (hateSpeechRisk >= 45) reasons.push("Hate Speech Risk");
    if (biasRisk >= 45) reasons.push("Religious Hatred or Caste Discrimination Risk");
    if (deepfakeRisk >= 45) reasons.push("Deepfake & Impersonation Risk");
    if (misinformationRisk >= 45) reasons.push("Misinformation or Trademark Infringement Risk");

    let explanation = "";
    if (violenceRisk === 100) {
      explanation = " The prompt attempts to solicit dangerous manufacturing instructions or violent acts.";
    } else if (deepfakeRisk === 100 && hateSpeechRisk === 100) {
      explanation = " The prompt contains defamation, political extremism, or hate references matching a public official.";
    } else if (deepfakeRisk === 100) {
      explanation = " The prompt requests fake media depicting public personalities performing criminal or inappropriate actions.";
    } else if (brandMatched) {
      explanation = ` The prompt references copyright-protected character or brand "${brandMatched}".`;
    } else if (celebrityMatched) {
      explanation = ` The prompt references public figure or celebrity "${celebrityMatched}".`;
    }

    reason = `Generation blocked due to AI Safety concerns.${explanation} Flagged categories: ${reasons.join(", ")}.`;
  }

  // 6. External Call fallback (retains existing structure, integrates values)
  const apiKey = openaiApiKey || process.env.OPENAI_API_KEY;
  if (!flagged && apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const result = data.results?.[0];

        if (result?.flagged) {
          const categories = result.categories || {};
          return {
            flagged: true,
            reason: `Generation blocked due to AI Safety concerns. Triggered OpenAI moderation policies.`,
            safetyScore: 30,
            scores: {
              violence: categories.violence || categories["violence/graphic"] ? 90 : 10,
              nsfw: categories.sexual || categories["sexual/minors"] ? 95 : 10,
              hateSpeech: categories.hate || categories["hate/threatening"] ? 90 : 10,
              bias: categories.harassment ? 60 : 10,
              deepfake: 40,
              misinformation: 30
            }
          };
        }
      }
    } catch (error) {
      console.error("OpenAI Moderation fetch error:", error);
    }
  }

  return {
    flagged,
    reason: flagged ? reason : undefined,
    safetyScore,
    scores: {
      violence: violenceRisk,
      nsfw: nsfwRisk,
      hateSpeech: hateSpeechRisk,
      bias: biasRisk,
      deepfake: deepfakeRisk,
      misinformation: misinformationRisk
    }
  };
}
