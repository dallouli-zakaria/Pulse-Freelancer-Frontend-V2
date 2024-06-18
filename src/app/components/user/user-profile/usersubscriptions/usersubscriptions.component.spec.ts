import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersubscriptionsComponent } from './usersubscriptions.component';

describe('UsersubscriptionsComponent', () => {
  let component: UsersubscriptionsComponent;
  let fixture: ComponentFixture<UsersubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersubscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
