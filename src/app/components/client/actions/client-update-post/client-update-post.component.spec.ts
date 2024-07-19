import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUpdatePostComponent } from './client-update-post.component';

describe('ClientUpdatePostComponent', () => {
  let component: ClientUpdatePostComponent;
  let fixture: ComponentFixture<ClientUpdatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientUpdatePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientUpdatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
