import { ExperienceService } from './../../../../core/services/experience.service';
import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Experience } from '../../../../core/models/experience';
import { SkillService } from '../../../../core/services/skill.service';

@Component({
  selector: 'app-freelancer-sideprofile',
  templateUrl: './freelancer-sideprofile.component.html',
  styleUrl: './freelancer-sideprofile.component.css'
})
export class FreelancerSideprofileComponent implements OnInit{
  freelancername!:string;
  experienceData: Experience[] = [];
  freelancerId!: number;
  freelancerdata?:Freelancer;
  freelancerSkillsData: any[] = [];
  displayEdit = "none";
  isLoading = true;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService,
    private experienceService:ExperienceService,
    private skillService:SkillService
   
  ) {
    this.getFreelancer();
  }
  getFreelancer() {
    this.freelancerId = this.authService.parseID();
    this.freelancerService.show(this.freelancerId).subscribe({
      next: (data) => {
        this.freelancerdata = data;
        this.isLoading = false;
        console.log(this.freelancerdata);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("get freelancer done")
    }); 

    this.experienceService.showByFreelancer(this.freelancerId).subscribe({
      next: (res) => {
        this.experienceData = res;
        console.log(res);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching experiences:', error);
        this.isLoading = false;
      }
    });


    this.skillService.showbyfreelancerid(this.freelancerId).subscribe({
      next: (data: any) => {
        this.freelancerSkillsData = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }



  ngOnInit(): void {
    
  }
selectedData:any
selectedID!:any
  openModalEdit(freelancer:any,id:any) {
    this.selectedData=freelancer;
    this.selectedID=id
    this.displayEdit = "block";
  }

  onCloseHandledEdit() {
    this.displayEdit = "none";
  }



    
    



    getStatusMessage(): string {
      if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'verified') {
        return  'verified';
      } else if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'not verified') {
        return 'en cours de vérification';
      } else {
        return 'Veuilez remplir toutes vos informations ';
      }
    }

    getStatus(): { cssClass: string } {
      if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'verified') {
        return { cssClass: 'status-connected' };
      } else if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'not verified') {
        return { cssClass: 'status-away' };
      } else {
        return {cssClass: 'status-disconnected' };
      }
    }

    private isAllFieldsFilled(): boolean {
      // Check all required fields are not null or undefined
      return (
        this.freelancerdata?.title !== null &&
        this.freelancerdata?.dateOfBirth !== null &&
        this.freelancerdata?.city !== null &&
        this.freelancerdata?.TJM !== null &&
        this.freelancerdata?.summary !== null &&
        this.freelancerdata?.availability !== null &&
        this.freelancerdata?.adress !== null &&
        this.freelancerdata?.phone !== null &&
        this.freelancerdata?.portfolio_Url !== null &&
        this.experienceData.length > 0 &&
        this.freelancerSkillsData.length > 0
      );
    }
}
