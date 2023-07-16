import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresettingComponent } from './storesetting.component';

describe('StoresettingComponent', () => {
  let component: StoresettingComponent;
  let fixture: ComponentFixture<StoresettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
