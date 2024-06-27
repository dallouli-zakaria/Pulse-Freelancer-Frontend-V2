import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { Client } from '../../../core/models/Client';
import { ClientService } from '../../../core/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrl: './user-update-profile.component.css'
})
export class UserUpdateProfileComponent implements OnInit, OnChanges{
  @Input() clientName?: Client  ;
  @Input() clientId!: number;
  
  
  
  
  constructor(private clients :ClientService){}
  private fb : FormBuilder = inject(FormBuilder);


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
    
   console.log(this.clientName?.user.email);
   
     this.form=this.fb.group({
       name: this.fb.control(this.clientName?.user.name, [Validators.required]),
      email: this.fb.control(this.clientName?.user.email),
      profession:this.fb.control( this.clientName?.profession, [Validators.required])
     
    
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
    console.log('error complet fill in inpute');
    
   }
  
  }
  
  //  chaged(){
  //   if(this.updatedValue===true){
  // this.close=true
  //   }
  //  }
  
   public ngOnChanges(): void {
    this.form=this.fb.group({
      name:  this.fb.control(`${this.clientName?.user.name}` ,[Validators.required]),
      email: this.fb.control(`${this.clientName?.user.email}`, [Validators.required]),
      profession:this.fb.control( `${this.clientName?.profession}`, [Validators.required])
      
    
    })
   }
}
