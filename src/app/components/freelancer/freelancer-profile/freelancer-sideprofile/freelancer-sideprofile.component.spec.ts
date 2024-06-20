import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSideprofileComponent } from './freelancer-sideprofile.component';

describe('FreelancerSideprofileComponent', () => {
  let component: FreelancerSideprofileComponent;
  let fixture: ComponentFixture<FreelancerSideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerSideprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerSideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
