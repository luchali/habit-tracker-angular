import { formatDate } from "./format-date";

export function calculateStreak(dates: string[]): number {
  if (!dates.length) {
    return 0;
  }

  const completedDates = new Set(dates);

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const todayString = formatDate(today);

  let currentDate = new Date(today);

  // If today doesnt completed, start calculate from yesterday
  if (!completedDates.has(todayString)) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  let streak = 0;

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
