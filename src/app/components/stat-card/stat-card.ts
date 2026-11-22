import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-stat-card',
  styleUrl: './stat-card.scss',
  templateUrl: './stat-card.html',
})
export class StatCard {
  title = input.required<string>();
  value = input.required<string>();

  description = input<string>('');
  icon = input<string>('📊');

  progress = input<number | null>(null);
  variant = input<'primary' | 'success'>('primary');
}
