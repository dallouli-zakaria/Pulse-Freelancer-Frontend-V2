import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from '../../../core/models/post';
import { AuthService } from '../../../core/services/auth.service';
import { da } from 'date-fns/locale';
import { Client } from '../../../core/models/Client';

@Component({
  selector: 'app-view-client-offer',
  templateUrl: './view-client-offer.component.html',
  styleUrl: './view-client-offer.component.css'
})
export class ViewClientOfferComponent implements OnInit {
  isOfferClosed: boolean = false;
  validatedFreelancers: Set<number> = new Set<number>();
  postId!: number;
  post!: Post;
  postdetails!: any;
  isLoading: boolean = true;
  role!:string;
  roles!:string;
  freelancers: any[] = [];
  isAuthenticated: boolean = false;
  counter:number=1;
  clients!:Client;
  constructor(private route: ActivatedRoute, private postService: PostsService,private authService:AuthService) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      this.fetchOfferDetails(this.postId);
      this.getFreelancers(this.postId);
      this.getclientdetails(this.postId);
    } else {
      console.log("error");
    }

    this.isAuthenticated = this.authService.isLoggedIn();
    //this.rolservice.getRoles('superadmin_role').subscribe((res)=>console.log(res));
    if (this.isAuthenticated) {
    let sub = this.authService.parseID();
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.roles=res.roles;
      if(res.roles=='client_role'){
      this.role = 'Client';
    }
    else if(res.roles=='freelancer_role'){
      this.role = 'Freelancer';
    }
    });
  }

  
  }

  trackdata(post_details: any) {
    this.postdetails = post_details;
  }

  fetchOfferDetails(postId: number): void {
    this.postService.show(postId).subscribe(
      data => {
        this.post = data;
        this.isLoading = false;
        console.log(data);
      },
      error => {
        console.error('Error fetching offer details', error);
        this.isLoading = false;
      }
    );
  }


  getFreelancers(postId: number): void {
    this.postService.getFreelancersByPostId(postId).subscribe(
      (data) => {
        this.freelancers = data;
        
    
       
        
      },
      (error) => {
        console.log(error);
        
      }
    );
  }


  getclientdetails(postId:number){
    this.postService.getClientDetailsByPostId(postId).subscribe(
      (data) => {
        this.clients = data;
        console.log(this.clients); 
      },
      (error) => {
        console.error('Failed to fetch clients:', error);
      }
    );
  };


  
  

  // selecteID!: number;
  // user!:any
  show: boolean=false;

  showedit: boolean=false;
  onEdited(): void {
    this.show = true;
    this.showedit = true; 
    }
    onCloseModal(): void {
      this.show = false;
      this.showedit = false;
      }




      validateFreelancer(index: number): void {
        this.validatedFreelancers.add(index);
      }
    

      closeOffer(): void {
        this.isOfferClosed = true;
        
      }
  

}
