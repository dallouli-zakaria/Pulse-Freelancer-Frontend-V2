import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerCartComponent } from './freelancer-cart.component';

describe('FreelancerCartComponent', () => {
  let component: FreelancerCartComponent;
  let fixture: ComponentFixture<FreelancerCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
