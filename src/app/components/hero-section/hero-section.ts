import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hero-section',
  styleUrl: './hero-section.scss',
  templateUrl: './hero-section.html',
})
export class HeroSection {
  addClicked = output<void>();
}
