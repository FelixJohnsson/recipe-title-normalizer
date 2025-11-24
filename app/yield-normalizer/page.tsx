"use client";

import { useState } from "react";
import { Nav } from "../components/Nav";
import { parseYield, ParsedYield } from "../lib/parseYield";

export default function YieldNormalizerPage() {
  const [input, setInput] = useState("");
  const parsed: ParsedYield | null = input.trim() ? parseYield(input) : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <header className="w-full max-w-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipe Yield Normalizer</h1>
        <Nav />
      </header>

      <div className="w-full max-w-xl space-y-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`e.g. "Serves 4–6" or "Makes 24 cookies"`}
          className="w-full border rounded px-3 py-2"
        />

        {parsed && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Parsed Yield</p>
            <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
