import { Component, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Habit } from '@app/models/habit.model';

@Component({
  imports: [DatePipe],
  selector: 'app-archived-habits',
  styleUrl: './archived-habits.scss',
  templateUrl: './archived-habits.html',
})
export class ArchivedHabits {
  habits = input.required<Habit[]>();
  restoreHabit = output<number>();
  isExpanded = signal(true);
  deleteHabit = output<number>();

  toggleArchive(): void {
    this.isExpanded.update(value => !value);
  }

  onDeleteHabit(id: number): void {
    this.deleteHabit.emit(id);
  }

  onRestore(id: number): void {
    this.restoreHabit.emit(id);
  }
}
