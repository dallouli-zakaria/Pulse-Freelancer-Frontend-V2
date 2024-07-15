import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
errorhandling:any;
role:Role[]=[];
roleName:any

@Input() user?:User;
@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}     

constructor(private roleService:RoleService ){}



   ngOnInit(): void {
    console.log(this.role);
    this.index()
       this.getdata=this.roleService.RoleData;
        
    }
    
    eventlist($event:any){
      this.roleName=$event.target.value
      }
      

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

     if(this.roleName!==undefined){
      const object:any={
        name:this.roleName,
        users:[this.user?.id]
 }
       console.log(object);
       
     this.roleService.grantRoleToUser(object).subscribe({
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
  
       }else{
        this.errorhandling='please select role !.......'
       }

       
    }
    }
