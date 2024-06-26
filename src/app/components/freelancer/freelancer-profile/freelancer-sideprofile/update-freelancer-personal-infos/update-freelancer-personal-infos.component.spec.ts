import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFreelancerPersonalInfosComponent } from './update-freelancer-personal-infos.component';

describe('UpdateFreelancerPersonalInfosComponent', () => {
  let component: UpdateFreelancerPersonalInfosComponent;
  let fixture: ComponentFixture<UpdateFreelancerPersonalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFreelancerPersonalInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFreelancerPersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
