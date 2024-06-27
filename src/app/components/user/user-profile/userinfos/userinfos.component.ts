import { Component, inject } from '@angular/core';
import { Client } from '../../../../core/models/Client';
import { ClientService } from '../../../../core/services/client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrl: './userinfos.component.css'
})
export class UserinfosComponent {
  isModalOpen = false;
  isModalOpen2 = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openModal2() {
    this.isModalOpen2 = true;
  }
  closeModal2() {
    this.isModalOpen2 = false;
  }



  
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

}
