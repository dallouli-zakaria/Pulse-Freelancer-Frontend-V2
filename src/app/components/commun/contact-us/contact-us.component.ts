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

  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  from!:FormGroup;

  constructor(
              private mailservice:MailService,
              private fb:FormBuilder){}
  
          
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  
  this.from=this.fb.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    message:['']
  })
  }
  
  contact() {
    this.mailservice.contactUS(this.from.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.message === 'Email envoyé') {
          this.showSuccessMessage = true;  // Affiche le message de succès si l'email est envoyé
          this.showErrorMessage = false;   // Cache le message d'erreur
        } else {
          this.showErrorMessage = true;    // Si la réponse n'est pas 'Email envoyé', affiche un message d'erreur
          this.showSuccessMessage = false;
        }
      },
      error: (error: any) => {
        console.log(error);
        this.showErrorMessage = true;      // Affiche un message d'erreur en cas d'échec
        this.showSuccessMessage = false;
      }
    });
  }

  
  
}
