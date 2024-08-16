import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPAsswordComponent {
  forgetPasswordForm!: FormGroup;
  notifiy!: string;
  isloading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }

  onSubmit() {
    this.isloading = true;
    if (this.forgetPasswordForm.valid) {
      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.notifiy = data.message;
          this.isloading = false;
          this.router.navigate(['../login']);
          Swal.fire({
            icon: 'success',
            title: 'Nous avons envoyé un mail pour changer votre mot de passe!',
            showConfirmButton: true,
          });
        },
        error: (error) => {
          console.log(error);
          this.isloading = false;
        },
      });
    }
  }
}
