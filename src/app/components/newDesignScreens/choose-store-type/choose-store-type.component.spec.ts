import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStoreTypeComponent } from './choose-store-type.component';

describe('ChooseStoreTypeComponent', () => {
  let component: ChooseStoreTypeComponent;
  let fixture: ComponentFixture<ChooseStoreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseStoreTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStoreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
