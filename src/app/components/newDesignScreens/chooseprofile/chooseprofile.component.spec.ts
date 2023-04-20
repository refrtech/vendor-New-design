import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseprofileComponent } from './chooseprofile.component';

describe('ChooseprofileComponent', () => {
  let component: ChooseprofileComponent;
  let fixture: ComponentFixture<ChooseprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
