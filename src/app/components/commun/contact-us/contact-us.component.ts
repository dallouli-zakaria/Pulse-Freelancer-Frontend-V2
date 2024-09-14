import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from '../../../core/services/mail.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl:'./contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {


  sendmail:boolean=false;

  SendMail(){
    this.sendmail=true;
  }
}
