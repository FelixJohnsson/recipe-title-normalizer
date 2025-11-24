export type ParsedTiming = {
  minutes: number;
  minutes_max?: number;
};

function toMinutes(hours: number, minutes: number) {
  return hours * 60 + minutes;
}

export function parseTimings(input: string): ParsedTiming[] {
  let text = input.toLowerCase();
  const results: ParsedTiming[] = [];

  // 1) Ranges like “12–15 minutes”
  const rangeRegex = /(\d+)\s*[–-]\s*(\d+)\s*(?:minutes?|mins?)/g;
  text = text.replace(rangeRegex, (match, a, b) => {
    results.push({
      minutes: parseInt(a, 10),
      minutes_max: parseInt(b, 10),
    });
    return " "; // remove matched portion
  });

  // 2) Hour + minute “1 hour and 20 minutes”
  const hourMinuteRegex = /(\d+)\s*hours?\s*(?:and\s*)?(\d+)\s*minutes?/g;
  text = text.replace(hourMinuteRegex, (match, h, m) => {
    results.push({ minutes: toMinutes(parseInt(h, 10), parseInt(m, 10)) });
    return " ";
  });

  // 3) Hours only “bake for 2 hours”
  const hoursOnlyRegex = /(\d+)\s*hours?/g;
  text = text.replace(hoursOnlyRegex, (match, h) => {
    results.push({ minutes: parseInt(h, 10) * 60 });
    return " ";
  });

  // 4) Minutes only “rest for 5 minutes”
  const minutesOnlyRegex = /(\d+)\s*(?:minutes?|mins?)/g;
  text = text.replace(minutesOnlyRegex, (match, m) => {
    results.push({ minutes: parseInt(m, 10) });
    return " ";
  });

  return results;
}
