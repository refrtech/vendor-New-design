import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundWalletComponent } from './fund-wallet.component';

describe('FundWalletComponent', () => {
  let component: FundWalletComponent;
  let fixture: ComponentFixture<FundWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
