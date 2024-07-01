import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  applyForm: FormGroup;
  value = 'Clear me';
  http = inject(HttpClient);
  router = inject(Router);
  isSubmitting: boolean = false;
  constructor(public formBiulder: FormBuilder,private authservice:AuthService) {
    this.applyForm = this.formBiulder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation:['']
    });
  }


  submitApplication(): void {
    this.isSubmitting = true;
    const { name, email, password, password_confirmation } = this.applyForm.getRawValue();
    this.authservice.register(name, email, password, password_confirmation)
      .subscribe(
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

