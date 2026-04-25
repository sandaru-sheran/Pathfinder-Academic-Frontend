import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationInterface } from './allocation-interface';

describe('AllocationInterface', () => {
  let component: AllocationInterface;
  let fixture: ComponentFixture<AllocationInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationInterface],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
