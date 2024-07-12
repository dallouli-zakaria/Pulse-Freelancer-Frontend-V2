import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Experience } from '../../../../../core/models/experience';
import { ExperienceService } from '../../../../../core/services/experience.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-freelancer-add-experience',
  templateUrl: './freelancer-add-experience.component.html',
  styleUrls: ['./freelancer-add-experience.component.css']
})
export class FreelancerAddExperienceComponent implements OnInit {
  @Output() experienceAdded = new EventEmitter<void>();

  freelancerId: number = this.authService.parseID();
  form: FormGroup;
  isSubmitting=false;

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

  ngOnInit(): void {

  }

  addExperience() {
    this.isSubmitting=true;
    if (this.form.valid) {

      const newExperience: Experience = this.form.value;

      this.experienceService.store(newExperience).subscribe({
        next: (res) => {
          console.log('Experience added successfully', res);
          this.experienceAdded.emit();
          this.form.reset();
          this.isSubmitting=false;
        },
        error: (error) => {
          console.error('Error adding experience:', error);
     
        }
      });
    }
  }
}