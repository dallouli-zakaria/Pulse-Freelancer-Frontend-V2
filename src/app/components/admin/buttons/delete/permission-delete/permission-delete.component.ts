import { Component, Input } from '@angular/core';
import { PermissionService } from '../../../../../core/services/permission.service';

@Component({
  selector: 'app-permission-delete',
  templateUrl: './permission-delete.component.html',
  styleUrl: './permission-delete.component.css'
})
export class PermissionDeleteComponent {
  @Input() permissionId!:number
  @Input() permissionData:any

  constructor(private permissionService:PermissionService){}
  

  deleted(){
    if(this.permissionId !==null){
    this.permissionService.delete(this.permissionId).subscribe({
      next:(data)=>{console.log(data);
       this.permissionService.index()},
       error:(error)=>console.log(error),
       complete:()=>console.log('end operation delet')   
       
    })}
  }
}
