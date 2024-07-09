import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDeleteComponent } from './offer-delete.component';

describe('OfferDeleteComponent', () => {
  let component: OfferDeleteComponent;
  let fixture: ComponentFixture<OfferDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
