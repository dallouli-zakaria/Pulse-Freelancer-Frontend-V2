import { Permission } from './../../../../core/models/Permission';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Freelancer } from '../../../../core/models/Freelancer';
import { ExperienceService } from '../../../../core/services/experience.service';
import { Experience } from '../../../../core/models/experience';

@Component({
  selector: 'app-client-view-freelancer-details',
  templateUrl: './client-view-freelancer-details.component.html',
  styleUrl: './client-view-freelancer-details.component.css'
})
export class ClientViewFreelancerDetailsComponent implements OnInit{

  @Input() freelancerid: number | null = null;
  role!:string;
  roles!:string;
  isAuthenticated: boolean = false;
  freelancerId!:number;
  freelancer!:Freelancer;
  experienceData?:Experience[];
  isLoading:boolean=true;
  constructor(private authService:AuthService,private route: ActivatedRoute,private freelancerService:FreelancerService,private experienceService:ExperienceService) { }


  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    //this.rolservice.getRoles('superadmin_role').subscribe((res)=>console.log(res));
    if (this.isAuthenticated) {
    let sub = this.authService.parseID();
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.roles=res.roles;
      this.isLoading=false;
      if(res.roles=='client_role'){
      this.role = 'Client';
    }
    else if(res.roles=='freelancer_role'){
      this.role = 'Freelancer';
    }
    });


    const freelancerIdParam = this.route.snapshot.paramMap.get('freelancerId');
    if (freelancerIdParam !== null) {
      this.freelancerId = +freelancerIdParam;
      this.getfreelancerdetails(this.freelancerId);
      this.getfreelancerexperience(this.freelancerId);
    } else {
      console.log("error");
    }
  }

  if (this.freelancerid !== null) {
    this.fetchFreelancerDetails(this.freelancerid);
    console.log(this.freelancerid);
    
  }
  }

  getfreelancerdetails(freelancerId:number){

    this.freelancerService.show(freelancerId).subscribe((res)=>{
      this.freelancer=res;
    })


  }

  fetchFreelancerDetails(id: number) {
    this.freelancerService.show(id).subscribe((res)=>{
      this.freelancer=res;
    });
    this.experienceService.showByFreelancer(id).subscribe({next:(res)=>{
      this.experienceData=res;
      console.log(res);

    
    },
      error: (error) => console.error('Error fetching experiences:', error)
      
      
    })
  }

  getfreelancerexperience(freelancerId:number){
    this.experienceService.showByFreelancer(freelancerId).subscribe({next:(res)=>{
      this.experienceData=res;
      console.log(res);

    
    },
      error: (error) => console.error('Error fetching experiences:', error)
      
      
    })
  }

  getYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

}
