import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPostDetailsComponent } from './client-post-details.component';

describe('ClientPostDetailsComponent', () => {
  let component: ClientPostDetailsComponent;
  let fixture: ComponentFixture<ClientPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPostDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
