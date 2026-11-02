export interface Habit {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    completedToday: boolean;
}
