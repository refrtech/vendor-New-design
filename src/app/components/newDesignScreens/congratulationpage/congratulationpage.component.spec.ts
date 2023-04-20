import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationpageComponent } from './congratulationpage.component';

describe('CongratulationpageComponent', () => {
  let component: CongratulationpageComponent;
  let fixture: ComponentFixture<CongratulationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratulationpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
