import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Output() closeModal = new EventEmitter<void>();
  errorhandling: any;
close(): void {
  this.closeModal.emit();
}
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
       this.permissionService.index();
      this.close()},
      error:(error)=>{console.log(error)
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
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
