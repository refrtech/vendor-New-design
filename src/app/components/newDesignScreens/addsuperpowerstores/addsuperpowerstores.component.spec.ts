import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsuperpowerstoresComponent } from './addsuperpowerstores.component';

describe('AddsuperpowerstoresComponent', () => {
  let component: AddsuperpowerstoresComponent;
  let fixture: ComponentFixture<AddsuperpowerstoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsuperpowerstoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsuperpowerstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
