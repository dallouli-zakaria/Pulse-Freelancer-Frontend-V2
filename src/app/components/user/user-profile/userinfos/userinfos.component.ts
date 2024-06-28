import { Client } from './../../../../core/models/Client';
import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Observable } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/User';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrl: './userinfos.component.css'
})
export class UserinfosComponent implements OnInit{


  selectedata:any;

  isModalOpen = false;
  isModalOpen2 = false;


  user!:User;
  client!:Client;
  clientid:number=6;
  userid:number=6;

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


  
  constructor(private userservice:UserService, private clientservice:ClientService){}
  ngOnInit(): void {
    this.getuser();
    this.getclient();
  }




  getuser(){
    this.userservice.show(this.userid).subscribe({
      next:(data:any)=>{this.user=data},
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get user done")})
  }



  getclient(){
    this.clientservice.show(this.userid).subscribe({
      next:(data:any)=>{this.client=data},
      error:(error:any)=>console.log(error),
      complete:()=>console.log("get client done")})
  }

 
}
