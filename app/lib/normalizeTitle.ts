export function normalizeTitle(input: string) {
  const title = input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return { title, slug };
}
