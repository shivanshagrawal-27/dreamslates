import { LegalLayout } from "@/components/legal-layout";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 20, 2026">
      <p>
        At Dreamslates, we value your privacy. This Privacy Policy explains how we collect, process, use, and protect your information when you interact with our platform.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. Information We Collect</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Prompts and Text Inputs:</strong> When you use our chatbot generator, the prompt text you type is sent to our server to undergo moderation checks and request image generation.
        </li>
        <li>
          <strong>Usage History:</strong> We store your prompt history, favorite wallpapers, and customized collections client-side in your browser's local storage. This data stays on your machine and is not stored in our databases.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">2. Cookies and Local Storage</h3>
      <p>
        We use local storage and cookies to save your settings preferences (e.g., preferred aspect ratio, model engine, format choices) and favorites lists. This ensures your data persists between page visits without needing a user account or external database. You can clear this data at any time by clearing your browser cache.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">3. Third-Party API Interactions</h3>
      <p>
        In order to fulfill your generation requests and support our gallery search, we communicate with the following services:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>OpenAI, Gemini, Stability AI, Replicate:</strong> Prompts are securely forwarded to these providers on the server-side to generate images.
        </li>
        <li>
          <strong>Pexels API:</strong> Gallery searches are wrapped server-side to fetch relevant reference photos.
        </li>
      </ul>
      <p>
        These service requests are handled server-to-server. None of your personal browser credentials or keys are exposed to third-party endpoints.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">4. Data Security</h3>
      <p>
        We employ industry-standard security protocols to protect communication between your browser and our servers. We never store or log generated outputs alongside private user details, nor do we track individuals across other external websites.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">5. Your Data Rights</h3>
      <p>
        Since all user records, history logs, and collections are saved locally in your own browser cache, you have complete control over your data. You can delete your prompt logs or favorites at any time using the "Clear Chat" and "Clear Storage" controls on our website, or by resetting site data in your browser settings.
      </p>
    </LegalLayout>
  );
}
