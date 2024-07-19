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

  constructor(private clientservice:ClientService,private authservice:AuthService){
    this.getclient();
  }

  getclient(){
    this.clientid=this.authservice.parseID();
    console.log(this.clientid);
    
    this.clientservice.show(this.clientid).subscribe({
      next:(data:any)=>{this.client=data},
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get client done")})
  }



  //skeleton loading
  isLoading = true;
  data: any[] = [];

  ngOnInit() {
    this.fetchData();
  }

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
