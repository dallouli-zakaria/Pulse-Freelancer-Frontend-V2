import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent {
  @Output() closeModal = new EventEmitter<void>();
  errorhandling: any;
  close(): void {
    this.closeModal.emit();
  }
  form!:FormGroup
  constructor(private auth:AuthService,private userService:UserService,private fb:FormBuilder){}
  ngOnInit(): void {
  this.form=this.fb.group({
    name: [''],
    email:[''],
    password:['']
  });
  }


  add(){
    this.auth.register(this.form.value).subscribe({
      next:(data:any)=>{console.log(data);this.userService.index()
      },
      error:(error:any)=>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>console.log('end operation users') 
      })
  }
}
