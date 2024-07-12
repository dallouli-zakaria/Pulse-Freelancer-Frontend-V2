import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.css'
})
export class FreelancerProfileComponent {
  isLoadingFreelancerData: boolean = true;
  isLoadingFreelancerExperience: boolean = true;
  isLoadingFreelancerSkills: boolean = true;
  isLoadingFreelancerProjects: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Simulate data loading
    setTimeout(() => {
      this.isLoadingFreelancerData = false;
    }, 2000); // Replace with actual data loading logic

    // Similarly, handle other loading states for different sections
  }
}
