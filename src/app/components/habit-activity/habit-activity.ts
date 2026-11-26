import { Component, computed, input } from '@angular/core';
import { Habit } from '@models/habit.model';
import { formatDate } from '@utils/format-date';
import { SectionHeading } from '../section-heading/section-heading';
import { isHabitScheduled } from '@utils/is-habit-scheduled';

@Component({
  imports: [SectionHeading],
  selector: 'app-habit-activity',
  styleUrl: './habit-activity.scss',
  templateUrl: './habit-activity.html',
})
export class HabitActivity {
  habits = input.required<Habit[]>();
   readonly today = formatDate(new Date());

  readonly days = this.getLast7Days();

  readonly weekLabel = this.getWeekLabel();

  readonly weeklyStats = computed(() => {
    let completed = 0;
    let total = 0;

    for (const habit of this.habits()) {
      for (const day of this.days) {
        if (!this.isAvailable(habit, day.date)) {
          continue;
        }

        total++;

        if (this.isCompleted(habit, day.date)) {
          completed++;
        }
      }
    }

    return { completed, total };
  });

  readonly weeklyEfficiency = computed(() => {
    const { completed, total } = this.weeklyStats();

    if (total === 0) {
      return 0;
    }

    return Math.round((completed / total) * 100);
  });

  readonly weeklyTarget = 70;

  readonly remainingToTarget = computed(() => {
    const { completed, total } = this.weeklyStats();

    if (total === 0) {
      return 0;
    }

    const required = Math.ceil(
      (total * this.weeklyTarget) / 100
    );

    return Math.max(0, required - completed);
  });

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

  private getWeekLabel(): string {
    const first = this.days[0];
    const last = this.days[this.days.length - 1];

    return `${first.label} ${first.dayNumber} — ${last.label} ${last.dayNumber}`;
  }

  isCompleted(habit: Habit, date: string): boolean {
    return habit.completedDates.includes(date);
  }

  isScheduled(habit: Habit, date: string): boolean {
    const day = new Date(`${date}T12:00:00`);

    return isHabitScheduled(habit, day);
  }

  isAvailable(habit: Habit, date: string): boolean {
    const createdAt = formatDate(new Date(habit.createdAt));

    if (date < createdAt) {
      return false;
    }

    if (habit.archived && habit.archivedAt) {
      const archivedAt = formatDate(new Date(habit.archivedAt));

      if (date > archivedAt) {
        return false;
      }
    }

    return this.isScheduled(habit, date);
  }

  getDayStatus(
    habit: Habit,
    date: string
  ): 'completed' | 'extra' | 'missed' | 'pending' | 'unavailable' {
    const completed = this.isCompleted(habit, date);
    const available = this.isAvailable(habit, date);

    if (completed) {
      return available ? 'completed' : 'extra';
    }

    if (!available) {
      return 'unavailable';
    }

    return date === this.today ? 'pending' : 'missed';
  }
  // today = formatDate(new Date());
  // days = this.getLast7Days();

  // private getLast7Days() {
  //   const days = [];

  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date();
  //     date.setHours(12, 0, 0, 0);
  //     date.setDate(date.getDate() - i);

  //     days.push({
  //       date: formatDate(date),
  //       label: date.toLocaleDateString('en', {
  //         weekday: 'short',
  //       }),
  //       dayNumber: date.getDate(),
  //     });
  //   }

  //   return days;
  // }

  // isCompleted(habit: Habit, date: string): boolean {
  //   return habit.completedDates.includes(date);
  // }

  // isAvailable(habit: Habit, date: string): boolean {
  //   const createdAt = formatDate(new Date(habit.createdAt));

  //   if (date < createdAt) {
  //     return false;
  //   }
  //   const scheduledDate = new Date(`${date}T12:00:00`);

  //   if (!isHabitScheduled(habit, scheduledDate)) {
  //     return false;
  //   }

  //   if (habit.archived && habit.archivedAt) {
  //     const archivedAt = formatDate(new Date(habit.archivedAt));

  //     return date <= archivedAt;
  //   }

  //   return true;
  // }

  // weeklyEfficiency = computed(() => {
  //   const habits = this.habits();

  //   let totalPossible = 0;
  //   let totalCompleted = 0;

  //   for (const habit of habits) {
  //     for (const day of this.days) {
  //       if (!this.isAvailable(habit, day.date)) {
  //         continue;
  //       }

  //       totalPossible++;

  //       if (this.isCompleted(habit, day.date)) {
  //         totalCompleted++;
  //       }
  //     }
  //   }

  //   if (totalPossible === 0) {
  //     return 0;
  //   }

  //   return Math.round(
  //     (totalCompleted / totalPossible) * 100
  //   );
  // });
}
