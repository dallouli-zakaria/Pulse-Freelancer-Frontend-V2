import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewFreelancersComponent } from './client-view-freelancers.component';

describe('ClientViewFreelancersComponent', () => {
  let component: ClientViewFreelancersComponent;
  let fixture: ComponentFixture<ClientViewFreelancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientViewFreelancersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientViewFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
