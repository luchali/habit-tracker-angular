import { Habit } from '@models/habit.model';
import { formatDate } from '@utils/format-date';
import { isHabitScheduled } from './is-habit-scheduled';

export function calculateScheduledStreak(habit: Habit): number {
  const completed = new Set(habit.completedDates);
  const createdAt = formatDate(new Date(habit.createdAt));

  const date = new Date();
  date.setHours(12, 0, 0, 0);

  let streak = 0;
  let started = false;

  // Обмеження для захисту від надмірного циклу
  for (let i = 0; i < 3660; i++) {
    const key = formatDate(date);

    if (key < createdAt) {
      break;
    }

    if (isHabitScheduled(habit, date)) {
      if (completed.has(key)) {
        streak++;
        started = true;
      } else if (started) {
        break;
      } else {
        // Поточний запланований день ще можна виконати.
        // Перевіряємо попередній запланований день.
        started = true;
      }
    }

    date.setDate(date.getDate() - 1);
  }

  return streak;
}