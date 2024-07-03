import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/User';

@Component({
  selector: 'app-user-sideprofile',
  templateUrl: './user-sideprofile.component.html',
  styleUrl: './user-sideprofile.component.css'
})
export class UserSideprofileComponent implements OnInit{
  userid: number=5;
  client!:Client;
  user!:User;

  constructor(private clientservice:ClientService,private userservice:UserService){
    this.getclient();
  }

  getclient(){
    this.clientservice.show(this.userid).subscribe({
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
