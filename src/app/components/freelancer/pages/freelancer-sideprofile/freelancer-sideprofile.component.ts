import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-sideprofile',
  templateUrl: './freelancer-sideprofile.component.html',
  styleUrl: './freelancer-sideprofile.component.css'
})
export class FreelancerSideprofileComponent implements OnInit{
  freelancername!:string;

  freelancerId!: number;
  freelancerdata?:Freelancer;
  displayEdit = "none";
  isLoading = true;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService,
   
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
        this.freelancerdata?.portfolio_Url !== null 
      );
    }
}
