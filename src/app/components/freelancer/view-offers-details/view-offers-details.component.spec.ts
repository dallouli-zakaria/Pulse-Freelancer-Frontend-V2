import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffersDetailsComponent } from './view-offers-details.component';

describe('ViewOffersDetailsComponent', () => {
  let component: ViewOffersDetailsComponent;
  let fixture: ComponentFixture<ViewOffersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOffersDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOffersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
