import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from '../../../../../core/models/Role';
import { RoleService } from '../../../../../core/services/role.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrl: './role-add.component.css'
})
export class RoleAddComponent implements OnInit{
  role:Role[]=[]
  form!:FormGroup
constructor(private roleServece:RoleService,private fb:FormBuilder){}
@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}

  ngOnInit(): void {
    this.form=this.fb.group({
      name:new FormControl('')
    })
  }

addRole(){
  this.roleServece.store(this.form.value).subscribe({
    next:(data)=>{console.log(data)
    
      this.roleServece.index()}
  })
}

}
