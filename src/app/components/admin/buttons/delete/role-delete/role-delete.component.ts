import { Component, Input, input } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { RoleService } from '../../../../../core/services/role.service';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrl: './role-delete.component.css'
})
export class RoleDeleteComponent {
  @Input() roleID!:number
  @Input() roleData:any
role:Role[]=[];
constructor(private roleservice:RoleService){}

deleted(){
this.roleservice.deleted(this.roleID).subscribe({
  next:()=>this.roleservice.index(),
  error:(erorre)=>console.log(erorre),
  complete:()=>console.log('end operation delete')
})
}
}
