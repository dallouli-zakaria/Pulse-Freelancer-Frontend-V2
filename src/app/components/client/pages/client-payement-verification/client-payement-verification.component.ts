import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-payement-verification',
  templateUrl: './client-payement-verification.component.html',
  styleUrl: './client-payement-verification.component.css'
})
export class ClientPayementVerificationComponent {

  confirmationForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  private staticCode: string = '434422';

  constructor(private fb: FormBuilder,private router:Router) {
    this.confirmationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit6: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && index < 6) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onSubmit() {
    if (this.confirmationForm.valid) {
      const enteredCode = Object.values(this.confirmationForm.value).join('');
      if (enteredCode === this.staticCode) {
        this.successMessage = 'Code correcte! redirection ...';
        this.errorMessage = '';
        this.router.navigate(['../pulse/client-dashboard'])
      } else {
        this.errorMessage = 'Code incorrect, veuillez réessayer.';
        this.successMessage = '';
      }
    } else {
      this.errorMessage = 'Code incorrect, veuillez réessayer.';
      this.successMessage = '';
    }
  }
}
