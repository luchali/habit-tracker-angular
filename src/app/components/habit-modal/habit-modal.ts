import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { Habit } from '@models/habit.model';

export interface HabitFormData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-habit-modal',
  templateUrl: './habit-modal.html',
  styleUrl: './habit-modal.scss',
})
export class HabitModal implements OnInit, AfterViewInit {
  habit = input<Habit | null>(null);

  saved = output<HabitFormData>();
  closed = output<void>();

  title = signal('');
  content = signal('');

  isEditing = computed(() => this.habit() !== null);

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngOnInit(): void {
    const habit = this.habit();

    this.title.set(habit?.title ?? '');
    this.content.set(habit?.content ?? '');
  }

  ngAfterViewInit(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  onClosed(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog().nativeElement;

    if (event.target !== dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();

    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      this.close();
    }
  }

  submit(event: SubmitEvent): void {
    event.preventDefault();

    const title = this.title().trim();
    const content = this.content().trim();

    if (!title) {
      return;
    }

    this.saved.emit({ title, content });
  }
}