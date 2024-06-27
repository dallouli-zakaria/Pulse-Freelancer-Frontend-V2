import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent implements OnInit {

  user:User[]=[]
constructor(private userService:UserService ){}
  subject!:Observable<User[]>
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.index()
  this.subject=this.userService.getData
}

index(){
  this.userService.index();
this.userService.getData.subscribe({
  next:(data:any)=>{
    this.user=data
  },
  error:(error)=>console.log(error),
  
  complete:()=>console.log('end Operation')
  
})
}
}
