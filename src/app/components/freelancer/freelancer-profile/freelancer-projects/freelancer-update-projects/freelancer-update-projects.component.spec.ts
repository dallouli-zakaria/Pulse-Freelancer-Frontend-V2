import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerUpdateProjectsComponent } from './freelancer-update-projects.component';

describe('FreelancerUpdateProjectsComponent', () => {
  let component: FreelancerUpdateProjectsComponent;
  let fixture: ComponentFixture<FreelancerUpdateProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerUpdateProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerUpdateProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
