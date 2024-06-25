import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../../../../core/services/client.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
private  clients:ClientService =inject(ClientService);

form!:FormGroup

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    profession:new FormControl(''),
    password:new FormControl('')

  })
}
 inserted(){
  console.log(this.form.value);
  
    this.clients.store(this.form.value)
      .subscribe({
        next:(data:any)=>{console.log(data)
          this.clients.index();
        },
        erorr:(error:any)=>{console.log(error);
        },
        complet:()=>{console.log('completed');
        }
      });
    
  }
}
