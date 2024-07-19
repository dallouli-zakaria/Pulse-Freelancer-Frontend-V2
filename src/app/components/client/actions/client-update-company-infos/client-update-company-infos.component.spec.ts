import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUpdateCompanyInfosComponent } from './client-update-company-infos.component';

describe('ClientUpdateCompanyInfosComponent', () => {
  let component: ClientUpdateCompanyInfosComponent;
  let fixture: ComponentFixture<ClientUpdateCompanyInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientUpdateCompanyInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientUpdateCompanyInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
