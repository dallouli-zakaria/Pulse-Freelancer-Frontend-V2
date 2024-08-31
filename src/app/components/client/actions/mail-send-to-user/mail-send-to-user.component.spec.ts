import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSendToUserComponent } from './mail-send-to-user.component';

describe('MailSendToUserComponent', () => {
  let component: MailSendToUserComponent;
  let fixture: ComponentFixture<MailSendToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailSendToUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailSendToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
