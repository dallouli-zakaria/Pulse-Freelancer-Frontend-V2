import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../../../core/services/user.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit,OnChanges {
  @Input() UserId!:number;
  @Input() UserData!:User;
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
  form!:FormGroup
  constructor(private userService:UserService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.form=this.fb.group({
      name: this.fb.control(`${this.UserData?.name}`),
      email:this.fb.control(`${this.UserData?.email}`),
      // role:this.fb.control(`${this.UserData.role}`)
    });
  }



  updated(){
    if(this.UserId !==null && this.form.valid)
    this.userService.update(this.UserId,this.form.value).subscribe({
    next:(data:any)=>{console.log(data);this.userService.index();
      this.close()
    },
    error:(error:any)=>{console.log(error);
    },
    complete:()=>console.log('end operation users') 
    })
  }

  public ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.form=this.fb.group({
      name: this.fb.control(`${this.UserData?.name}`),
      email:this.fb.control(`${this.UserData?.email}`),
      // role:this.fb.control(`${this.UserData.role}`)
    });
  }
 
}


