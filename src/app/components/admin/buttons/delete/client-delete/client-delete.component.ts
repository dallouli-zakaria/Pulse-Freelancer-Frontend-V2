import { Component, Input, output, EventEmitter, Output } from '@angular/core';
import { Client } from './../../../../../core/models/Client';
import { ClientService } from '../../../../../core/services/client.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent {
  @Input() clientName: any;
  @Input() clientId!:number;

  @Output() closeModal = new EventEmitter<void>();
  errorhandling: any;
  close(): void {
    this.closeModal.emit();
  }

 

  constructor(private clients:ClientService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
  }

  deleted(){
      if(this.clientId!==null){
        console.log(this.clientId);
        
      this.clients.deleted(this.clientId).subscribe({
      next:()=>{ this.clients.index();
        this.close();
      },
      error:(error:any)=>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>console.log("end operation deleted") 
     })
   }
  }
}
