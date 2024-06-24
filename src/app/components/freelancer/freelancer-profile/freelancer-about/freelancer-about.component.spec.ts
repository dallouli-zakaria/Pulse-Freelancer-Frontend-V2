import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAboutComponent } from './freelancer-about.component';

describe('FreelancerAboutComponent', () => {
  let component: FreelancerAboutComponent;
  let fixture: ComponentFixture<FreelancerAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
