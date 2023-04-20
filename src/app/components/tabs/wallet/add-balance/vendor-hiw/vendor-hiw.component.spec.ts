import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHIWComponent } from './vendor-hiw.component';

describe('VendorHIWComponent', () => {
  let component: VendorHIWComponent;
  let fixture: ComponentFixture<VendorHIWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorHIWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorHIWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
