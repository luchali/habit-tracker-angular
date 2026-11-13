import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitActivity } from './habit-activity';

describe('HabitActivity', () => {
  let component: HabitActivity;
  let fixture: ComponentFixture<HabitActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
