import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailydropsSectionComponent } from './dailydrops-section.component';

describe('DailydropsSectionComponent', () => {
  let component: DailydropsSectionComponent;
  let fixture: ComponentFixture<DailydropsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailydropsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailydropsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
