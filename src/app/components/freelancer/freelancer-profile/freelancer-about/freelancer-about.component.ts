import { Component } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-freelancer-about',
  templateUrl: './freelancer-about.component.html',
  styleUrl: './freelancer-about.component.css'
})
export class FreelancerAboutComponent {
  displayEdit = "none";

  freelancername!:string;
  isLoading = false;
  freelancerId!: number;
  freelancerdata?:Freelancer;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService,
   
  ) {
    this.getFreelancer();
  }
  getFreelancer() {
    this.isLoading = true;
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

 



    
   







  // selecteID!: number;
  // user!:any
  show: boolean=false;
  selecteName: any;
  showedit: boolean=false;
  onEdited(id:any,object:any): void {
    this.selectedID = id;
    this.selectedData=object;
    this.show = true;
    this.showedit = true; 
    }
    onCloseModal(): void {
      this.show = false;
      this.showedit = false;
      }


}
