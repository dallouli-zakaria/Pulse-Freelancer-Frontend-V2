import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { Observable } from 'rxjs';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-assign-role-to-user',
  templateUrl: './assign-role-to-user.component.html',
  styleUrl: './assign-role-to-user.component.css'
})
export class AssignRoleToUserComponent {
  getdata!:Observable<Role[]>

  errorhandling: any;
constructor(private fb:FormBuilder,private roleService:RoleService ){}
@Output() closeModal = new EventEmitter<void>();
  

close(): void {
  this.closeModal.emit();
}


  ngOnInit(): void {
 console.log(this.role);
 this.index()
    this.getdata=this.roleService.RoleData;
    this.form=this.fb.group(
      {
        role:new FormControl(this.role) ,
        user:new FormControl([this.permissionData?.id])
      }
    )
  }
 
@Input() permissionData?:Permission;

role:Role[]=[];

form!:FormGroup;
 
subject!:Observable<Role[]>
     


public  index(){
  this.roleService.index();
this.roleService.RoleData.subscribe({
  next:(data:any)=>{
   this.role=data;
   console.log(this.role);
  },
  error:(error)=>{console.log(error);
    if ( error.error.errors) {
      this.errorhandling = Object.values(error.error.errors).flat();
    } else {
      this.errorhandling = [error.message || 'An error occurred'];
    }
  },
  
  complete:()=>console.log('end Operation')
  
})
}


gratroleToUser(){
 this.roleService.grantRoleToUser(this.form.value).subscribe({
  next:(data)=>{console.log(data);
    this.close()
  },
  error:(error)=>{
    if ( error.error.errors) {
      this.errorhandling = Object.values(error.error.errors).flat();
    } else {
      this.errorhandling = [error.message || 'An error occurred'];
    }
  }
 })
  
}
}
