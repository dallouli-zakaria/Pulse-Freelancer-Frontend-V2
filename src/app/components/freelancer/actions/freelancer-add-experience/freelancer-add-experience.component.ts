import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Experience } from '../../../../core/models/experience';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceService } from '../../../../core/services/experience.service';

@Component({
  selector: 'app-freelancer-add-experience',
  templateUrl: './freelancer-add-experience.component.html',
  styleUrls: ['./freelancer-add-experience.component.css']
})
export class FreelancerAddExperienceComponent implements OnInit {
  @Output() experienceAdded = new EventEmitter<void>();

  freelancerId: number = this.authService.parseID();
  form: FormGroup;
  isSubmitting = false;

  countries = [
    'Maroc', 'Algérie', 'Tunisie', 'Égypte', 'Afrique du Sud', 'Kenya', 'Nigeria', 'Ghana',
    'France', 'Espagne', 'Allemagne', 'Italie', 'Royaume-Uni', 'Pays-Bas', 'Belgique', 
    'Suède', 'Norvège', 'Danemark', 'Finlande', 'Suisse', 'Autriche', 'Portugal', 
    'Grèce', 'Turquie', 'Arabie Saoudite', 'Émirats Arabes Unis', 'Qatar', 'Koweït', 
    'Bahreïn', 'Jordanie', 'Liban', 'Oman', 'Autre'
  ];
  
  moroccanCities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Essaouira', 'Meknès', 'Autre'];
  isMorocco = false;
  selectedCity = '';

  constructor(
    private experienceService: ExperienceService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      freelancer_id: [this.freelancerId]
    });
  }

  ngOnInit(): void { }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const country = selectElement.value;
    this.isMorocco = country === 'Maroc';
    if (!this.isMorocco) {
      this.form.get('city')?.setValue('');
    }
  }

  onCityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const city = selectElement.value;
    this.selectedCity = city;
    if (city !== 'Autre') {
      this.form.get('city')?.setValue(city);
    } else {
      this.form.get('city')?.setValue('');
    }
  }

  addExperience() {
    this.isSubmitting = true;
    if (this.form.valid) {
      const newExperience: Experience = this.form.value;

      this.experienceService.store(newExperience).subscribe({
        next: (res) => {
          console.log('Experience added successfully', res);
          this.experienceAdded.emit();
          this.experienceService.index();
          this.form.reset({
            freelancer_id: this.freelancerId
          });
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error adding experience:', error);
          this.isSubmitting = false;
        }
      });
    }
  }
}
