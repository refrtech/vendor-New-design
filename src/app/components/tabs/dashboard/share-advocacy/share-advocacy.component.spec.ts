import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAdvocacyComponent } from './share-advocacy.component';

describe('ShareAdvocacyComponent', () => {
  let component: ShareAdvocacyComponent;
  let fixture: ComponentFixture<ShareAdvocacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareAdvocacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareAdvocacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
