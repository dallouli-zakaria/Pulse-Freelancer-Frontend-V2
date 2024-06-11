import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddOfferComponent } from './user-add-offer.component';

describe('UserAddOfferComponent', () => {
  let component: UserAddOfferComponent;
  let fixture: ComponentFixture<UserAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAddOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
