import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { FreelancerService } from '../../../core/services/freelancer.service';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { passwordStrengthValidator } from '../../../core/validators/password-strength.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
  applyForm: FormGroup;
  value = 'Clear me';
  http = inject(HttpClient);
  router = inject(Router);
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(public formBuilder: FormBuilder, private clientService: ClientService, private freelancerService: FreelancerService) {
    this.applyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator()]],
      password_confirmation: ['', Validators.required],
      option: ['client']
    }, { validators: passwordMatchValidator() });
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    this.isSubmitting = true;
    const { name, email, password, password_confirmation, option } = this.applyForm.getRawValue();

    if (option === 'freelancer') {
      this.freelancerService.register(name, email, password, password_confirmation)
        .subscribe(
          (res) => {
            console.log(res);
            this.navigateToLoginWithSuccessMessage('Freelancer account created successfully!');
          },
          (error) => {
            this.handleErrorResponse(error);
          }
        );
    } else {
      this.clientService.register(name, email, password, password_confirmation)
        .subscribe(
          (res) => {
            console.log(res);
            this.navigateToLoginWithSuccessMessage('Client account created successfully!');
          },
          (error) => {
            this.handleErrorResponse(error);
          }
        );
    }
  }

  private navigateToLoginWithSuccessMessage(message: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: { message }
    };
    this.router.navigate(['/login'], navigationExtras);
  }

  private handleErrorResponse(error: any) {
    console.error(error);
    this.isSubmitting = false;

    if (error.status === 400 && error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Email déjà éxistant';
    }
  }
}
