import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewfreelancersProfileComponent } from './user-viewfreelancers-profile.component';

describe('UserViewfreelancersProfileComponent', () => {
  let component: UserViewfreelancersProfileComponent;
  let fixture: ComponentFixture<UserViewfreelancersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewfreelancersProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewfreelancersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
