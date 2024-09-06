import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../../../../../core/models/Role';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-assign-permession-to-role',
  templateUrl: './assign-permession-to-role.component.html',
  styleUrl: './assign-permession-to-role.component.css'
})
export class AssignPermessionToRoleComponent {

  getdata!:Observable<Role[]>
  @Input() permissionData?:Permission;
  role:Role[]=[];
  // form!:FormGroup; 
  subject!:Observable<Role[]>
  errorhandling: any;
  @Output() closeModal = new EventEmitter<void>();
   roleName:any
  close(): void {
    this.closeModal.emit();
  }

constructor(private fb:FormBuilder,private roleService:RoleService ){}

 
//oninit
ngOnInit(): void {
//  console.log(this.role);
 this.index()
    this.getdata=this.roleService.RoleData;
    // this.form=this.fb.group(
    //   {
    //     role:[this.roleName],  
    //    });
      
}
eventlist($event:any){
this.roleName=$event.target.value
}



    public  index(){
       this.roleService.index();
       this.roleService.RoleData.subscribe({
        next:(data:any)=>{
        this.role=data;
        // console.log(this.role);
     },
    //   error:(error)=>{console.log(error);
    //     if ( error.error.errors) {
    //      this.errorhandling = Object.values(error.error.errors).flat();
    //      } else {
    //       this.errorhandling = [error.message || 'An error occurred'];
    //       }
    //  }, 
    //   complete:()=>console.log('end Operation')
    })
   }


    gratroleToPermession(){
      // console.log(this.roleName);
      if(this.roleName !==undefined){
        const object:any={
                name:this.roleName,
                permession:[this.permissionData?.name]
         }
         console.log(object);
         
          this.roleService.grantPermessionToRole(object).subscribe({
           next:(data)=>{console.log(data);
           this.close()
          },
           error:(error)=>{
             if ( error.error.errors) {
              this.errorhandling = Object.values(error.error.errors).flat();
             } else {
               this.errorhandling = [error.message || 'An error occurred'];
             };
             console.log(error);
             
          }
          })


      }else{
        this.errorhandling='Please select Role'
      }
    
    }
}
