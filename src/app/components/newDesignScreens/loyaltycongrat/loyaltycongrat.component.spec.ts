import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltycongratComponent } from './loyaltycongrat.component';

describe('LoyaltycongratComponent', () => {
  let component: LoyaltycongratComponent;
  let fixture: ComponentFixture<LoyaltycongratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltycongratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltycongratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
