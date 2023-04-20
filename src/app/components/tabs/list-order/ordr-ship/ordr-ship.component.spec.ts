import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrShipComponent } from './ordr-ship.component';

describe('OrdrShipComponent', () => {
  let component: OrdrShipComponent;
  let fixture: ComponentFixture<OrdrShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
