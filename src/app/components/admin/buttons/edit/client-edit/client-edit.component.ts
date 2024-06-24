import { Component, Input } from '@angular/core';
import { ClientService } from '../../../../../core/services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent {
@Input() clientName: any;
@Input() clientId!: number;

constructor(private clients :ClientService){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.updated();

   this.form.value
   
}

form:FormGroup= new FormGroup({
  name:  new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  profession:new FormControl('', [Validators.required])
  

})
 updatedValue!:boolean;
 close:boolean=false

updated(){

 if(this.clientId!==null  && this.form.valid){

  const updatedData=this.form.value
  this.clients.update(this.clientId,this.form.value).subscribe({
    next:(data:any)=>{this.updatedValue=true ;console.log(data);
    },
    error:(error:any)=>{console.log(error)
    },
    complete:()=>{console.log('end operation');
    } 
  })
return 
    
 }else{
  console.log('error complet fill in inpute');
  
 }

}

 chaged(){
  if(this.updatedValue===true){
this.close=true
  }
 }
}
