import { Component, inject } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-updatecompany',
  templateUrl: './user-updatecompany.component.html',
  styleUrl: './user-updatecompany.component.css'
})
export class UserUpdatecompanyComponent {
  clientId:number=6;
  constructor(private clients:ClientService ){}
  private fb : FormBuilder = inject(FormBuilder);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  

 
   this.form=this.fb.group({
    company_name: this.fb.control('', [Validators.required]),
    company_activity: this.fb.control(''),
    company_email:this.fb.control( '', [Validators.required])
   
  
  })
 

}

form!:FormGroup;

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
