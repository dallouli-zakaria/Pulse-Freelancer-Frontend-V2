import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-assign-permession-to-user',
  templateUrl: './assign-permession-to-user.component.html',
  styleUrl: './assign-permession-to-user.component.css'
})
export class AssignPermessionToUserComponent {

//   getdata!:Observable<User>

//   errorhandling: any;
// constructor(private fb:FormBuilder,private userService:UserService ){}
// @Output() closeModal = new EventEmitter<void>();
  

// close(): void {
//   this.closeModal.emit();
// }


//   ngOnInit(): void {
//  console.log(this.role);
//  this.index()
//     this.getdata=this.userService.getData;
//     this.form=this.fb.group(
//       {
//         permession:new FormControl(this.role) ,
//         user:new FormControl([this.permissionData?.id])
//       }
//     )
//   }
 
// @Input() permissionData?:Permission;

// user:User[]=[];

// form!:FormGroup;
 
// subject!:Observable<User[]>
     


// public  index(){
//   this.userService.index();
// this.userService.getData.subscribe({
//   next:(data:any)=>{
//    this.user=data;
//    console.log(this.role);
//   },
//   error:(error)=>{console.log(error);
//     if ( error.error.errors) {
//       this.errorhandling = Object.values(error.error.errors).flat();
//     } else {
//       this.errorhandling = [error.message || 'An error occurred'];
//     }
//   },
  
//   complete:()=>console.log('end Operation')
  
// })
// }


// gratroleToUser(){
//  this.roleService.grantRoleToUser(this.form.value).subscribe({
//   next:(data)=>{console.log(data);
//     this.close()
//   },
//   error:(error)=>{
//     if ( error.error.errors) {
//       this.errorhandling = Object.values(error.error.errors).flat();
//     } else {
//       this.errorhandling = [error.message || 'An error occurred'];
//     }
//   }
//  })
  
// }
}
