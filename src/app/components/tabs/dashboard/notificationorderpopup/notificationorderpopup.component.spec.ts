import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationorderpopupComponent } from './notificationorderpopup.component';

describe('NotificationorderpopupComponent', () => {
  let component: NotificationorderpopupComponent;
  let fixture: ComponentFixture<NotificationorderpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationorderpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationorderpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
