import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrTrackComponent } from './ordr-track.component';

describe('OrdrTrackComponent', () => {
  let component: OrdrTrackComponent;
  let fixture: ComponentFixture<OrdrTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
