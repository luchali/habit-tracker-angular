import { Component, ElementRef, HostListener, inject, input, output, signal, viewChild } from '@angular/core';
import { Habit } from '@models/habit.model';
import { FireStreak } from '@components/fire-streak/fire-streak';
import { formatDate } from '@utils/format-date';

@Component({
  imports: [FireStreak],
  selector: 'app-habit-card',
  styleUrl: './habit-card.scss',
  templateUrl: './habit-card.html',
})
export class HabitCard {
  private elementRef = inject(ElementRef<HTMLElement>);
  habit = input.required<Habit>();

  toggleCompleted = output<number>();
  deleteHabit = output<number>();
  editHabit = output<number>();
  archiveHabit = output<number>();

  menuOpen = signal(false);
   menuWrapper =
    viewChild<ElementRef<HTMLElement>>('menuWrapper');

  @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
      const wrapper = this.menuWrapper()?.nativeElement;

      if (
        wrapper &&
        event.target instanceof Node &&
        !wrapper.contains(event.target)
      ) {
        this.menuOpen.set(false);
      }
    }

  @HostListener('document:keydown.escape')
    onEscape(): void {
      this.menuOpen.set(false);
    }

  isCompletedToday(): boolean {
  const today = this.getToday();

  return this.habit().completedDates.includes(today);
}

 toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onEditHabit(): void {
    this.editHabit.emit(this.habit().id);
    this.closeMenu();
  }

  onArchiveHabit(): void {
    this.archiveHabit.emit(this.habit().id);
    this.closeMenu();
  }

  onDeleteHabit(): void {
    this.deleteHabit.emit(this.habit().id);
    this.closeMenu();
  }

  private getToday(): string {
    return formatDate(new Date());
  }
}
