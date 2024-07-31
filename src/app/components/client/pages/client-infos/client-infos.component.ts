import { Component } from '@angular/core';
import { Client } from '../../../../core/models/Client';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-infos',
  templateUrl: './client-infos.component.html',
  styleUrl: './client-infos.component.css'
})
export class ClientInfosComponent {
  clientdetails!:Client;
  clientdetails2!:Client;
  isLoading = true;
  selectedata:any;

  isModalOpen = false;
  isModalOpen2 = false;

  client?:Client;
  clientid!:number;

  constructor(private clientservice:ClientService,private authservice:AuthService){}

  openModal(client:any) {
    this.clientdetails=client
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  openModal2(client:any) {
    this.clientdetails=client
    this.isModalOpen2 = true;
  }
  closeModal2() {
    this.isModalOpen2 = false;
  }


  

  ngOnInit(): void {
 
    this.getclient();

    
  }



  getclient(){
    this.clientservice.index()
    this.clientid=this.authservice.parseID();
    this.clientservice.show(this.clientid)
    this.clientservice.getData$.subscribe({
      next:(data:any)=>{this.client=data;
        this.isLoading = false;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get client done")})
  }



  
    
 
  

  
    
}
