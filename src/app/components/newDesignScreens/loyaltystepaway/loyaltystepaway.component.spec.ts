import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltystepawayComponent } from './loyaltystepaway.component';

describe('LoyaltystepawayComponent', () => {
  let component: LoyaltystepawayComponent;
  let fixture: ComponentFixture<LoyaltystepawayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltystepawayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltystepawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
