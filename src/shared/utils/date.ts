export function getWeekRange(date: Date) {
  const start = new Date(date);

  const offset = (start.getDay() + 1) % 7;

  start.setDate(start.getDate() - offset);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);

  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
  };
}

