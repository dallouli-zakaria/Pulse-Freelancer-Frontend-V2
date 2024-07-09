import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Freelancer } from '../../../../core/models/Freelancer';


@Component({
  selector: 'app-freelancer-sideprofile',
  templateUrl: './freelancer-sideprofile.component.html',
  styleUrls: ['./freelancer-sideprofile.component.css']
})
export class FreelancerSideprofileComponent implements OnInit {


  freelancername!:string;

  freelancerId!: number;
  freelancerdata?:Freelancer;
  displayEdit = "none";

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
        
        console.log(this.freelancerdata);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("get freelancer done")
    }); 
  }



  ngOnInit(): void {
    this.fetchData();
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



    //skeleton loading
    isLoading = true;
    data: any[] = [];
  
  
    fetchData() {
      // Simulate an API call
      setTimeout(() => {
        this.data = [
          { title: 'Item 1', description: 'Description 1' },
          { title: 'Item 2', description: 'Description 2' }
        ];
        this.isLoading = false;
      }, 1000);
    }


    getStatus(): string {
      if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'verified') {
        return 'Vérifié' ;
      } else if (this.isAllFieldsFilled() && this.freelancerdata?.status === 'not verified') {
        return 'pas encore vérifié';
      } else {
        return 'Veuilez remplir toutes vos informations ';
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
