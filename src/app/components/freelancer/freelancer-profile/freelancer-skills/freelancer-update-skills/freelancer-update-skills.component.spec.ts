import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerUpdateSkillsComponent } from './freelancer-update-skills.component';

describe('FreelancerUpdateSkillsComponent', () => {
  let component: FreelancerUpdateSkillsComponent;
  let fixture: ComponentFixture<FreelancerUpdateSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerUpdateSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerUpdateSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
