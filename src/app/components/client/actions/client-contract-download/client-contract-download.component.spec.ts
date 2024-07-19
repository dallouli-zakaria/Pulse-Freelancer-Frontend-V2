import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractDownloadComponent } from './client-contract-download.component';

describe('ClientContractDownloadComponent', () => {
  let component: ClientContractDownloadComponent;
  let fixture: ComponentFixture<ClientContractDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientContractDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContractDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
