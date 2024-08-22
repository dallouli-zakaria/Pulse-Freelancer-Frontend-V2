import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Experience } from '../../../../core/models/experience';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceService } from '../../../../core/services/experience.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator } from '../../../../core/validators/date-range.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-freelancer-update-experience',
  templateUrl: './freelancer-update-experience.component.html',
  styleUrl: './freelancer-update-experience.component.css',
})
export class FreelancerUpdateExperienceComponent implements OnInit {
  @Output() experienceUpdated = new EventEmitter<void>();

  countries = [
    'Maroc',
    'Afrique du Sud',
    'Allemagne',
    'Algérie',
    'Arabie Saoudite',
    'Autriche',
    'Bahreïn',
    'Belgique',
    'Danemark',
    'Égypte',
    'Émirats Arabes Unis',
    'Espagne',
    'Finlande',
    'France',
    'Ghana',
    'Grèce',
    'Italie',
    'Jordanie',
    'Kenya',
    'Koweït',
    'Liban',
    'Nigeria',
    'Norvège',
    'Oman',
    'Pays-Bas',
    'Portugal',
    'Qatar',
    'Royaume-Uni',
    'Suède',
    'Suisse',
    'Turquie',
    'Tunisie',
    'Autre',
  ];

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
  isMorocco = false;
  selectedCity = '';

  isSubmitting = false;
  updateForm!: FormGroup;
  freelancerId: number = this.authService.parseID();
  experienceToUpdate?: Experience;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group(
      {
        title: ['', Validators.required],
        companyName: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        description: ['', Validators.required],
      },
      { validators: dateRangeValidator() }
    );
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const country = selectElement.value;
    this.isMorocco = country === 'Maroc';
    if (!this.isMorocco) {
      this.updateForm.get('city')?.setValue('');
    }
  }

  onCityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const city = selectElement.value;
    this.selectedCity = city;
    if (city !== 'Autre') {
      this.updateForm.get('city')?.setValue(city);
    } else {
      this.updateForm.get('city')?.setValue('');
    }
  }

  setExperienceToUpdate(experience: Experience) {
    this.experienceToUpdate = experience;
    this.updateForm.patchValue({
      title: experience.title,
      companyName: experience.companyName,
      country: experience.country,
      city: experience.city,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    });
  }

  onSubmit() {
    if (
      this.updateForm.valid &&
      this.experienceToUpdate &&
      this.experienceToUpdate.id
    ) {
      this.isSubmitting = true;
      const updatedExperience: Experience = {
        ...this.updateForm.value,
      };
      this.experienceService
        .update(this.experienceToUpdate.id, updatedExperience)
        .subscribe({
          next: () => {
            Swal.fire({
              icon: "success",
              title: "Modifié avec succès",
              showConfirmButton: false,
              timer: 1500
            });
            this.isSubmitting = false;
            this.experienceUpdated.emit();
          },
          error: (error) => console.error('Error updating experience:', error),
        });
    }
  }
}
