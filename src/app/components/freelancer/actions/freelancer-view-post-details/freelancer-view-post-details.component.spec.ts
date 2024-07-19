import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerViewPostDetailsComponent } from './freelancer-view-post-details.component';

describe('FreelancerViewPostDetailsComponent', () => {
  let component: FreelancerViewPostDetailsComponent;
  let fixture: ComponentFixture<FreelancerViewPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerViewPostDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerViewPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
