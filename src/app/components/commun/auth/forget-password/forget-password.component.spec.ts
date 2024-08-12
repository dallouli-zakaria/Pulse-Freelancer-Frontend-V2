import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPAsswordComponent } from './forget-password.component';

describe('ForgetPAsswordComponent', () => {
  let component: ForgetPAsswordComponent;
  let fixture: ComponentFixture<ForgetPAsswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPAsswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPAsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
