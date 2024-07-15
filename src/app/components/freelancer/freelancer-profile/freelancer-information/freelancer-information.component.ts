import { Component } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Freelancer } from '../../../../core/models/Freelancer';

@Component({
  selector: 'app-freelancer-information',
  templateUrl: './freelancer-information.component.html',
  styleUrl: './freelancer-information.component.css'
})
export class FreelancerInformationComponent {

  freelancername!:string;
  isLoading = false; 
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
    this.isLoading = true; 
    this.freelancerId = this.authService.parseID();
    this.freelancerService.show(this.freelancerId).subscribe({
      next: (data) => {
        this.freelancerdata = data;
        
        this.isLoading = false; 
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
