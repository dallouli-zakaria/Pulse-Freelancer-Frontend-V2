import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewFreelancersComponent } from './user-view-freelancers.component';

describe('UserViewFreelancersComponent', () => {
  let component: UserViewFreelancersComponent;
  let fixture: ComponentFixture<UserViewFreelancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewFreelancersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
