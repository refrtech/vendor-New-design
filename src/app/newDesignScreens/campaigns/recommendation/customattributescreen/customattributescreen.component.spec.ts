import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomattributescreenComponent } from './customattributescreen.component';

describe('CustomattributescreenComponent', () => {
  let component: CustomattributescreenComponent;
  let fixture: ComponentFixture<CustomattributescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomattributescreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomattributescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
