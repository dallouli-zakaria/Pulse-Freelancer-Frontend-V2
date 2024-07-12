import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Experience } from '../../../../../core/models/experience';
import { ExperienceService } from '../../../../../core/services/experience.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-freelancer-update-experience',
  templateUrl: './freelancer-update-experience.component.html',
  styleUrl: './freelancer-update-experience.component.css'
})
export class FreelancerUpdateExperienceComponent implements OnInit{

  @Output() experienceUpdated = new EventEmitter<void>();
  
  
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
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  getdata(){

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
      description: experience.description
    });
  }

  onSubmit() {
    if (this.updateForm.valid && this.experienceToUpdate && this.experienceToUpdate.id) {
      this.isSubmitting = true;
      const updatedExperience: Experience = {
        ...this.updateForm.value
      };

      this.experienceService.update(this.experienceToUpdate.id, updatedExperience).subscribe({
        next: () => {
          this.isSubmitting=false;
          this.experienceUpdated.emit();
        },
        error: (error) => console.error('Error updating experience:', error)
      });
    }
  }






}
