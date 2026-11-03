export function calculateStreak(dates: string[]): number {
  if (!dates.length) {
    return 0;
  }

  const completedDates = new Set(dates);

  const today = new Date();
  const todayString = formatDate(today);

  if (!completedDates.has(todayString)) {
    return 0;
  }

  let streak = 0;
  const currentDate = new Date(today);

  while (true) {
    const dateString = formatDate(currentDate);

    if (!completedDates.has(dateString)) {
      break;
    }

    streak++;

    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}