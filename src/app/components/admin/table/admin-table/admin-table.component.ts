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

  user:User[]=[];
  selectedID!:number;
  selectedUser:any
constructor(private userService:UserService ){}
  subject!:Observable<User[]>


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.index()
  this.subject=this.userService.getData
}

trackAdmin(id:number,user:User){
  this.selectedID=id;
  this.selectedUser=user
}
index(){
  
  this.userService.index();
this.userService.getData.subscribe({
  next:(data:any)=>{
    this.user=data;
    console.log(data);
    
  },
  error:(error)=>console.log("----"+error),
  
  complete:()=>console.log('end Operation')
  
})
}



  //manage page edite delete and details for assingnig 
  show = false;
  showedit = false;
  showedelete = false;
  
  
  onEdited(id: number, role: any): void {
  this.selectedID = id;
  this.selectedUser= role;
  this.show = true;
  this.showedit = true;
  this.showedelete = false;
  }
  
  ondeleted(id: number, role: any): void {
    this.selectedID = id;
    this.selectedUser= role;
  this.show = true;
  this.showedelete = true;
  this.showedit = false;
  
  }
            
  onCloseModal(): void {
  this.show = false;
  this.showedit = false;
  this.showedelete = false;
  }
  //end manage pages
  
}
