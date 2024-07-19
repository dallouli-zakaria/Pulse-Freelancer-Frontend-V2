import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSideprofileComponent } from './client-sideprofile.component';

describe('ClientSideprofileComponent', () => {
  let component: ClientSideprofileComponent;
  let fixture: ComponentFixture<ClientSideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSideprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
