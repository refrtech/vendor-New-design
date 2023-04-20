import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTimingComponent } from './store-timing.component';

describe('StoreTimingComponent', () => {
  let component: StoreTimingComponent;
  let fixture: ComponentFixture<StoreTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
