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
  @Input() clientId!:number
  @Output() 
  public eventEmitter:EventEmitter<any> =new EventEmitter
 
 updatedData:any
  constructor(private clients:ClientService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
  }

  deleted(){
      if(this.clientId!==null){
        console.log(this.clientId);
        
      this.clients.deleted(this.clientId).subscribe({
      next:(data)=>{ this.clients.index()
      
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("end operation deleted") 
     })
   }
  }
}
