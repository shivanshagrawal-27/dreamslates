import { LegalLayout } from "@/components/legal-layout";

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="June 20, 2026">
      <p>
        The information and services provided by Dreamslates are for general informational, creative, and entertainment purposes only.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. AI-Generated Outputs</h3>
      <p>
        Images generated on this platform are created using artificial intelligence algorithms (neural networks) trained on vast datasets. Dreamslates has no control over the exact pixel distribution, composition, or resemblance of generated outputs. We make no guarantees that generated images will be unique, non-offensive, or free from unintended similarities to copyrighted designs, trademarks, or real-life entities.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">2. Third-Party Image Curation (Pexels)</h3>
      <p>
        Dreamslates displays a curated list of stock photographs inside its secondary "Inspiration Gallery." These reference images are hosted and delivered via the Pexels API.
      </p>
      <p className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-border text-xs text-muted-foreground">
        <strong>Attribution:</strong> Dreamslates does not claim ownership or hold intellectual property rights over any Pexels photographs. All rights belong to their respective creators under the Pexels License. Credit metadata and linkbacks are provided automatically on download.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">3. Professional Liability</h3>
      <p>
        Under no circumstances shall Dreamslates, its founders, or operators be held liable for legal disputes, copyright claims, loss of profits, or damages resulting from your use of AI-generated wallpapers or references sourced from our website. You assume full legal responsibility for any redistribution, commercialization, or public sharing of generated assets.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">4. Safety Filters and Moderation</h3>
      <p>
        While we implement strict automated moderation filters to prevent illegal, explicit, or copyright-infringing content, we cannot guarantee 100% filter coverage. Users are requested to use the tool responsibly and report any accidental policy-violating generations to our support team.
      </p>
    </LegalLayout>
  );
}
