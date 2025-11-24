export type ParsedYield = {
  servingsMin: number | null;
  servingsMax?: number | null;
  unit?: string | null;
  raw: string;
};

export function parseYield(input: string): ParsedYield {
  const raw = input.trim();
  if (!raw) return { servingsMin: null, raw };

  const text = raw.toLowerCase().replace(/[–—]/g, "-");

  // 1) Ranges like "serves 2-3", "serves 2-3 people"
  let rangeMatch = text.match(/serves\s+(\d+)\s*-\s*(\d+)/);
  if (!rangeMatch) {
    rangeMatch = text.match(/for\s+(\d+)\s*-\s*(\d+)\s*(?:people|persons)?/);
  }
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    return { servingsMin: min, servingsMax: max, raw };
  }

  // 2) Single "serves 4" / "for 4 people"
  let singleMatch = text.match(/serves\s+(\d+)/);
  if (!singleMatch) {
    singleMatch = text.match(/for\s+(\d+)\s*(?:people|persons)?/);
  }
  if (singleMatch) {
    const min = parseInt(singleMatch[1], 10);
    return { servingsMin: min, raw };
  }

  // 3) "makes 24 cookies" / "makes about 12 pancakes"
  const makesMatch = text.match(/makes\s+(?:about\s+)?(\d+)\s+([a-z]+)/);
  if (makesMatch) {
    const qty = parseInt(makesMatch[1], 10);
    const unit = makesMatch[2];
    return { servingsMin: qty, unit, raw };
  }

  // Fallback: try to grab any number at all
  const numMatch = text.match(/(\d+)/);
  if (numMatch) {
    return { servingsMin: parseInt(numMatch[1], 10), raw };
  }

  return { servingsMin: null, raw };
}
