import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerOffersComponent } from './freelancer-offers.component';

describe('FreelancerOffersComponent', () => {
  let component: FreelancerOffersComponent;
  let fixture: ComponentFixture<FreelancerOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
