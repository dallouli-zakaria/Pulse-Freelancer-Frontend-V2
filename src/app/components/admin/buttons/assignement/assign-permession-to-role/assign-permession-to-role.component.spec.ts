import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermessionToRoleComponent } from './assign-permession-to-role.component';

describe('AssignPermessionToRoleComponent', () => {
  let component: AssignPermessionToRoleComponent;
  let fixture: ComponentFixture<AssignPermessionToRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignPermessionToRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPermessionToRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
