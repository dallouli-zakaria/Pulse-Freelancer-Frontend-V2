import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerContractAddComponent } from './freelancer-contract-add.component';

describe('FreelancerContractAddComponent', () => {
  let component: FreelancerContractAddComponent;
  let fixture: ComponentFixture<FreelancerContractAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerContractAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerContractAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
