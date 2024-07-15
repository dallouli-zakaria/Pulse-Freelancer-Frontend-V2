import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleToPermessionComponent } from './assign-role-to-permession.component';

describe('AssignRoleToPermessionComponent', () => {
  let component: AssignRoleToPermessionComponent;
  let fixture: ComponentFixture<AssignRoleToPermessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignRoleToPermessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignRoleToPermessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
