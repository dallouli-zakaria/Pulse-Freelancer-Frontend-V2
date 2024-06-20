import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddAboutComponent } from './freelancer-add-about.component';

describe('FreelancerAddAboutComponent', () => {
  let component: FreelancerAddAboutComponent;
  let fixture: ComponentFixture<FreelancerAddAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAddAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAddAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
