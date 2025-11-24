"use client";

import { useState } from "react";
import { Nav } from "../components/Nav";
import { normalizeSteps, NormalizedStep } from "../lib/normalizeSteps";

export default function StepNormalizerPage() {
  const [input, setInput] = useState("");

  const steps: NormalizedStep[] =
    input.trim().length > 0 ? normalizeSteps(input) : [];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <header className="w-full max-w-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipe Step Normalizer</h1>
        <Nav />
      </header>

      <div className="w-full max-w-xl space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`One step per line...\nPreheat oven to 180°C.\nMix flour and sugar in a bowl.`}
          className="w-full border rounded px-3 py-2 h-40"
        />

        {steps.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Normalized JSON</p>
            <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
              {JSON.stringify(steps, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
