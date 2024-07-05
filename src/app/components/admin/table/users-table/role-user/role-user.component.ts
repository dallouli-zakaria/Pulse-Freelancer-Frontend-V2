import { Component, Input, Output } from '@angular/core';
import { RoleService } from './../../../../../core/services/role.service';

@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrl: './role-user.component.css'
})
export class RoleUserComponent {
@Input() userID!:number
roleUSer!:string
constructor(private roleService:RoleService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.userRole()
}
userRole(){
  this.roleService.getUserRoles(this.userID).subscribe({
    next:(data:any)=>{this.roleUSer=data; console.log(data);
    },
    error:(error)=>console.log(error)
    
  })
}


}
