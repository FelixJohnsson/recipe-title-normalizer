const FRACTION_MAP: Record<string, number> = {
  "½": 0.5,
  "⅓": 1 / 3,
  "¼": 0.25,
  "¾": 0.75,
  "⅔": 2 / 3,
  "⅛": 0.125,
};

function replaceUnicodeFractions(input: string): string {
  return input.replace(/[½⅓¼¾⅔⅛]/g, (m) => ` ${FRACTION_MAP[m].toString()}`);
}

function parseQuantity(raw: string): { quantity: number | null; rest: string } {
  // Convert Unicode fractions → ascii fractions
  const unicode = {
    "½": "1/2",
    "⅓": "1/3",
    "¼": "1/4",
    "¾": "3/4",
    "⅔": "2/3",
    "⅛": "1/8",
  } as Record<string, string>;

  const cleaned = raw.replace(/[½⅓¼¾⅔⅛]/g, (m) => unicode[m]).trim();

  // Examples matched:
  // 2 1/2
  // 1/2
  // 3
  const match = cleaned.match(/^(\d+(?:\s+\d+\/\d+)?|\d+\/\d+)(?=\s|$)/);

  if (!match) return { quantity: null, rest: cleaned };

  const qtyStr = match[1];

  let quantity = 0;

  if (qtyStr.includes("/")) {
    // Mixed number?
    const parts = qtyStr.split(" ");
    if (parts.length === 2) {
      const whole = parseInt(parts[0], 10);
      const [num, den] = parts[1].split("/").map(Number);
      quantity = whole + num / den;
    } else {
      const [num, den] = qtyStr.split("/").map(Number);
      quantity = num / den;
    }
  } else {
    quantity = parseInt(qtyStr, 10);
  }

  const rest = cleaned.slice(match[0].length).trim();
  return { quantity, rest };
}

export type ParsedIngredient = {
  quantity: number | null;
  unit: string | null;
  ingredient: string;
  note: string | null;
};

export function parseIngredient(input: string): ParsedIngredient {
  const trimmed = input.trim();
  if (!trimmed) {
    return { quantity: null, unit: null, ingredient: "", note: null };
  }

  const { quantity, rest } = parseQuantity(trimmed);

  const [unit, ...restTokens] = rest.split(/\s+/);
  const afterUnit = restTokens.join(" ").trim();

  let ingredient = afterUnit;
  let note: string | null = null;

  const parenStart = afterUnit.indexOf("(");
  const parenEnd = afterUnit.lastIndexOf(")");

  if (parenStart !== -1 && parenEnd !== -1 && parenEnd > parenStart) {
    ingredient = afterUnit.slice(0, parenStart).trim();
    note = afterUnit.slice(parenStart + 1, parenEnd).trim() || null;
  }

  return {
    quantity,
    unit: unit || null,
    ingredient,
    note,
  };
}
