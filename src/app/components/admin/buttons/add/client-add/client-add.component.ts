import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ClientService } from '../../../../../core/services/client.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
private  clients:ClientService =inject(ClientService);
@Output() closeModal = new EventEmitter<void>();
 
close(): void {
  this.closeModal.emit();
}
 errorhandling:any;
form!:FormGroup

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    profession:new FormControl(''),
    password:new FormControl(''),
    company_name:new FormControl(''),
    company_activity:new FormControl(''),
    company_email:new FormControl(''),

  })
}
 inserted(){
  // console.log(this.form.value);
  
    this.clients.store(this.form.value)
      .subscribe({
        next:(data:any)=>{
          // console.log(data)
          this.clients.fetchPaginatedClient();
          this.close();
        },
        erorr:(error:any)=>{
          if ( error.error.errors) {
            this.errorhandling = Object.values(error.error.errors).flat();
          } else {
            this.errorhandling = [error.message || 'An error occurred'];
          }
        },
        complet:()=>{
          // console.log('completed');
        }
      });
    
  }
}
