import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPAsswordComponent {
  forgetPasswordForm!: FormGroup;
   notifiy!:string

  constructor(
    
    private fb: FormBuilder,
    private authService: AuthService, 
  
  ) {}

  ngOnInit(): void {
    

    this.forgetPasswordForm = this.fb.group({
      email: [''],
     
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
    

      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next:(data:any)=>{console.log(data);
          this.notifiy=data
        },
        error:(errro)=>console.log(errro)
        
        
      });
    }
  }
}
