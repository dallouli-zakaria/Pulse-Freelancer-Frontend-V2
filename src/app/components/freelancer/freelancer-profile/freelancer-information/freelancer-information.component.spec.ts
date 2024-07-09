import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerInformationComponent } from './freelancer-information.component';

describe('FreelancerInformationComponent', () => {
  let component: FreelancerInformationComponent;
  let fixture: ComponentFixture<FreelancerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
