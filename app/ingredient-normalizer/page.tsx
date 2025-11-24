"use client";

import { useState } from "react";
import Link from "next/link";
import { parseIngredient } from "../lib/parseIngredient";

export default function IngredientNormalizerPage() {
  const [input, setInput] = useState("");
  const parsed = input ? parseIngredient(input) : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <header className="w-full max-w-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ingredient Quantity Normalizer</h1>
        <nav className="text-sm flex gap-3">
          <Link href="/" className="underline">
            Home
          </Link>
          <span className="font-semibold">Ingredient</span>
        </nav>
      </header>

      <div className="w-full max-w-xl space-y-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`e.g. "2 ½ cups chopped onions (about 1 large onion)"`}
          className="w-full border rounded px-3 py-2"
        />

        {parsed && (
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
