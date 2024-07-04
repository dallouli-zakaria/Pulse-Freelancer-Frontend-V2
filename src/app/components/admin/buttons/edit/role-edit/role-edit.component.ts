import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
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
  erorrshowe:any
constructor(private roleService:RoleService,private fb:FormBuilder,private modalService: NgbModal){}
  ngOnInit(): void {
  this.form=this.fb.group({
    name:new FormControl('', Validators.email)
  })
  }

  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
  updated(){
  this.roleService.updated(this.roleID,this.form.value).subscribe({
    next:()=>{this.roleService.index();
      this.close()
    },
    error:(eror)=>{console.log(eror); this.erorrshowe=eror},
    complete:()=>console.log('end operation') 
  })
  }
  ngOnChanges(): void {
  this.form=this.fb.group({
   name:new FormControl(`${this.roleData?.name}`)
  })
 }
}
