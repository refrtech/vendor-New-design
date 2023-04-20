import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupguideComponent } from './setupguide.component';

describe('SetupguideComponent', () => {
  let component: SetupguideComponent;
  let fixture: ComponentFixture<SetupguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
