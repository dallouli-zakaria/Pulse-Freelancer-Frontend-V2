import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('password_confirmation');

    return password && passwordConfirmation && password.value !== passwordConfirmation.value
      ? { passwordMismatch: true }
      : null;
  };
}
