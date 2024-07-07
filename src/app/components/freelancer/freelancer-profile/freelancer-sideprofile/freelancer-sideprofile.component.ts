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
  freelancerdata?: Freelancer;
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
      next: (data: any) => {
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

  openModalEdit() {
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
  
}
