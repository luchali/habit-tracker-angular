import { Habit } from '@models/habit.model';

export function isHabitScheduled(
  habit: Habit,
  date: Date
): boolean {
  const day = date.getDay();

  switch (habit.frequency ?? 'daily') {
    case 'weekdays':
      return day >= 1 && day <= 5;

    case 'custom':
      return (habit.customDays ?? []).includes(day);

    default:
      return true;
  }
}