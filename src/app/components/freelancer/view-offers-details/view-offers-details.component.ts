import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FreelancerService } from '../../../core/services/freelancer.service';
import { Freelancer } from '../../../core/models/Freelancer';

@Component({
  selector: 'app-view-offers-details',
  templateUrl: './view-offers-details.component.html',
  styleUrl: './view-offers-details.component.css'
})
export class ViewOffersDetailsComponent {

  freelnacerId:number=this.authservice.parseID();
  freelancerdata!:Freelancer;

  constructor(private authservice:AuthService,private freelancerservice:FreelancerService){
    this.getfreelancer();
  }


  getfreelancer(){
    this.freelancerservice.show(this.freelnacerId).subscribe((res)=>{
      this.freelancerdata=res;
      console.log(res);
      
    })
  }



}
