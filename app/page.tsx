"use client";

import { useState } from "react";
import { normalizeTitle } from "./lib/normalizeTitle";
import { Nav } from "./components/Nav";

export default function Home() {
  const [input, setInput] = useState("");
  const result = input ? normalizeTitle(input) : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipe Title Normalizer</h1>
        <Nav />
      </header>

      <div className="w-full max-w-xl space-y-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-3 rounded w-full mb-1"
          placeholder="Paste any messy recipe title..."
        />

        {result && (
          <div className="w-full space-y-2">
            <div>
              <p className="text-sm font-medium">Clean Title</p>
              <p className="p-2 bg-gray-100 rounded">{result.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Slug</p>
              <p className="p-2 bg-gray-100 rounded">{result.slug}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
