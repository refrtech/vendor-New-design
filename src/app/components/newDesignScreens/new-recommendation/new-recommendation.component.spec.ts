import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecommendationComponent } from './new-recommendation.component';

describe('NewRecommendationComponent', () => {
  let component: NewRecommendationComponent;
  let fixture: ComponentFixture<NewRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
