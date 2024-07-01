import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authservice = inject(AuthService);
  router = inject(Router);
  applyForm: FormGroup;
  formBuilder = inject(FormBuilder);
  isSubmitting:boolean=false;
  constructor() {
    this.applyForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  get email() {
    return this.applyForm.get('email')?.value;
  }

  get password() {
    return this.applyForm.get('password')?.value;
  }

  submitApplication(event: Event) {
    this.isSubmitting=true;
    event.preventDefault();
    console.log(`Login : ${this.email} / ${this.password}`);
    this.authservice.login({
      email: this.email,
      password: this.password,
    }).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);  // Navigate within the success callback
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
