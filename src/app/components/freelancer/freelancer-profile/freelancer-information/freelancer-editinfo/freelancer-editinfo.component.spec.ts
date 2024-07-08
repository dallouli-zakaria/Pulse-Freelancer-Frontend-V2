import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerEditinfoComponent } from './freelancer-editinfo.component';

describe('FreelancerEditinfoComponent', () => {
  let component: FreelancerEditinfoComponent;
  let fixture: ComponentFixture<FreelancerEditinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerEditinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerEditinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
