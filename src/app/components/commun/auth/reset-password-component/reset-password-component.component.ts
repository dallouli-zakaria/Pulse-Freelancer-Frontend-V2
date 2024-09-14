import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password-component',
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.css',
})
export class ResetPasswordComponentComponent {
  resetPasswordForm!: FormGroup;
  token!: string;
  email!: string;
  disabled:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordStrengthValidator
        ]
      ],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasNumber = /\d+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);

    if (!(hasUpperCase && hasNumber && hasSpecialChar)) {
      return { passwordStrength: true };
    }
    return null;
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    this.email = this.route.snapshot.queryParamMap.get('email')!;
  }

  onSubmit() {
    this.disabled=true;

    if (this.resetPasswordForm.valid) {
      const formData = {
        token: this.token,
        email: this.email,
        password: this.resetPasswordForm.value.password,
        password_confirmation:
          this.resetPasswordForm.value.password_confirmation,
      };

      this.authService.resetPassword(formData).subscribe((response) => {
        // Gérez la réponse et redirigez l'utilisateur
        this.disabled=false;
        this.router.navigate(['/login']);
      });
    }
  }
}