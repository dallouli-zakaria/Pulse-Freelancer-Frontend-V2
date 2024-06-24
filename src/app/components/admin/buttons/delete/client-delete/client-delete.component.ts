import { Component, Input } from '@angular/core';
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
 
  delete:any
  constructor(private clients:ClientService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.deleted();
    
  }

  deleted(){
      if(this.clientId!==null){
      this.clients.delete(this.clientId).subscribe({
      next:()=>console.log("client deleted"),
      error:(error:any)=>console.log(error),
      complete:()=>console.log("end operation deleted") 
     })
   }
  }
}
