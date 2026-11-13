import { Component, computed, input } from '@angular/core';
import { Habit } from '../models/habit.model';
import { formatDate } from '../../utils/format-date';

@Component({
  imports: [],
  selector: 'app-habit-statistics',
  styleUrl: './habit-statistics.scss',
  templateUrl: './habit-statistics.html',
})
export class HabitStatistics {
  habits = input.required<Habit[]>();
  maxStreak = input.required<number>();

  totalHabits = computed(() => this.habits().length);

  completedToday = computed(() => {
    const today = formatDate(new Date());

    return this.habits().filter(habit =>
      habit.completedDates.includes(today)
    ).length;
  });

  dailyProgress = computed(() => {
    const total = this.totalHabits();

    if (total === 0) {
      return 0;
    }

    return Math.round(
      (this.completedToday() / total) * 100
    );
  });
}
