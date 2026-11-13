import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Header } from '@app/header/header';
import { Footer } from '@app/footer/footer';
import { Home } from '@pages/home/home';

@Component({
  imports: [Header, Footer, Home],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
