import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcMessagePreviewComponent } from './cpc-message-preview.component';

describe('CpcMessagePreviewComponent', () => {
  let component: CpcMessagePreviewComponent;
  let fixture: ComponentFixture<CpcMessagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpcMessagePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcMessagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
