import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent implements OnInit {

  clients: Client[] = [];

 

  private clientSe : ClientService = inject(ClientService);
  
 
 listClient!:Observable<Client[]>

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
   this.index();
   this.listClient=this.clientSe.getData;
   
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
      this.clientSe.getData.subscribe({
      next:(data)=>{
        this.clients=data; 
      },
      error:(error:any)=>{
        console.log(error);  
      }
      })

    }
 

    
  //manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;


onEdited(id: number, role: any): void {
this.selecteID = id;
this.selecteName= role;
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted(id: number, role: any): void {
  this.selecteID = id;
  this.selecteName= role;
this.show = true;
this.showedelete = true;
this.showedit = false;

}
          
onCloseModal(): void {
this.show = false;
this.showedit = false;
this.showedelete = false;
}
//end manage pages


}
