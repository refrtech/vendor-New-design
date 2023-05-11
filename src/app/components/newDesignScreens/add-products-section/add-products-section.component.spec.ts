import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsSectionComponent } from './add-products-section.component';

describe('AddProductsSectionComponent', () => {
  let component: AddProductsSectionComponent;
  let fixture: ComponentFixture<AddProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
