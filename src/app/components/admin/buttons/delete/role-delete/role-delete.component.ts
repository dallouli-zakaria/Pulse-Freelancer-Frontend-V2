import { Component, EventEmitter, Input, Output } from '@angular/core';
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

 @Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
deleted(){console.log(this.roleData?.name);

this.roleservice.deleted(this.roleID).subscribe({
  next:()=>{this.roleservice.index();
    this.close();},
  error:(erorre)=>console.log(erorre),
  complete:()=>console.log('end operation delete')
})
}
}
