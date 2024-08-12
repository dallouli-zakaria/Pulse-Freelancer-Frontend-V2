import { Permission } from './../../../../core/models/Permission';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Freelancer } from '../../../../core/models/Freelancer';
import { ExperienceService } from '../../../../core/services/experience.service';
import { Experience } from '../../../../core/models/experience';
import { ClientService } from '../../../../core/services/client.service';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post';
import { FreelancerService } from './../../../../core/services/freelancer.service';

@Component({
  selector: 'app-client-view-freelancer-details',
  templateUrl: './client-view-freelancer-details.component.html',
  styleUrl: './client-view-freelancer-details.component.css'
})
export class ClientViewFreelancerDetailsComponent implements OnInit{

  @Input() freelancerid: number | null = null;
  role!:string;
  roles!:string;
  postdata: Post[] = [];
  clientData: { [key: number]: string } = {};
  isAuthenticated: boolean = false;
  freelancerId!:number;
  freelancer!:any;
  experienceData?:Experience[];
  isLoading:boolean=true;
  constructor(private authService:AuthService,private route: ActivatedRoute,private freelancerService:FreelancerService,private experienceService:ExperienceService, private clientservice: ClientService,private postservice: PostsService) { }


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
      this.getClosedPostsByFreelancerId(this.freelancerId)
    } else {
      console.log("error");
    }
  }

  if (this.freelancerid !== null) {
    this.fetchFreelancerDetails(this.freelancerid);
    this.getClosedPostsByFreelancerId(this.freelancerid)
    console.log(this.freelancerid);
    
  }
  }

  getfreelancerdetails(freelancerId:number){

    this.freelancerService.show(freelancerId)
    this.freelancerService.freelancers$.subscribe((res)=>{
      this.freelancer=res;

    })


  }

  fetchFreelancerDetails(id: number) {
    this.freelancerService.show(id)
    this.freelancerService.freelancers$.subscribe((res)=>{
      this.freelancer=res;
    });
    this.experienceService.showByFreelancer(id)
    this.experienceService.experienceData$.subscribe({next:(res)=>{
      this.experienceData=res;
      console.log(res);

    
    },
      error: (error) => console.error('Error fetching experiences:', error)
      
      
    })
  }

  getClosedPostsByFreelancerId(freelancerId:number) {
    this.postservice.getClosedPostsByFreelancerId(freelancerId).subscribe((res: any[]) => {
      console.log(res);
      this.postdata = res;
      
      
      
      res.forEach((post:any) => {
        const clientId = post.client_id;
        if (clientId) {
          this.clientservice.show(clientId)
          this.clientservice.getData$.subscribe((clres:any) => {
            console.log(clres);
            this.clientData[clientId] = clres.company_name; 
            this.isLoading=false;
          });
        }
      });

     
    });

  }

  getfreelancerexperience(freelancerId:number){
    this.experienceService.showByFreelancer(freelancerId)
    this.experienceService.experienceData$.subscribe({next:(res)=>{
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


  getFirstName(fullName: string | undefined): string {
    if (!fullName) {
      return '';
    }
    const nameParts = fullName.split(' ');
    return nameParts.length > 1 ? nameParts[1] : fullName;
  }

}
