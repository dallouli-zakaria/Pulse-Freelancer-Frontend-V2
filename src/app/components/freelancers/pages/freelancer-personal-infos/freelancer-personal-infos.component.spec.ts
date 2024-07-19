import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPersonalInfosComponent } from './freelancer-personal-infos.component';

describe('FreelancerPersonalInfosComponent', () => {
  let component: FreelancerPersonalInfosComponent;
  let fixture: ComponentFixture<FreelancerPersonalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerPersonalInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerPersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
