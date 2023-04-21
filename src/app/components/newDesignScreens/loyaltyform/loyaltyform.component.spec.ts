import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyformComponent } from './loyaltyform.component';

describe('LoyaltyformComponent', () => {
  let component: LoyaltyformComponent;
  let fixture: ComponentFixture<LoyaltyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
