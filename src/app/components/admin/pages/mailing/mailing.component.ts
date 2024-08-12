import { Component, OnInit } from '@angular/core';
import { User } from './../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { MailService } from '../../../../core/services/mail.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, pipe, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrl: './mailing.component.css'
})
export class MailingComponent implements OnInit{
users?:User[];
from!:FormGroup;
observablesubjct!:Observable<User[]>
constructor(private userservice:UserService,
            private mailservice:MailService,
            private fb:FormBuilder){}

         idUser?:number;
         email:any

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.observablesubjct=this.userservice.getdata$
  this.indexUser();

this.from=this.fb.group({
  message:['']
})
}

eventlist($event:any){
console.log($event.target.value);

let user = this.users?.filter(x => x.email== $event.target.value)[0];

  this.from.get('email')?.setValue(user?.email);
 this.idUser=user?.id
 this.email=user?.email



}



indexUser(){
  this.userservice.index()
  this.userservice.getdata$.subscribe({
    next:(data:any)=>{this.users=data},
    error:(error)=>console.log(error),
    complete:()=>console.log('')
    
    
  })
}

send(){
  console.log(this.from.value);
  
  console.log(this.idUser);
  const messagedata={
    id:this.idUser,
    message:this.from.value.message
  }

  console.log(messagedata);
  
  this.mailservice.sendMail(messagedata).subscribe({
    next:(data:any)=>{console.log(data);
      alert('message sended successfly');
      this.from.get('message')?.reset();
    },
    error:(error:any)=>console.log(error)

    
    
  })
}
}
