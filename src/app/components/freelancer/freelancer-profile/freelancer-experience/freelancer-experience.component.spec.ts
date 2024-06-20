import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerExperienceComponent } from './freelancer-experience.component';

describe('FreelancerExperienceComponent', () => {
  let component: FreelancerExperienceComponent;
  let fixture: ComponentFixture<FreelancerExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
