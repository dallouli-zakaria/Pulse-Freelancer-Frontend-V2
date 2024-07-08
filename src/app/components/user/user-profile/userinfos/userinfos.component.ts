import { Client } from './../../../../core/models/Client';
import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Observable } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrl: './userinfos.component.css'
})
export class UserinfosComponent implements OnInit{

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
