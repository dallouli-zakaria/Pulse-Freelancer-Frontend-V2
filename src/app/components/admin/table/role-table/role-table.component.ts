import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../core/models/Role';
import { RoleService } from '../../../../core/services/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.css'
})
export class RoleTableComponent implements OnInit {
  role:Role[]=[];
  

constructor(private roleservice:RoleService){}
selectedID!:number;
selectedRole:any

//manage page edite delete and details for assingnig 
show = false;
  showedit = false;
  showedelete = false;
  showdetails= false

onEdited(id: number, role: any): void {
  this.selectedID = id;
  this.selectedRole = role;
  this.show = true;
  this.showedit = true;
  this.showedelete = false;
}

ondeleted(id: number, role: any): void {
  this.selectedID = id;
  this.selectedRole = role;
  this.show = true;
  this.showedelete = true;
  this.showedit = false;
  this.showdetails = false;
}
ondetails(id: number, role: any): void {
  this.selectedID = id;
  this.selectedRole = role;
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


getdata!:Observable<Role[]>
  ngOnInit(): void {
    this.index()
    this.getdata=this.roleservice.RoleData
  }

  index(){
    this.roleservice.index()
    this.roleservice.RoleData.subscribe({
      next:(data)=>this.role=data,
      error:(error)=>console.log(error),
      complete:()=>console.log('end of operation') 
    })
  }

}
