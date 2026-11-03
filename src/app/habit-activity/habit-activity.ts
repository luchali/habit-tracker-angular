import { Component, computed, input } from '@angular/core';
import { Habit } from '../models/habit.model';

@Component({
  imports: [],
  selector: 'app-habit-activity',
  styleUrl: './habit-activity.scss',
  templateUrl: './habit-activity.html',
})
export class HabitActivity {
  habits = input.required<Habit[]>();

  days = this.getLast7Days();

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private getLast7Days() {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - i);

      days.push({
        date: this.formatDate(date),
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
    const createdAt = new Date(habit.createdAt);

    return this.formatDate(createdAt) <= date;
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
