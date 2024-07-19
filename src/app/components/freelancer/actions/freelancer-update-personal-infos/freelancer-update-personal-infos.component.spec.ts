import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerUpdatePersonalInfosComponent } from './freelancer-update-personal-infos.component';

describe('FreelancerUpdatePersonalInfosComponent', () => {
  let component: FreelancerUpdatePersonalInfosComponent;
  let fixture: ComponentFixture<FreelancerUpdatePersonalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerUpdatePersonalInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerUpdatePersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
