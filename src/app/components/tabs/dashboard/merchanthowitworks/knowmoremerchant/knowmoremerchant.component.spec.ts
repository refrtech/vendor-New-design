import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowmoremerchantComponent } from './knowmoremerchant.component';

describe('KnowmoremerchantComponent', () => {
  let component: KnowmoremerchantComponent;
  let fixture: ComponentFixture<KnowmoremerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowmoremerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowmoremerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
