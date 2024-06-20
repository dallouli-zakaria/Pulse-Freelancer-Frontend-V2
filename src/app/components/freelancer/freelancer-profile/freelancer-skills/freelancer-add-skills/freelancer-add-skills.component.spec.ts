import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddSkillsComponent } from './freelancer-add-skills.component';

describe('FreelancerAddSkillsComponent', () => {
  let component: FreelancerAddSkillsComponent;
  let fixture: ComponentFixture<FreelancerAddSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAddSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAddSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
