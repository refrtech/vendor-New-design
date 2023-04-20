import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanthowitworksComponent } from './merchanthowitworks.component';

describe('MerchanthowitworksComponent', () => {
  let component: MerchanthowitworksComponent;
  let fixture: ComponentFixture<MerchanthowitworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchanthowitworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchanthowitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
