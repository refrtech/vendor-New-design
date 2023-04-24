import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsfieldsComponent } from './documentsfields.component';

describe('DocumentsfieldsComponent', () => {
  let component: DocumentsfieldsComponent;
  let fixture: ComponentFixture<DocumentsfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsfieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
