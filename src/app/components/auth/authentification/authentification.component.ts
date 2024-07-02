import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ClientService } from '../../../core/services/client.service';
import { FreelancerService } from '../../../core/services/freelancer.service';

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
  constructor(public formBiulder: FormBuilder, private clientservice:ClientService,private freelancerservice:FreelancerService) {
    this.applyForm = this.formBiulder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation:[''],
      option:['client']
    });
  }


  submitApplication() {
    this.isSubmitting = true;
    const { name, email, password, password_confirmation,option } = this.applyForm.getRawValue();
    // this.authservice.register(name, email, password, password_confirmation)
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.router.navigate(['/']);  
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );

    

      if (option === 'freelancer') {
            this.freelancerservice.register(name, email, password, password_confirmation)
          .subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/login']);  
            },
            (error) => {
              console.error(error);
            }
          );

      } else {
            this.clientservice.register(name, email, password, password_confirmation)
          .subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/login']);  
            },
            (error) => {
              console.error(error);
            }
          );
      }
    
    }
     
  }

