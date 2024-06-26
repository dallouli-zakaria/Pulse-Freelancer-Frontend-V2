import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerUpdateAboutComponent } from './freelancer-update-about.component';

describe('FreelancerUpdateAboutComponent', () => {
  let component: FreelancerUpdateAboutComponent;
  let fixture: ComponentFixture<FreelancerUpdateAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerUpdateAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerUpdateAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
