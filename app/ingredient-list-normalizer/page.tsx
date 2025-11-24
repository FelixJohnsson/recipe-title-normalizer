"use client";

import { useState } from "react";
import Link from "next/link";
import { parseIngredient, ParsedIngredient } from "../lib/parseIngredient";
import { Nav } from "../components/Nav";

export default function IngredientListNormalizerPage() {
  const [input, setInput] = useState("");

  const lines = input
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const parsed: ParsedIngredient[] = lines.map((line) => parseIngredient(line));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <header className="w-full max-w-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ingredient List Normalizer</h1>
        <Nav />
      </header>

      <div className="w-full max-w-xl space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`One ingredient per line...\n2 ½ cups chopped onions (about 1 large onion)\n1 tbsp olive oil`}
          className="w-full border rounded px-3 py-2 h-40"
        />

        {parsed.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Parsed JSON</p>
            <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
