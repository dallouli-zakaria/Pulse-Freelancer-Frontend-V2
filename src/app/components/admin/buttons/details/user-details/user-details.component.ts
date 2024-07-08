import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
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
       
        role:[this.role] ,
        ser:[this.user?.id]
      }
    )
  }
 
@Input() user?:User;

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
  console.log(this.form.value);
  
}
}
