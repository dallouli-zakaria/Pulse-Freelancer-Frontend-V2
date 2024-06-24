import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontractsComponent } from './usercontracts.component';

describe('UsercontractsComponent', () => {
  let component: UsercontractsComponent;
  let fixture: ComponentFixture<UsercontractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsercontractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsercontractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
