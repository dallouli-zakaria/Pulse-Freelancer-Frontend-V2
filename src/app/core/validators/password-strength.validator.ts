import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Don't return errors if the control is empty
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const passwordValid = hasUpperCase && hasNumber && hasLowerCase;

    if (!passwordValid) {
      return { passwordStrength: true };
    }

    return null;
  };
}
