import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentoffersComponent } from './studentoffers.component';

describe('StudentoffersComponent', () => {
  let component: StudentoffersComponent;
  let fixture: ComponentFixture<StudentoffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentoffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
