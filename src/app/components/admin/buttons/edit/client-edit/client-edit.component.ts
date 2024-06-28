import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { ClientService } from '../../../../../core/services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

import { Client } from './../../../../../core/models/Client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit, OnChanges{
@Input() clientObject?: Client  ;
@Input() clientId!: number;




constructor(private clients :ClientService){}
private fb : FormBuilder = inject(FormBuilder);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  
 console.log(this.clientObject?.user.email);
 
   this.form=this.fb.group({
     name: this.fb.control(this.clientObject?.user.name, [Validators.required]),
    email: this.fb.control(this.clientObject?.user.email),
    profession:this.fb.control( this.clientObject?.profession, [Validators.required]),
    company_name:this.fb.control( `${this.clientObject?.company_name}`, [Validators.required]),
    company_activity:this.fb.control( `${this.clientObject?.company_activity}`, [Validators.required]),
    company_email:this.fb.control( `${this.clientObject?.company_email}`, [Validators.required]),
   
  
  })
 

}

form!:FormGroup
updatedValue!: boolean;
close:boolean=false;
updated(){  

 if(this.clientId!==null  && this.form.valid){

  let updatedData=this.form.value
  updatedData.id = this.clientId;
  this.clients.update(this.clientId,this.form.value).subscribe({
    next:(data:any)=>{this.updatedValue=true ;console.log(data);
      this.clients.index()
 
    },
    error:(error:any)=>{console.log(error)
    },
    complete:()=>{console.log('end operation');
    } 
  })

    
 }else{
  console.log('error ');
  
 }

}

//  chaged(){
//   if(this.updatedValue===true){
// this.close=true
//   }
//  }

 public ngOnChanges(): void {
  this.form=this.fb.group({
    name:  this.fb.control(`${this.clientObject?.user.name}` ,[Validators.required]),
    email: this.fb.control(`${this.clientObject?.user.email}`, [Validators.required]),
    profession:this.fb.control( `${this.clientObject?.profession}`, [Validators.required]),
    company_name:this.fb.control( `${this.clientObject?.company_name}`, [Validators.required]),
    company_activity:this.fb.control( `${this.clientObject?.company_activity}`, [Validators.required]),
    company_email:this.fb.control( `${this.clientObject?.company_email}`, [Validators.required]),
    
  
  })
 }

}
