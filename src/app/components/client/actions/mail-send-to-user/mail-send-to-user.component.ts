import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from '../../../../core/services/mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mail-send-to-user',
  templateUrl: './mail-send-to-user.component.html',
  styleUrl: './mail-send-to-user.component.css'
})
export class MailSendToUserComponent {

  isSubmitting:boolean=false;
  errorhandling: any;

  @Input() freelancerName:any;
  @Input() freelancerEmail:any
  @Input() freelancerId!:number

  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }

  users?:any
  from!:FormGroup;
    constructor(
    private mailservice:MailService,
    private fb:FormBuilder)
    {}

        

ngOnInit(): void {

this.from=this.fb.group({
  message:['']
})
}


send(){
  this.isSubmitting=true;

  const messagedata={
    id:this.freelancerId,
    message:this.from.value.message
  }

  this.mailservice.sendMail(messagedata).subscribe({
    next:(data:any)=>{console.log(data);
      this.close()
      this.isSubmitting=false;
      Swal.fire({
        icon: 'success',
        title: 'Email envoyé avec succès !',
        showConfirmButton: false,
        timer: 1500,
      });
      this.from.get('message')?.reset()
      ;
    },
    error:(error:any)=>console.log(error)

  })
}

}
