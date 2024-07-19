import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;
  authService = inject(AuthService);
  router = inject(Router);
  applyForm: FormGroup;
  formBuilder = inject(FormBuilder);
  isSubmitting: boolean = false;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.applyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe(params => {
      this.successMessage = params['message'] || null;
    });
  }

  get email() {
    return this.applyForm.get('email');
  }

  get password() {
    return this.applyForm.get('password');
  }

  submitApplication(event: Event) {
    event.preventDefault();
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    const loginData = this.applyForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        //console.log(response);
        if (loginData.email === 'admin@pulse.com') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
      }
    });
  }
}
