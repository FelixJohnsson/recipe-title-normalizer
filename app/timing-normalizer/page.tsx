"use client";

import { useState } from "react";
import { Nav } from "../components/Nav";
import { parseTimings } from "../lib/parseTimings";

export default function TimingNormalizerPage() {
  const [input, setInput] = useState("");

  const parsed = input.trim() ? parseTimings(input) : [];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <header className="w-full max-w-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipe Timing Extractor</h1>
        <Nav />
      </header>

      <div className="w-full max-w-xl space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Simmer for 12–15 minutes.\nBake for 1 hour and 20 minutes.\nRest for about 5 mins.`}
          className="w-full border rounded px-3 py-2 h-40"
        />

        {parsed.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Extracted Timings</p>
            <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
