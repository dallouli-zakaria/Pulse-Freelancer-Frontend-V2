import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatecompanyComponent } from './user-updatecompany.component';

describe('UserUpdatecompanyComponent', () => {
  let component: UserUpdatecompanyComponent;
  let fixture: ComponentFixture<UserUpdatecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdatecompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUpdatecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
