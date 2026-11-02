import { Component, input, output } from '@angular/core';
import { Habit } from '../models/habit.model';

@Component({
  imports: [],
  selector: 'app-habit-card',
  styleUrl: './habit-card.scss',
  templateUrl: './habit-card.html',
})
export class HabitCard {
  habit = input.required<Habit>();
  toggleCompleted = output<number>();
  deleteHabit = output<number>();
  
}
