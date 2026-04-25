import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoster } from './class-roster';

describe('ClassRoster', () => {
  let component: ClassRoster;
  let fixture: ComponentFixture<ClassRoster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoster],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassRoster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
