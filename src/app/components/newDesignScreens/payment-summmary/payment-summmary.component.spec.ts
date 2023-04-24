import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummmaryComponent } from './payment-summmary.component';

describe('PaymentSummmaryComponent', () => {
  let component: PaymentSummmaryComponent;
  let fixture: ComponentFixture<PaymentSummmaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSummmaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSummmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
