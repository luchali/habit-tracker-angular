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

import { Habit, HabitColor, HabitFrequency, HabitIcon } from '@models/habit.model';

export interface HabitFormData {
  title: string;
  content: string;
  frequency: HabitFrequency;
  customDays: number[];
  icon: HabitIcon;
  color: HabitColor;
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

  frequency = signal<HabitFrequency>('daily');

customDays = signal<number[]>([]);

selectedIcon = signal<HabitIcon>('droplets');

selectedColor = signal<HabitColor>('#2861c4');

readonly weekdays = [
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 0 },
];

readonly icons: { value: HabitIcon; symbol: string }[] = [
  { value: 'droplets', symbol: '💧' },
  { value: 'dumbbell', symbol: '🏋️' },
  { value: 'book-open', symbol: '📖' },
  { value: 'moon', symbol: '🌙' },
];

readonly colors: HabitColor[] = [
  '#2861c4',
  '#635bff',
  '#047857',
  '#dc2626',
];

  isEditing = computed(() => this.habit() !== null);

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngOnInit(): void {
    const habit = this.habit();

    this.title.set(habit?.title ?? '');
    this.content.set(habit?.content ?? '');

    this.frequency.set(habit?.frequency ?? 'daily');
    this.customDays.set([...(habit?.customDays ?? [])]);

    this.selectedIcon.set(habit?.icon ?? 'droplets');
    this.selectedColor.set(habit?.color ?? '#2861c4');
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

  toggleCustomDay(day: number): void {
  this.customDays.update(days =>
    days.includes(day)
      ? days.filter(item => item !== day)
      : [...days, day]
  );
}

  submit(event: SubmitEvent): void {
  event.preventDefault();

  const title = this.title().trim();
  const content = this.content().trim();

  if (!title) {
    return;
  }

  if (
    this.frequency() === 'custom' &&
    this.customDays().length === 0
  ) {
    return;
  }

  this.saved.emit({
    title,
    content,
    frequency: this.frequency(),
    customDays:
      this.frequency() === 'custom'
        ? this.customDays()
        : [],
    icon: this.selectedIcon(),
    color: this.selectedColor(),
  });
}
}