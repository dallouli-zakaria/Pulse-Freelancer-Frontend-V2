import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrl: './user-update-profile.component.css'
})
export class UserUpdateProfileComponent  {


@Input() clientdata:any;
  
clientId:number=6;
form!:FormGroup;

  constructor(private clients:ClientService ){}
  private fb : FormBuilder = inject(FormBuilder);

ngOnInit(): void {
   this.form=this.fb.group({
     name: this.fb.control('', [Validators.required]),
    email: this.fb.control(''),
    profession:this.fb.control( '', [Validators.required])
  })
}



  updated(){  

     this.clients.update(this.clientId,this.form.value).subscribe({
       next:(data:any)=>{ 
         this.clients.index()
    
       },
       error:(error:any)=>{console.log(error)
       },
       complete:()=>{console.log('end operation');
       } 
     })
   
       

 }
}
