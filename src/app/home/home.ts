import { Component, signal } from '@angular/core';
import { HabitCard } from '../habit-card/habit-card';
import { Habit } from '../models/habit.model';

@Component({
  imports: [HabitCard],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly habits = signal<Habit[]>([
    {
      id: 1, 
      title: 'Drink water', 
      content: 'Take a sit, and enjoy', 
      createdAt: new Date()
    }, 
    {
      id: 2, 
      title: 'Take your pills', 
      content: 'At 3 pm, at 7pm', 
      createdAt: new Date()
    }, 
  ]);
}
