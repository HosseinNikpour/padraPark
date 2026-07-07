export function sumBy<T>(
  items: T[],
  selector: (item: T) => number
): number {
  return items.reduce((sum, item) => sum + selector(item), 0);
}

export function averageBy<T>(
  items: T[],
  selector: (item: T) => number
): number {
  if (items.length === 0) return 0;

  return Math.round(sumBy(items, selector) / items.length);
}

export function maxBy<T>(
  items: T[],
  selector: (item: T) => number
): number {
  if (items.length === 0) return 0;

  return Math.max(...items.map(selector));
}

export function groupBy<T, K extends string | number>(
  items: T[],
  selector: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = selector(item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {} as Record<K, T[]>);
}