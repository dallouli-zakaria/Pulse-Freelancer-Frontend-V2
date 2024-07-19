import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPostsComponent } from './client-posts.component';

describe('ClientPostsComponent', () => {
  let component: ClientPostsComponent;
  let fixture: ComponentFixture<ClientPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
