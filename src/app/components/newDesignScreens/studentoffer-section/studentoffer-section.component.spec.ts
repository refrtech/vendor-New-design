import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentofferSectionComponent } from './studentoffer-section.component';

describe('StudentofferSectionComponent', () => {
  let component: StudentofferSectionComponent;
  let fixture: ComponentFixture<StudentofferSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentofferSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentofferSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
