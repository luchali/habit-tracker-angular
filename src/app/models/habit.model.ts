export type HabitFrequency = 'daily' | 'weekdays' | 'custom';

export type HabitIcon =
  | 'droplets'
  | 'dumbbell'
  | 'book-open'
  | 'moon';

export type HabitColor =
  | '#2861c4'
  | '#635bff'
  | '#047857'
  | '#dc2626';

export interface Habit {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    completedToday: boolean;
    completedDates: string[];
    archived?: boolean;
    archivedAt?: string;

    frequency?: HabitFrequency;
    customDays?: number[];
    icon?: HabitIcon;
    color?: HabitColor;
}
