import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddExperienceComponent } from './freelancer-add-experience.component';

describe('FreelancerAddExperienceComponent', () => {
  let component: FreelancerAddExperienceComponent;
  let fixture: ComponentFixture<FreelancerAddExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAddExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAddExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
