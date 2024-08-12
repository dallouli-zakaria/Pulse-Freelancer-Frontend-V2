import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/Client';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-sideprofile',
  templateUrl: './client-sideprofile.component.html',
  styleUrl: './client-sideprofile.component.css'
})
export class ClientSideprofileComponent implements OnInit{
  clientid!:number;
  client?:Client;
  isLoading = true;
  constructor(private clientservice:ClientService,private authservice:AuthService){
    this.getclient();
  }

  getclient(){
    this.clientid=this.authservice.parseID();
    this.clientservice.show(this.clientid)
    this.clientservice.getData$.subscribe({
      next:(data:any)=>{this.client=data;
        this.isLoading = false;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get client done")})
  }




  
 

  ngOnInit() {
   
  }



}
