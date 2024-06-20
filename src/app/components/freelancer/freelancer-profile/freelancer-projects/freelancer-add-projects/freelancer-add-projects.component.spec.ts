import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddProjectsComponent } from './freelancer-add-projects.component';

describe('FreelancerAddProjectsComponent', () => {
  let component: FreelancerAddProjectsComponent;
  let fixture: ComponentFixture<FreelancerAddProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAddProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAddProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
