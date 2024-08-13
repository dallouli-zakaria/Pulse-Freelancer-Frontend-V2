import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPayementVerificationComponent } from './client-payement-verification.component';

describe('ClientPayementVerificationComponent', () => {
  let component: ClientPayementVerificationComponent;
  let fixture: ComponentFixture<ClientPayementVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPayementVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPayementVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
