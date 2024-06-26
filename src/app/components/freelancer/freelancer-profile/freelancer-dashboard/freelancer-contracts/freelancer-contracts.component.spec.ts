import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerContractsComponent } from './freelancer-contracts.component';

describe('FreelancerContractsComponent', () => {
  let component: FreelancerContractsComponent;
  let fixture: ComponentFixture<FreelancerContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
