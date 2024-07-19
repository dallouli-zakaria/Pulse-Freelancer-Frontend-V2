import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProjectsHistoryComponent } from './freelancer-projects-history.component';

describe('FreelancerProjectsHistoryComponent', () => {
  let component: FreelancerProjectsHistoryComponent;
  let fixture: ComponentFixture<FreelancerProjectsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerProjectsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerProjectsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
