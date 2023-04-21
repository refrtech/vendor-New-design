import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcConversionComponent } from './cpc-conversion.component';

describe('CpcConversionComponent', () => {
  let component: CpcConversionComponent;
  let fixture: ComponentFixture<CpcConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpcConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
