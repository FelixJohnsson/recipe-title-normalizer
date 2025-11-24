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
