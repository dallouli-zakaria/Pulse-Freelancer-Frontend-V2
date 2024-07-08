import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PermissionService } from '../../../../../core/services/permission.service';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrl: './permission-add.component.css'
})
export class PermissionAddComponent {
  permission!:Permission
  form!:FormGroup
  errorhandling: any;
constructor(private permisionService:PermissionService,private fb:FormBuilder){}
@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
 ngOnInit(): void {

  this.form=this.fb.group({
    name:this.fb.control('')
  })
 }

 add(){
  this.permisionService.store(this.form.value).subscribe({
    next:(data)=>{this.permisionService.index();
      this.close()
    },
    error:(error)=>{console.log(error);
      if ( error.error.errors) {
        this.errorhandling = Object.values(error.error.errors).flat();
      } else {
        this.errorhandling = [error.message || 'An error occurred'];
      }
    } ,
    complete:()=>console.log('end operation add') 
  })
 }

 
}
