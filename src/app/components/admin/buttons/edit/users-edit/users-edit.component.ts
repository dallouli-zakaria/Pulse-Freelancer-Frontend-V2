import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  @Input() userId!:number
  @Input() userdata:any
user!:User[]
form!:FormGroup
constructor(private userService:UserService,private fb:FormBuilder){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.updated()
  this.form=this.fb.group({
    name:[this.userdata.name],
    email:[this.userdata.email],
    
  })
}
updated(){
  this.userService.update(this.userId,this.form.value)
}




  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();    
  }
}
