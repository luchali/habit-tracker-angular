import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitStatistics } from './habit-statistics';

describe('HabitStatistics', () => {
  let component: HabitStatistics;
  let fixture: ComponentFixture<HabitStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitStatistics],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
