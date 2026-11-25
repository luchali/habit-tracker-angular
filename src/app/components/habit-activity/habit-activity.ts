import { Component, computed, input } from '@angular/core';
import { Habit } from '@models/habit.model';
import { formatDate } from '@utils/format-date';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  imports: [SectionHeading],
  selector: 'app-habit-activity',
  styleUrl: './habit-activity.scss',
  templateUrl: './habit-activity.html',
})
export class HabitActivity {
  habits = input.required<Habit[]>();
  
  today = formatDate(new Date());
  days = this.getLast7Days();

  private getLast7Days() {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - i);

      days.push({
        date: formatDate(date),
        label: date.toLocaleDateString('en', {
          weekday: 'short',
        }),
        dayNumber: date.getDate(),
      });
    }

    return days;
  }

  isCompleted(habit: Habit, date: string): boolean {
    return habit.completedDates.includes(date);
  }

  isAvailable(habit: Habit, date: string): boolean {
    const createdAt = formatDate(new Date(habit.createdAt));

  if (date < createdAt) {
    return false;
  }

  if (habit.archived && habit.archivedAt) {
    const archivedAt = formatDate(new Date(habit.archivedAt));

    return date <= archivedAt;
  }

  return true;
  }

  weeklyEfficiency = computed(() => {
    const habits = this.habits();

    let totalPossible = 0;
    let totalCompleted = 0;

    for (const habit of habits) {
      for (const day of this.days) {
        if (!this.isAvailable(habit, day.date)) {
          continue;
        }

        totalPossible++;

        if (this.isCompleted(habit, day.date)) {
          totalCompleted++;
        }
      }
    }

    if (totalPossible === 0) {
      return 0;
    }

    return Math.round(
      (totalCompleted / totalPossible) * 100
    );
  });
}
