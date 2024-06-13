import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCartComponent } from './offer-cart.component';

describe('OfferCartComponent', () => {
  let component: OfferCartComponent;
  let fixture: ComponentFixture<OfferCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
