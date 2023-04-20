import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBalanceComponent } from './plan-balance.component';

describe('PlanBalanceComponent', () => {
  let component: PlanBalanceComponent;
  let fixture: ComponentFixture<PlanBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
