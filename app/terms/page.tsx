import { LegalLayout } from "@/components/legal-layout";

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 20, 2026">
      <p>
        Welcome to Dreamslates ("we," "our," or "us"). By accessing or using our website, services, chatbot, or API tools (collectively, the "Service"), you agree to be bound by these Terms of Service. Please read them carefully.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. Acceptance of Terms</h3>
      <p>
        By using Dreamslates, you confirm that you accept these Terms of Service and agree to comply with them. If you do not agree, you must immediately discontinue using our Service.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">2. Dynamic AI-Generated Content</h3>
      <p>
        Dreamslates is primarily an artificial intelligence image generation platform. All wallpapers created via our chatbot interface are generated dynamically in real-time by third-party generative models.
      </p>
      <p className="bg-rose-500/10 dark:bg-rose-950/20 text-rose-500 p-4 rounded-xl border border-rose-500/10 text-xs">
        <strong>Risk Disclosure:</strong> You use Dreamslates entirely at your own risk. Generative AI outputs are probabilistic and may occasionally produce unpredictable, inaccurate, or offensive material despite our safety filters. Dreamslates does not guarantee the visual quality, accuracy, or suitability of generated images.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">3. Limitation of Liability</h3>
      <p>
        Dreamslates is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our Service. This includes, but is not limited to, damages arising from generated images that resemble copyrighted characters, trademarks, logos, real people, or other intellectual property, which may have been generated accidentally.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">4. Intellectual Property & Image Ownership</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>AI-Generated Images:</strong> You own the rights to the AI wallpapers you generate using the Service, subject to the terms and licensing guidelines of the underlying AI provider (e.g., OpenAI, Gemini, Stability AI, Replicate). We make no claims of ownership over your successfully generated outputs.
        </li>
        <li>
          <strong>Pexels Gallery Content:</strong> All stock photos displayed in our secondary Inspiration Gallery belong to their respective creators and are provided under the Pexels License. Dreamslates does not claim ownership or rights over Pexels images.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">5. Banned Prompts & Prohibited Use</h3>
      <p>
        You are strictly prohibited from submitting prompts intended to generate illegal, harmful, sexually explicit, hateful, or copyrighted content. This includes attempts to generate copyrighted characters (e.g., Disney, Pokemon, Marvel), brand logos (e.g., Apple, Nike, Coca-Cola), or likenesses of real-world celebrities. Violation of these guidelines will result in prompt blockages and potential termination of access.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">6. Changes to Terms</h3>
      <p>
        We reserve the right to modify these terms at any time. Your continued use of Dreamslates following any changes constitutes your agreement to the new Terms of Service.
      </p>
    </LegalLayout>
  );
}
