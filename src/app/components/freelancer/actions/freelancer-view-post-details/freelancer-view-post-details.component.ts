import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancer } from '../../../../core/models/Freelancer';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { OffersService } from '../../../../core/services/offers.service';
import { PostsService } from '../../../../core/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-freelancer-view-post-details',
  templateUrl: './freelancer-view-post-details.component.html',
  styleUrl: './freelancer-view-post-details.component.css'
})
export class FreelancerViewPostDetailsComponent implements OnInit,OnChanges{
  @Input() postId: number | null = null;
  isLoading: boolean = true;
  freelancerId: number = this.authservice.parseID();
  freelancerdata!: Freelancer;
  postdata?: Post;
  clientid!: number;
  company_name!: string;
  freelancerstatus!: string;
  offerExists: boolean | null = null;

  successMessage: string = '';
  isButtonDisabled: boolean = false;

  constructor(
    private authservice: AuthService,
    public freelancerservice: FreelancerService,
    private postservice: PostsService,
    private clientservice: ClientService,
    private offerservice: OffersService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId !== null) {
      this.isLoading = true;
      this.getfreelancer();
      this.getposts();
      this.truefalse(this.postId);
    }
  }

  ngOnInit(): void {}

  //show selected post
  getposts() {
    if (this.postId !== null) {
      this.postservice.show(this.postId).subscribe((res:any) => {
        console.log(res);
        
        this.postdata = res;
        this.clientid = res.client_id;
        this.getclient(this.clientid);
        this.truefalse(this.postId);
      });
    }
  }

  //get client related to post
  getclient(clientId: number) {
    this.clientservice.show(clientId)
    this.clientservice.getData$.subscribe((res:any) => {
      this.company_name = res.company_name;
      this.isLoading = false;
      console.log(res);
    });
  }

  //assign to offer function from freelancer
  postuler() {
    this.isButtonDisabled = true; 
    let data = {
      selected: 'false',
      freelancer_id: this.freelancerId,
      post_id: this.postId
    };

    this.offerservice.store(data).subscribe((res) => {
      this.successMessage = 'Vous avez postulé avec succès!';
      this.offerExists = true; 
      this.isButtonDisabled = false; 
      
    });
    Swal.fire({
      icon: "success",
      title: "Vous avez polstuler avec succès",
      showConfirmButton: false,
      timer: 1500
    });

  }

  //check if freelancer is already assigned to offer
  truefalse(postId: any) {
    this.postservice.checkFreelancerOffer(postId, this.freelancerId).subscribe(response => {
      this.offerExists = response.offer_exists;
    }, error => {
      console.error('Error checking freelancer offer', error);
    });
  }

  //get freelancer status
  getfreelancer() {
    this.freelancerservice.show(this.freelancerId)
    this.freelancerservice.freelancers$.subscribe((res:any) => {
      this.freelancerstatus = res.status;
    });
  }

  
}
