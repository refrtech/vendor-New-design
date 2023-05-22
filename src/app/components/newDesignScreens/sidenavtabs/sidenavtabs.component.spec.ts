import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavtabsComponent } from './sidenavtabs.component';

describe('SidenavtabsComponent', () => {
  let component: SidenavtabsComponent;
  let fixture: ComponentFixture<SidenavtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavtabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
