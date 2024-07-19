import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerUpdateExperienceComponent } from './freelancer-update-experience.component';

describe('FreelancerUpdateExperienceComponent', () => {
  let component: FreelancerUpdateExperienceComponent;
  let fixture: ComponentFixture<FreelancerUpdateExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerUpdateExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerUpdateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
