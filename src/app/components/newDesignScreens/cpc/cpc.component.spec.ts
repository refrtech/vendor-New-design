import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPCComponent } from './cpc.component';

describe('CPCComponent', () => {
  let component: CPCComponent;
  let fixture: ComponentFixture<CPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
