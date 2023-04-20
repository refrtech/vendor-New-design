import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrPlacedComponent } from './ordr-placed.component';

describe('OrdrPlacedComponent', () => {
  let component: OrdrPlacedComponent;
  let fixture: ComponentFixture<OrdrPlacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrPlacedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
