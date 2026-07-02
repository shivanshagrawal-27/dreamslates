import { LegalLayout } from "@/components/legal-layout";

export default function DMCAPage() {
  return (
    <LegalLayout title="DMCA & Copyright Policy" lastUpdated="June 20, 2026">
      <p>
        Dreamslates respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act ("DMCA"), we will respond promptly to notices of alleged copyright infringement.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">1. Notice of Infringement (Takedown Claim)</h3>
      <p>
        If you are a copyright owner or an authorized agent and believe that content hosted on our Service infringes your copyright, you may submit a written DMCA notice to our designated copyright agent containing the following information:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-xs">
        <li>
          A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright interest.
        </li>
        <li>
          Identification of the copyrighted work claimed to have been infringed.
        </li>
        <li>
          Identification of the material that is claimed to be infringing and its location (e.g., specific image URL).
        </li>
        <li>
          Your contact information, including address, telephone number, and email.
        </li>
        <li>
          A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
        </li>
        <li>
          A statement, made under penalty of perjury, that the information in the notification is accurate and that you are authorized to act on behalf of the owner of the copyright.
        </li>
      </ul>

      <h3 className="text-base font-bold text-foreground mt-6">2. Submission Channel</h3>
      <p>
        Please send completed DMCA notices directly to our designated email:
      </p>
      <p className="font-mono text-indigo-500 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded-lg inline-block text-xs">
        copyright@dreamslates.com
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        Or use our Contact form, selecting "Copyright Claim" as the category choice.
      </p>

      <h3 className="text-base font-bold text-foreground mt-6">3. Counter-Notification Process</h3>
      <p>
        If an image you generated or uploaded was removed due to a DMCA claim and you believe it was removed by mistake, you may file a counter-notice. Your counter-notice must contain your signature, contact details, identification of the removed file, and a statement consenting to the jurisdiction of the federal court. Upon receipt of a valid counter-notice, we may restore the removed material under DMCA guidelines.
      </p>
    </LegalLayout>
  );
}
