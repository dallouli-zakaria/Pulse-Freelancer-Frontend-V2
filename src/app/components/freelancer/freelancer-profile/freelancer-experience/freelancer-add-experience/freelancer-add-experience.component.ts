import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Experience } from '../../../../../core/models/experience';
import { ExperienceService } from '../../../../../core/services/experience.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-freelancer-add-experience',
  templateUrl: './freelancer-add-experience.component.html',
  styleUrls: ['./freelancer-add-experience.component.css']
})
export class FreelancerAddExperienceComponent implements OnInit {
  @Output() experienceAdded = new EventEmitter<void>();

  freelancerId:number=this.authService.parseID();
  newExperience?: Experience[];
  form!:FormGroup;
  constructor(
    private experienceService: ExperienceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form=new FormGroup({
      title:new FormControl(''),
      companyName:new FormControl(''),
      country:new FormControl(''),
      city:new FormControl(''),
      startDate:new FormControl(''),
      endDate:new FormControl(''),
      description:new FormControl(''),
      freelancer_id:new FormControl(this.freelancerId),
  
    })
  }

  addExperience() {
   
    const newExperience: Experience = this.form.value;


      this.experienceService.store(newExperience).subscribe({
        next: (res) => {
          console.log('Experience added successfully', res);
          
          this.experienceAdded.emit();
          this.form.reset(); // Reset the form after successful addition

        },
        error: (error) => {
          console.error('Error adding experience:', error);
        }
      });
    }




}


