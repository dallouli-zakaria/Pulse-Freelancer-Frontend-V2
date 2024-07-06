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
  // subject!:Observable<User[]>
//  sowadmin!:boolean

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  this.adminrole()
  // this.role()
  // this.index()
  // this.subject=this.userService.getData
}
roleadmin='admin_role'
superadmin='superadmin_role'
rolename!:string
trackAdmin(id:number,user:User){
  this.selectedID=id;
  this.selectedUser=user
}

  // role(){
    
  //     this.userService.getUserWithRole(this.superadmin).subscribe({
  //     next:(data:any)=>{console.log(data);
  //      this.user=data},
  //     error:(erro)=>console.log(erro)  
  //  })
  

   
   adminrole(){
       
      this.userService.getUserWithRole('superadmin_role').subscribe({
      next:(data:any)=>{ this.user=data},
      error:(erro)=>console.log(erro)  
   })
   }
  
    
  

// index(){
//   if(this.sowadmin==true){
//   this.userService.index();
//   this.userService.getData.subscribe({
//   next:(data:any)=>{if(this.sowadmin=true){
//     this.user=data
//   }

    
//   },
//   error:(error)=>console.log("----"+error),
  
//   complete:()=>console.log('end Operation')
  
// })
// }
// }



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
