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
  
   contact(){

    this.mailservice.contactUS(this.from.value).subscribe({
      next:(data:any)=>{
        console.log(data);
        
      },
      error:(error:any)=>{
        console.log(error);
        
        
      }
    })
   }
  
  
}
