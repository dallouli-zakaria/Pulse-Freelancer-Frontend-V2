import { Component, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {

  client: Client[] = [];

 

  private clientSe : ClientService = inject(ClientService);
  
 


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
   this.index();
   
  }
    selecteID!:number;
    selecteName!:Client
    selecteProfession:any

    

    trackClient(user:any,id:number){
     
       this.selecteName=user
       this.selecteID=id
    }
   


   index(){
    this.clientSe.index()
    this.clientSe.getData().subscribe({
      next:(data)=>{
        this.client=data; 
      },
      error:(error:any)=>{
        console.log(error);  
      }
    })

   }
   public afterUpdate($event : any){
   this.client = this.client.map(c => {if($event.id == c.id) c = $event; c.user = $event; return c});
   }


}
