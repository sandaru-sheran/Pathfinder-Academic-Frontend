import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCourseManager } from './program-course-manager';

describe('ProgramCourseManager', () => {
  let component: ProgramCourseManager;
  let fixture: ComponentFixture<ProgramCourseManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramCourseManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramCourseManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
