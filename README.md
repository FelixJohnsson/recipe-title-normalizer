# Recipe Title Normalizer

Tiny tool to clean up messy recipe titles.

- Paste any recipe title
- Get:
  - a cleaned, nicely capitalized title
  - a URL-safe slug

**Live demo:** https://recipe-title-normalizer.vercel.app/

## Usage

1. Open the live demo.
2. Paste something like:

   `best-ever   one-pot   chicken pasta!!! (so easy)`

3. Get:

   - Clean title: `Best Ever One Pot Chicken Pasta So Easy`
   - Slug: `best-ever-one-pot-chicken-pasta-so-easy`

Built with Next.js and Tailwind.

## Ingredient Quantity Normalizer

Parse messy ingredient lines into structured JSON.

Example input:

`2 ½ cups chopped onions (about 1 large onion)`

Output:

```json
{
  "quantity": 2.5,
  "unit": "cups",
  "ingredient": "chopped onions",
  "note": "about 1 large onion"
}
```

## Ingredient List Normalizer

Normalize a whole list of ingredients at once into structured JSON.

Example input:

2 ½ cups chopped onions (about 1 large onion)  
1 tbsp olive oil  
3 cloves garlic, minced

Example output:

```json
[
  {
    "quantity": 2.5,
    "unit": "cups",
    "ingredient": "chopped onions",
    "note": "about 1 large onion"
  },
  {
    "quantity": 1,
    "unit": "tbsp",
    "ingredient": "olive oil",
    "note": null
  },
  {
    "quantity": 3,
    "unit": "cloves",
    "ingredient": "garlic, minced",
    "note": null
  }
]
```

## Recipe Step Normalizer

Convert a multi-line list of recipe steps into clean, numbered JSON.

Example input:

Preheat oven to 180°C.
Mix flour and sugar in a bowl.

Output:

[
{ "step": 1, "text": "Preheat oven to 180°C." },
{ "step": 2, "text": "Mix flour and sugar in a bowl." }
]

## Recipe Timing Extractor

Extract all time durations from recipe text into structured minutes.

Example input:

Simmer for 12–15 minutes, stirring occasionally.  
Bake for 1 hour and 20 minutes.  
Rest for about 5 mins before serving.

Example output:

```json
[{ "minutes": 12, "minutes_max": 15 }, { "minutes": 80 }, { "minutes": 5 }]
```

## Recipe Yield Normalizer

Parse messy yield lines into structured servings.

Examples:

- "Serves 4" → `{ "servingsMin": 4 }`
- "Serves 2–3" → `{ "servingsMin": 2, "servingsMax": 3 }`
- "Makes 24 cookies" → `{ "servingsMin": 24, "unit": "cookies" }`
