import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupbusinessComponent } from './setupbusiness.component';

describe('SetupbusinessComponent', () => {
  let component: SetupbusinessComponent;
  let fixture: ComponentFixture<SetupbusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupbusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
