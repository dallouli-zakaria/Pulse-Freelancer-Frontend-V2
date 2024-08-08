import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import { ClientService } from '../../../../core/services/client.service';
import { Post } from '../../../../core/models/post';
import { Client } from '../../../../core/models/Client';
import { OffersService } from '../../../../core/services/offers.service';
import { Offer } from '../../../../core/models/Offer';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-freelancer-projects-history',
  templateUrl: './freelancer-projects-history.component.html',
  styleUrls: ['./freelancer-projects-history.component.css'] // Fixed here
})
export class FreelancerProjectsHistoryComponent implements OnInit {
  isLoading:boolean=true;
  postdata: Post[] = [];
  freelancerId!: number;
  clientData: { [key: number]: string } = {}; // Dictionary to hold client data keyed by client_id
  postId!:number;
  offerStartDate!:any;
  offerEndDate!:any;
  errorhandling:any
  constructor(private authservice: AuthService, private postservice: PostsService, private clientservice: ClientService,private offerservice:OffersService) {}

  ngOnInit(): void {
    this.freelancerId = this.authservice.parseID();
    this.getClosedPostsByFreelancerId();
  }

  getClosedPostsByFreelancerId() {
    this.postservice.getClosedPostsByFreelancerId(this.freelancerId).subscribe({
      next:(res: any[]) => {
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

     
    },error: (error:any) => {
      if (error.error.errors) {
        this.errorhandling = Object.values(error.error.errors).flat();
        console.log(this.errorhandling);
        
      } else {
        this.errorhandling = [error.message || 'An error occurred'];
        console.log(this.errorhandling);
      }
    },

  });

  }
}
