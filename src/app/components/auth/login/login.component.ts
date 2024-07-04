import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;
  authservice = inject(AuthService);
  router = inject(Router);
  applyForm: FormGroup;
  formBuilder = inject(FormBuilder);
  isSubmitting:boolean=false;
  successMessage: string | null = null;
  constructor(private route: ActivatedRoute) {
    this.applyForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    this.route.queryParams.subscribe(params => {
      this.successMessage = params['message'] || null;
    });
  }

  get email() {
    return this.applyForm.get('email')?.value;
  }

  get password() {
    return this.applyForm.get('password')?.value;
  }

  submitApplication(event: Event) {
        event.preventDefault();
        if (this.applyForm.valid) {
          this.isSubmitting = true;
          this.errorMessage = null;
          const loginData = this.applyForm.value;
          
          this.authservice.login(loginData).subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['/pulse/home']);
              this.isSubmitting = false;
              // Redirect or perform other actions
            },
            error: (err) => {
              this.isSubmitting = false;
              this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
            }
          });
        }
      }
  }


  


