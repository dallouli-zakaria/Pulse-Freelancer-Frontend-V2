import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-freelancer-update-personal-infos',
  templateUrl: './freelancer-update-personal-infos.component.html',
  styleUrl: './freelancer-update-personal-infos.component.css',
})
export class FreelancerUpdatePersonalInfosComponent {
  @Input() freelancerID!: number;
  @Input() freelancerData?: any;
  moroccanCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fès',
    'Tanger',
    'Agadir',
    'Essaouira',
    'Meknès',
    'Autre',
  ];
  availability = ['disponible', 'sous préavis'];
  freelancer: Freelancer[] = [];
  form!: FormGroup;
  errorhandling: any;
  isSubmitting:boolean=false;
  private fb: FormBuilder = inject(FormBuilder);
  private frelancerservices: FreelancerService = inject(FreelancerService);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.freelancerData?.user?.name, Validators.required],
      email: [
        this.freelancerData?.user?.email,
        [Validators.required, Validators.email],
      ],
      password: [this.freelancerData?.user?.password],
      title: [this.freelancerData?.title, Validators.required],
      dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
      city: [this.freelancerData?.city, Validators.required],
      TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
      availability: [this.freelancerData?.availability, Validators.required],
      adress: [this.freelancerData?.adress, Validators.required],
      phone: [this.freelancerData?.phone, Validators.required],
      portfolio_Url: [this.freelancerData?.portfolio_Url],
    });
  }

  updated() {
    if (this.form.invalid) {
      this.errorhandling = 'Veuillez remplir tous les champs.';
      return;
    }
   
    if (this.freelancerID !== null) {
      this.isSubmitting=true;
      this.frelancerservices
        .update(this.freelancerID, this.form.value)
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "Modifié avec succès",
              showConfirmButton: false,
              timer: 1500
            });
            this.close();
            this.frelancerservices.show(this.freelancerID);
            this.isSubmitting=false;
          },
          error: (error) => {
            this.isSubmitting=false;
            if (error.error.errors) {
              this.errorhandling = Object.values(error.error.errors).flat();
              console.log(this.errorhandling);
            } else {
              this.errorhandling = [error.message || 'An error occurred'];
              console.log(this.errorhandling);
            }
          },
        });
    } else {
      console.log('null id of freelancer');
    }
  }

  ngOnChanges(): void {
    this.form = this.fb.group({
      name: [this.freelancerData?.user?.name, Validators.required],
      email: [
        this.freelancerData?.user?.email,
        [Validators.required, Validators.email],
      ],
      password: [this.freelancerData?.user?.password],
      title: [this.freelancerData?.title, Validators.required],
      dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
      city: [this.freelancerData?.city, Validators.required],
      TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
      availability: [this.freelancerData?.availability, Validators.required],
      adress: [this.freelancerData?.adress, Validators.required],
      phone: [this.freelancerData?.phone, Validators.required],
      portfolio_Url: [this.freelancerData?.portfolio_Url],
    });
  }

  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
