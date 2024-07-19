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
    this.fetchData();
    
  }



  getclient(){
    this.clientservice.index()
    this.clientid=this.authservice.parseID();
    this.clientservice.show(this.clientid).subscribe({
      next:(data:any)=>{this.client=data},
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get client done")})
  }



    //skeleton loading
    isLoading = true;
    data: any[] = [];
  

  
    fetchData() {
      // Simulate an API call
      setTimeout(() => {
        this.data = [
          { title: 'Item 1', description: 'Description 1' },
          { title: 'Item 2', description: 'Description 2' }
        ];
        this.isLoading = false;
      }, 1000);
    }
}
