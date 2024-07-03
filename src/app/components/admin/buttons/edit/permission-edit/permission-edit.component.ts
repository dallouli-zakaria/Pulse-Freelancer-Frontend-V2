import { Component, Input } from '@angular/core';
import { PermissionService } from '../../../../../core/services/permission.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrl: './permission-edit.component.css'
})
export class PermissionEditComponent {
@Input() permissionId!:number
@Input() permissionData:any
form!:FormGroup
constructor(private permissionService:PermissionService,private fb:FormBuilder){}
ngOnInit(): void {
  this.form=this.fb.group({
    name:[this.permissionData?.name]
  })
}
  updateds(){
    console.log(this.permissionId);
    if(this.permissionId !==null){ 
      this.permissionService.update(this.permissionId,this.form.value).subscribe({
      next:(data)=>{console.log(data);
       this.permissionService.index()},
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation edite')      
    })}
   
  }
 ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.form=this.fb.group({
    name:[this.permissionData?.name]
  })
 }




}
