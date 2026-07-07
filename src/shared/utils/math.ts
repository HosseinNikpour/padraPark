export function percentDiff(
  current: number,
  average: number
): number {
  if (average === 0) return 0;

  return Math.round(
    ((current - average) / average) * 100
  );
}