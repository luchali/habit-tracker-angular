import { Component, signal, computed } from '@angular/core';
import { HabitCard } from '../habit-card/habit-card';
import { Habit } from '../models/habit.model';
import { HabitForm } from '../habit-form/habit-form';
import { calculateStreak } from '../../utils/calculate-streak';

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
      completedDates: [],
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
      completedDates: habit.completedDates ?? [],
    }));
  }

  private getToday(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  toggleHabit(id: number) {
    const today = this.getToday();
    
    this.habits.update(habits =>
      habits.map(habit => {
        if (habit.id !== id) {
          return habit;
        }

        const isCompletedToday =
          habit.completedDates.includes(today);

        return {
          ...habit,

          completedDates: isCompletedToday
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today],
        };
      })
    );

    this.saveHabits(this.habits());
  }

  maxStreak = computed(() => {
  const habits = this.habits();

  if (!habits.length) {
    return 0;
  }

  const streaks = habits.map(habit =>
    calculateStreak(habit.completedDates)
  );

  return Math.max(...streaks);
});

  deleteHabit(id: number) {
    const confirmed = confirm(  'Are you sure you want to delete this habit? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    this.habits.update(habits =>
      habits.filter(habit => habit.id !== id)
    );

    this.saveHabits(this.habits());
  }
}
