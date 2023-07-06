import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsettingpageComponent } from './recommendationsettingpage.component';

describe('RecommendationsettingpageComponent', () => {
  let component: RecommendationsettingpageComponent;
  let fixture: ComponentFixture<RecommendationsettingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationsettingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsettingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
