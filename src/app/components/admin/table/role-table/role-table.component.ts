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
  role:Role[]=[]
constructor(private roleservice:RoleService){}
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
