import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateOfferComponent } from './user-update-offer.component';

describe('UserUpdateOfferComponent', () => {
  let component: UserUpdateOfferComponent;
  let fixture: ComponentFixture<UserUpdateOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUpdateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
