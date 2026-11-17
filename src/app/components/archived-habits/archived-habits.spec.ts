import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivedHabits } from './archived-habits';

describe('ArchivedHabits', () => {
  let component: ArchivedHabits;
  let fixture: ComponentFixture<ArchivedHabits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedHabits],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivedHabits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
