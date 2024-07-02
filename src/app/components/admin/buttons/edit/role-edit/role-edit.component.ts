import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { FormBuilder, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {
  @Input() roleID!:number;
  @Input() roleData:any
  role:Role[]=[];
  form!:FormGroup
constructor(private roleService:RoleService,private fb:FormBuilder,private modalService: NgbModal){}
  ngOnInit(): void {
  this.form=this.fb.group({
    name:new FormControl('')
  })
  }
  updated(){
  this.roleService.updated(this.roleID,this.form.value).subscribe({
    next:()=>{this.roleService.index();
      this.modalService.dismissAll()
    },
    error:(eror)=>console.log(eror),
    complete:()=>console.log('end operation') 
  })
  }
  ngOnChanges(): void {
  this.form=this.fb.group({
   name:new FormControl(`${this.roleData?.name}`)
  })
 }
}
