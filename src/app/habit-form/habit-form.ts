import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-habit-form',
  styleUrl: './habit-form.scss',
  templateUrl: './habit-form.html',
})
export class HabitForm {
  habitCreated = output<{
    title: string;
    content: string;
  }>();

  createHabit( 
    titleInput: HTMLInputElement,
    contentInput: HTMLInputElement
  ) {
    if (!titleInput.value.trim()) {
      return;
    }

    this.habitCreated.emit({
      title: titleInput.value,
      content: contentInput.value,
    });

    titleInput.value = '';
    contentInput.value = '';
  }
}
