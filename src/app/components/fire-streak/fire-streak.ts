import { Component, computed, input } from '@angular/core';
import { Habit } from '@models/habit.model';
import { calculateStreak } from '@utils/calculate-streak';


@Component({
  selector: 'app-fire-streak',
  imports: [],
  templateUrl: './fire-streak.html',
  styleUrl: './fire-streak.scss',
})
export class FireStreak {
  habit = input.required<Habit>();

  streak = computed(() =>
    calculateStreak(this.habit().completedDates)
  );
}
