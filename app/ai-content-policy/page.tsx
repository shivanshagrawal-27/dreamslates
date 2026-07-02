import { LegalLayout } from "@/components/legal-layout";

export default function AIContentPolicyPage() {
  return (
    <LegalLayout title="AI Content Policy" lastUpdated="June 20, 2026">
      <p>
        Dreamslates is committed to fostering responsible AI generation. We enforce strict policies to ensure that generated synthetic media assets are safe, lawful, and respect third-party intellectual property.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. Prohibited Prompt Categories</h3>
      <p>
        All inputs processed by the Dreamslates AI generator chatbot are subject to automatic moderation checking. Prompts containing or promoting the following categories are strictly blocked:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>NSFW and Adult Content:</strong> Explicit sexual text, nudity, pornography, or sexually suggestive prompts.
        </li>
        <li>
          <strong>Violence and Gore:</strong> Extreme violence, blood, self-harm, weapons, terrorism, or war-related atrocities.
        </li>
        <li>
          <strong>Hate Speech and Extremism:</strong> Slurs, racism, discrimination, harassment, defamation, or promoting hate groups.
        </li>
        <li>
          <strong>Illegal Content:</strong> Promoting drug trafficking, theft, fraud, piracy, or other criminal activities.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">2. Intellectual Property and Copyright Safeguards</h3>
      <p>
        To protect brand trademarks and original artists, our moderation layer filters out prompts referencing:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Copyrighted Characters:</strong> Attempts to generate licensed characters (e.g., Disney's Mickey Mouse, Pokemon's Pikachu, Marvel's Iron Man).
        </li>
        <li>
          <strong>Protected Brand Logos:</strong> Generation of corporate logos (e.g., Nike Swoosh, Apple logo, Coca-Cola script).
        </li>
        <li>
          <strong>Celebrity Likenesses:</strong> Replicating real-world public figures, politicians, or celebrities (e.g., Elon Musk, Taylor Swift).
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">3. Synthetic Media Identification</h3>
      <p>
        In accordance with safety guidelines and preparing for standard C2PA metadata schemas, all images generated on Dreamslates:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Display a visible "AI Generated" watermark overlay unless toggled off by the user.
        </li>
        <li>
          Contain internal EXIF metadata headers marking the image as synthetic, AI-generated media.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">4. Reporting Abuse</h3>
      <p>
        If you find an image generated on Dreamslates that violates our content policies or represents unauthorized use of copyrighted works, please submit a report immediately on our Contact page or email us at support@dreamslates.com.
      </p>
    </LegalLayout>
  );
}
