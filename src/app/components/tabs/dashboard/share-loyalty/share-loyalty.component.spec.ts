import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLoyaltyComponent } from './share-loyalty.component';

describe('ShareLoyaltyComponent', () => {
  let component: ShareLoyaltyComponent;
  let fixture: ComponentFixture<ShareLoyaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLoyaltyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
