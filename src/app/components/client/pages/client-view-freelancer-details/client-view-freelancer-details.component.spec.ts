import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewFreelancerDetailsComponent } from './client-view-freelancer-details.component';

describe('ClientViewFreelancerDetailsComponent', () => {
  let component: ClientViewFreelancerDetailsComponent;
  let fixture: ComponentFixture<ClientViewFreelancerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientViewFreelancerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientViewFreelancerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
