import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoreComponent } from './new-store.component';

describe('NewStoreComponent', () => {
  let component: NewStoreComponent;
  let fixture: ComponentFixture<NewStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
