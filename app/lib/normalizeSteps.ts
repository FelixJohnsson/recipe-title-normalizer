export type NormalizedStep = {
  step: number;
  text: string;
};

export function normalizeSteps(input: string): NormalizedStep[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((text, index) => ({
      step: index + 1,
      text,
    }));
}
