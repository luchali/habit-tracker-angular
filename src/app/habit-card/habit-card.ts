import { Component, input, output } from '@angular/core';
import { Habit } from '../models/habit.model';
import { FireStreak } from '../fire-streak/fire-streak';

@Component({
  imports: [FireStreak],
  selector: 'app-habit-card',
  styleUrl: './habit-card.scss',
  templateUrl: './habit-card.html',
})
export class HabitCard {
  habit = input.required<Habit>();
  toggleCompleted = output<number>();
  deleteHabit = output<number>();

  isCompletedToday(): boolean {
  const today = this.getToday();

  return this.habit().completedDates.includes(today);
}

private getToday(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
}
