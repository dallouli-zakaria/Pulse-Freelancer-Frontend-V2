import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractAddComponent } from './client-contract-add.component';

describe('ClientContractAddComponent', () => {
  let component: ClientContractAddComponent;
  let fixture: ComponentFixture<ClientContractAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientContractAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContractAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
