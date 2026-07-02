"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatGenerator } from "@/components/chat-generator";

function GeneratorInner() {
  const searchParams = useSearchParams();
  const seedPrompt = searchParams.get("q") ?? undefined;
  return <ChatGenerator seedPrompt={seedPrompt} />;
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratorInner />
    </Suspense>
  );
}
