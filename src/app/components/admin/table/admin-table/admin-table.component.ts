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

ngOnInit(): void {

  this.adminrole(true);

}
roleadmin='admin_role'
superadmin='superadmin_role'
rolename!:string
trackAdmin(id:number,user:User){
  this.selectedID=id;
  this.selectedUser=user
}

  
    
  
   
   adminrole(isSuperAdmin: boolean){
    const roleadd = isSuperAdmin ? 'superadmin_role' : 'admin_role';
      this.userService.getUserWithRole(roleadd).subscribe({
      next:(data:any)=>{ this.user=data},
      error:(erro)=>console.log(erro)  
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
  
}
