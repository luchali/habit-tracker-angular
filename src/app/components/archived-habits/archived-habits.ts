import { Component, input, output } from '@angular/core';
import { Habit } from '@app/models/habit.model';

@Component({
  imports: [],
  selector: 'app-archived-habits',
  styleUrl: './archived-habits.scss',
  templateUrl: './archived-habits.html',
})
export class ArchivedHabits {
  habits = input.required<Habit[]>();
  restoreHabit = output<number>();
}
