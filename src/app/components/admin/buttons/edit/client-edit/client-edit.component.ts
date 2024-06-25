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
@Input() clientName?: Client  ;
@Input() clientId!: number;

@Output()
public eventEmitter : EventEmitter<any> = new EventEmitter;
  
clientNamevalue:any=this.clientName?.user;



closed='modal'
constructor(private clients :ClientService){}
private fb : FormBuilder = inject(FormBuilder);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  
 console.log(this.clientName);
 
   this.form=this.fb.group({
    name:  this.fb.control(`${this.clientNamevalue}` ,[Validators.required]),
    email: this.fb.control(`${this.clientName?.user.email}`, [Validators.required]),
    profession:this.fb.control( `${this.clientName?.profession}`, [Validators.required])
    
  
  })
 
  this.updated() 
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
      this.eventEmitter.emit(updatedData);
 
    },
    error:(error:any)=>{console.log(error)
    },
    complete:()=>{console.log('end operation');
    } 
  })

    
 }else{
  console.log('error complet fill in inpute');
  
 }

}

 chaged(){
  if(this.updatedValue===true){
this.close=true
  }
 }

 public ngOnChanges(): void {
  this.form=this.fb.group({
    name:  this.fb.control(`${this.clientNamevalue}` ,[Validators.required]),
    email: this.fb.control(`${this.clientName?.user.email}`, [Validators.required]),
    profession:this.fb.control( `${this.clientName?.profession}`, [Validators.required])
    
  
  })
 }

}
