import { LegalLayout } from "@/components/legal-layout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="June 20, 2026">
      <p>
        This Cookie Policy explains how Dreamslates uses cookies and similar client-side storage technologies to improve your experience on our website.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. What Are Cookies and Local Storage?</h3>
      <p>
        Cookies are small text files placed on your device. Local storage (such as `localStorage`) is a browser feature that allows websites to save data directly in your browser client. Dreamslates primarily uses **local storage** rather than traditional server cookies to persist configuration and preferences.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">2. Why We Use Local Storage</h3>
      <p>
        We use local storage for the following essential purposes:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Preferences (Settings):</strong> To remember your selected aspect ratio, model engine, format choice (PNG/JPEG), and theme (Dark/Light mode).
        </li>
        <li>
          <strong>Favorites:</strong> To keep track of wallpapers you have favorited or added to custom collections.
        </li>
        <li>
          <strong>Chat Context:</strong> To maintain the conversational thread within the AI generator chatbot between sessions.
        </li>
        <li>
          <strong>Prompt History:</strong> To display your recent text entries for quick-replicate generation.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">3. Third-Party Analytics</h3>
      <p>
        We do not load invasive advertising trackers or cookies. We may use anonymous, privacy-focused analytics to compile aggregate metrics about platform performance and errors.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">4. How to Manage Cookies and Local Storage</h3>
      <p>
        You can block or delete cookies and site data by adjusting your browser settings. However, please note that blocking local storage will disable key features such as save-locally favorites, collections, and custom prompt histories, forcing them to reset on every page refresh.
      </p>
    </LegalLayout>
  );
}
