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

    const valid = hasUpperCase && hasNumber && hasSpecialChar;
    return !valid ? { passwordStrength: true } : null;
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    this.email = this.route.snapshot.queryParamMap.get('email')!;

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  onSubmit() {
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
        this.router.navigate(['/login']);
      });
    }
  }
}
