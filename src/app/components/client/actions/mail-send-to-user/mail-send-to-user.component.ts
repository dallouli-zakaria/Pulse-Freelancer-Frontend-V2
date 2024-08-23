import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MailService } from '../../../../core/services/mail.service';

@Component({
  selector: 'app-mail-send-to-user',
  templateUrl: './mail-send-to-user.component.html',
  styleUrl: './mail-send-to-user.component.css'
})
export class MailSendToUserComponent {
@Input() freelancerName:any;
@Input() freelancerEmail:any
@Input() freelancerId!:number

  @Output() closeModal = new EventEmitter<void>();
  errorhandling: any;
  close(): void {
    this.closeModal.emit();
  }

  users?:any
from!:FormGroup;
// observablesubjct!:Observable<User[]>
constructor(
            private mailservice:MailService,
            private fb:FormBuilder){}

        

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.observablesubjct=this.userservice.getdata$
  // this.indexUser();

this.from=this.fb.group({
  message:['']
})
}

eventlist($event:any){
console.log($event.target.value);

// let user = this.users?.filter(x => x.email== $event.target.value)[0];

//   this.from.get('email')?.setValue(user?.email);
//  this.idUser=user?.id
//  this.email=user?.email



// }



// indexUser(){
//   this.userservice.index()
//   this.userservice.getdata$.subscribe({
//     next:(data:any)=>{this.users=data},
//     error:(error)=>console.log(error),
//     complete:()=>console.log('')
//   })
}

send(){
  console.log(this.from.value);
  
  console.log(this.freelancerId);
  const messagedata={
    id:this.freelancerId,
    message:this.from.value.message
  }

  console.log(messagedata);
  
  this.mailservice.sendMail(messagedata).subscribe({
    next:(data:any)=>{console.log(data);
      this.close()
      alert('message sended successfly');
      this.from.get('message')?.reset()
      ;
    },
    error:(error:any)=>console.log(error)

    
    
  })
}

}
