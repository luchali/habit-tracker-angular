import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Note } from './models/note.model';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Home } from './home/home';

@Component({
  imports: [Header, Footer, Home],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly notes = signal<Note[]>([
    {
      id: 1, 
      title: 'Drink water', 
      content: 'Take a sit, and enjoy', 
      createdAt: new Date()
    }, 
    {
      id: 2, 
      title: 'Take your pills', 
      content: 'At 3 pm, at 7pm', 
      createdAt: new Date()
    }, 
  ]);

}
