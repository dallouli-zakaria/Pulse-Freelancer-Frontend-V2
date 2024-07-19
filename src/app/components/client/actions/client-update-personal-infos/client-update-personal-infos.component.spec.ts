import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUpdatePersonalInfosComponent } from './client-update-personal-infos.component';

describe('ClientUpdatePersonalInfosComponent', () => {
  let component: ClientUpdatePersonalInfosComponent;
  let fixture: ComponentFixture<ClientUpdatePersonalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientUpdatePersonalInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientUpdatePersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
