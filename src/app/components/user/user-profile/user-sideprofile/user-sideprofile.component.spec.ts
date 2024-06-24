import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideprofileComponent } from './user-sideprofile.component';

describe('UserSideprofileComponent', () => {
  let component: UserSideprofileComponent;
  let fixture: ComponentFixture<UserSideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSideprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
