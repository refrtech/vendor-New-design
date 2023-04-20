import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawBalanceComponent } from './draw-balance.component';

describe('DrawBalanceComponent', () => {
  let component: DrawBalanceComponent;
  let fixture: ComponentFixture<DrawBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
