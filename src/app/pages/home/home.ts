import { Component, signal, computed } from '@angular/core';
import { HabitCard } from '@components/habit-card/habit-card';
import { Habit } from '@models/habit.model';
import { HabitForm } from '@components/habit-form/habit-form';
import { calculateStreak } from '@utils/calculate-streak';
import { HabitStatistics } from '@components/habit-statistics/habit-statistics';
import { HabitActivity } from '@components/habit-activity/habit-activity';
import { SectionHeading } from '@app/components/section-heading/section-heading';
import { UiCard } from '@app/components/ui-card/ui-card';
import { ArchivedHabits } from '@app/components/archived-habits/archived-habits';
import { HeroSection } from '@app/components/hero-section/hero-section';

@Component({
  imports: [HabitCard, HabitForm, HabitStatistics, HabitActivity, SectionHeading, UiCard, ArchivedHabits, HeroSection],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly habits = signal<Habit[]>(this.loadHabits());
  protected readonly activeHabits = computed(() =>
    this.habits().filter(habit => !habit.archived)
  );
  protected readonly archivedHabits = computed(() =>
    this.habits().filter(habit => habit.archived === true)
  );

  protected readonly editingHabit = signal<Habit | null>(null);
  protected readonly editTitle = signal('');
  protected readonly editContent = signal('');

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

  openEditHabit(id: number): void {
    const habit = this.habits().find(habit => habit.id === id);

    if (!habit) {
      return;
    }

    this.editingHabit.set(habit);
    this.editTitle.set(habit.title);
    this.editContent.set(habit.content);
  }

  closeEditHabit(): void {
    this.editingHabit.set(null);
  }

  saveEditedHabit(): void {
    const habit = this.editingHabit();
    const title = this.editTitle().trim();
    const content = this.editContent().trim();

    if (!habit || !title) {
      return;
    }

    this.habits.update(habits =>
      habits.map(item =>
        item.id === habit.id
          ? {
              ...item,
              title,
              content,
            }
          : item
      )
    );

    this.saveHabits(this.habits());
    this.closeEditHabit();
  }

  archiveHabit(id: number): void {
    this.habits.update(habits =>
      habits.map(habit =>
        habit.id === id
          ? { ...habit, archived: true, archivedAt: new Date().toISOString(), }
          : habit
      )
    );

    this.saveHabits(this.habits());
  }

  restoreHabit(id: number): void {
    this.habits.update(habits =>
      habits.map(habit =>
        habit.id === id
          ? {
              ...habit,
              archived: false,
              archivedAt: undefined,
            }
          : habit
      )
    );

    this.saveHabits(this.habits());
  }
  
  protected readonly isAddModalOpen = signal(false);

  openAddModal(): void {
    this.isAddModalOpen.set(true);
  }

  closeAddModal(): void {
    this.isAddModalOpen.set(false);
  }

  onHabitCreated(data: { title: string; content: string }): void {
    this.addHabit(data);
    this.closeAddModal();
  }
}
