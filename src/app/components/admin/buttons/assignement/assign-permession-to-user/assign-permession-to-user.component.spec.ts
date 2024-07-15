import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermessionToUserComponent } from './assign-permession-to-user.component';

describe('AssignPermessionToUserComponent', () => {
  let component: AssignPermessionToUserComponent;
  let fixture: ComponentFixture<AssignPermessionToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignPermessionToUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPermessionToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
