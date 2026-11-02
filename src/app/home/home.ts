import { Component, signal } from '@angular/core';
import { HabitCard } from '../habit-card/habit-card';
import { Habit } from '../models/habit.model';
import { HabitForm } from '../habit-form/habit-form';

@Component({
  imports: [HabitCard, HabitForm],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly habits = signal<Habit[]>(this.loadHabits());

  addHabit(data: { title: string; content: string }) {
    const newHabit: Habit = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      createdAt: new Date(),
      completedToday: false,
    };

   this.habits.update(habits => {
      const updatedHabits = [
        ...habits,
        newHabit,
      ];

      localStorage.setItem(
        'habits',
        JSON.stringify(updatedHabits)
      );

      return updatedHabits;
    });
  }
  private saveHabits(habits: Habit[]) {
    localStorage.setItem(
      'habits',
      JSON.stringify(habits)
    );
  }

 private loadHabits(): Habit[] {
    const savedHabits = localStorage.getItem('habits');

    if (!savedHabits) {
      return [];
    }

    const parsedHabits = JSON.parse(savedHabits);

    return parsedHabits.map((habit: Habit) => ({
      ...habit,
      createdAt: new Date(habit.createdAt),
    }));
  }

  toggleHabit(id: number) {
  this.habits.update(habits =>
    habits.map(habit =>
      habit.id === id
        ? {
            ...habit,
            completedToday: !habit.completedToday,
          }
        : habit
    )
  );

  this.saveHabits(this.habits());
}
}
