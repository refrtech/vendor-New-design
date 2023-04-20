import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationCPCComponent } from './recommendation-cpc.component';

describe('RecommendationCPCComponent', () => {
  let component: RecommendationCPCComponent;
  let fixture: ComponentFixture<RecommendationCPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationCPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationCPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
