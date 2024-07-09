import { PostsService } from './../../../core/services/posts.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FreelancerService } from '../../../core/services/freelancer.service';
import { Freelancer } from '../../../core/models/Freelancer';
import { Post } from '../../../core/models/post';
import { ClientService } from '../../../core/services/client.service';
import { OffersService } from '../../../core/services/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-offers-details',
  templateUrl: './view-offers-details.component.html',
  styleUrls: ['./view-offers-details.component.css']
})
export class ViewOffersDetailsComponent implements OnInit, OnChanges {
  @Input() postId: number | null = null;

  
  freelancerId: number = this.authservice.parseID();
  freelancerdata!: Freelancer;
  postdata?: Post;
  clientid!: number;
  company_name!: string;
  freelancerstatus!:string;
  offerExists: boolean | null = null;

  successMessage: string = '';
  isButtonDisabled: boolean = false;


  constructor(
    private authservice: AuthService,
    public freelancerservice: FreelancerService,
    private postservice: PostsService,
    private clientservice: ClientService,
    private offerservice:OffersService,
    private router:Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId !== null) {
      this.getfreelancer();
      this.getposts();
      this.truefalse(this.postId);
    
    }
    
  }

  ngOnInit(): void {}

  getposts() {
    if (this.postId !== null) {
      this.postservice.show(this.postId).subscribe((res) => {
        this.postdata = res;
        this.clientid = res.client_id;
        this.getclient(this.clientid);
        this.truefalse(this.postId);
      });
    }
  }

  getclient(clientId: number) {
    this.clientservice.show(clientId).subscribe((res) => {
      this.company_name = res.company_name;
      console.log(res);
    });
  }
  


  postuler(){
    let data={
      "selected":this.company_name,
      "freelancer_id":this.freelancerId,
      "post_id":this.postId
  }
    // this.offerservice.store(data).subscribe((res)=>{

    //   //this.router.navigate(['../pulse/freelancer-dashboard/freelancer-offers'])
      
    // })


    this.offerservice.store(data).subscribe((res) => {
      this.successMessage = 'Vous avez postuler avec sucess!';
      this.isButtonDisabled = true;
     
      //this.router.navigate(['../pulse/freelancer-dashboard/freelancer-offers'])
    });
  }

  truefalse(postId:any){
    this.postservice.checkFreelancerOffer(postId, this.freelancerId).subscribe(response => {
      this.offerExists = response.offer_exists;
      
    }, error => {
      console.error('Error checking freelancer offer', error);
    });
  }

  getfreelancer(){
    this.freelancerservice.show(this.freelancerId).subscribe((res)=>{
      this.freelancerstatus=res.status;
    })
  }
  


  
}
