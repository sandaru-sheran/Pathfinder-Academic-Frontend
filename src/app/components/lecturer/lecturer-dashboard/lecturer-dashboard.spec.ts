import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerDashboard } from './lecturer-dashboard';

describe('LecturerDashboard', () => {
  let component: LecturerDashboard;
  let fixture: ComponentFixture<LecturerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
