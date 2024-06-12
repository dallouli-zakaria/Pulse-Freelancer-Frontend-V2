import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientOfferComponent } from './view-client-offer.component';

describe('ViewClientOfferComponent', () => {
  let component: ViewClientOfferComponent;
  let fixture: ComponentFixture<ViewClientOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClientOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewClientOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
