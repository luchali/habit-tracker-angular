import { Component, computed, input } from '@angular/core';
import { Habit } from '@models/habit.model';
import { formatDate } from '@utils/format-date';
import { SectionHeading } from '../section-heading/section-heading';
import { StatCard } from '../stat-card/stat-card';

@Component({
  imports: [SectionHeading, StatCard],
  selector: 'app-habit-statistics',
  styleUrl: './habit-statistics.scss',
  templateUrl: './habit-statistics.html',
})
export class HabitStatistics {
  habits = input.required<Habit[]>();
  maxStreak = input.required<number>();

  activeHabits = computed(() =>
  this.habits().filter(habit => !habit.archived)
);

archivedHabits = computed(() =>
  this.habits().filter(habit => habit.archived === true)
);

totalHabits = computed(() => this.habits().length);

activeCount = computed(() => this.activeHabits().length);

archivedCount = computed(() => this.archivedHabits().length);

totalDescription = computed(() =>
  `${this.activeCount()} Active · ${this.archivedCount()} Archived`
);

completedToday = computed(() => {
  const today = formatDate(new Date());

  return this.activeHabits().filter(habit =>
    habit.completedDates.includes(today)
  ).length;
});

dailyProgress = computed(() => {
  const total = this.activeCount();

  if (total === 0) {
    return 0;
  }

  return Math.round((this.completedToday() / total) * 100);
});

remainingHabits = computed(() =>
  this.activeCount() - this.completedToday()
);

completedLabel = computed(() =>
  `${this.completedToday()} / ${this.activeCount()}`
);

remainingLabel = computed(() => {
  const remaining = this.remainingHabits();

  if (this.activeCount() === 0) {
    return 'No active habits';
  }

  if (remaining === 0) {
    return 'All active habits completed!';
  }

  return `${remaining} habit${remaining === 1 ? '' : 's'} remaining`;
});
}
