import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FireStreak } from './fire-streak';

describe('FireStreak', () => {
  let component: FireStreak;
  let fixture: ComponentFixture<FireStreak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireStreak],
    }).compileComponents();

    fixture = TestBed.createComponent(FireStreak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
