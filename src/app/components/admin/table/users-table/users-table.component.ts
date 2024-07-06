import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';

import { id } from 'date-fns/locale';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{
  user:User[]=[];
 
  constructor(private userService:UserService){}
    subject!:Observable<User[]>
   selectUser:any
   selectedId!:number
   
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
      // this.userService.verify(this.selectedID).subscribe({
      //   next:(data:any)=>{
      //     console.log(data); 
      //     this.user[3].role=data},
      //   error:(error:any)=>console.log(error)
      // })
    },
    error:(error)=>console.log(error),
    
    complete:()=>console.log('end Operation')
    
  })
  }


  
//manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;
showdetails= false

onEdited(id:number ,user: any): void {
  this.selectUser=user;
  this.selectedId=id
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted( user: any): void {
  this.selectUser=user
this.show = true;
this.showedelete = true;
this.showedit = false;
this.showdetails = false;
}
ondetails( user: any): void {
  this.selectUser=user;
  
this.show = true;
this.showedelete = false;
this.showedit = false;
this.showdetails= true;
}
          
onCloseModal(): void {
this.show = false;
this.showedit = false;
this.showedelete = false;
this.showdetails= false;
}
//end manage pages
}
