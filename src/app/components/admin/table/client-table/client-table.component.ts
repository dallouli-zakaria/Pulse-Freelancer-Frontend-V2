import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {

  client:any

  constructor(private clientSe:ClientService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
    this.client= this.clientSe.index().subscribe({
      next:(data:Client)=>{
        this.client=data;
        console.log(this.client);
        
      },
      error:(error:any)=>{
        console.log(error);  
      }
    })
  }

  //  index(){
   
  
  //  }
  

}
